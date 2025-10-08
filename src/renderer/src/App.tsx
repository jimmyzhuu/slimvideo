import { useState, useEffect } from 'react'
import DropZone from './components/DropZone'
import VideoInfo from './components/VideoInfo'
import CompressSettings from './components/CompressSettings'
import ProgressView from './components/ProgressView'
import CompleteView from './components/CompleteView'

interface VideoData {
  filePath: string
  filename: string
  size: number
  duration: number
  width: number
  height: number
  bitrate: number
  codec: string
}

interface CompressionResult {
  originalSize: number
  compressedSize: number
  savedSize: number
  savedPercent: number
  outputPath: string
}

type AppState = 'idle' | 'video-loaded' | 'compressing' | 'completed'

function App() {
  const [state, setState] = useState<AppState>('idle')
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null)

  const handleVideoLoaded = async (filePath: string) => {
    // 显示加载状态
    setState('compressing') // 临时使用压缩状态显示加载
    
    console.log('Loading video:', filePath)
    const result = await window.electronAPI.getVideoInfo(filePath)
    console.log('Video info result:', result)
    
    if (result.success && result.data) {
      setVideoData({
        filePath,
        filename: result.data.filename,
        size: result.data.size,
        duration: result.data.duration,
        width: result.data.width,
        height: result.data.height,
        bitrate: result.data.bitrate,
        codec: result.data.codec
      })
      setState('video-loaded')
    } else {
      console.error('Failed to get video info:', result.error)
      // 显示错误信息
      alert(`无法获取视频信息: ${result.error || '未知错误'}`)
      setState('idle')
    }
  }

  const handleStartCompress = async (params: {
    codec: 'h264' | 'h265'
    targetSize?: number // MB
    compressionRatio?: number // 百分比
  }) => {
    if (!videoData) return

    setState('compressing')

    // 计算目标码率
    let targetBitrate: number
    if (params.targetSize) {
      // 目标文件大小方式 (MB转换为kbps)
      // 公式：(目标大小MB * 8 * 1024) / 时长秒 = 总码率kbps
      // 减去音频码率128kbps，再增加10%缓冲以达到目标大小
      const totalBitrate = (params.targetSize * 8 * 1024) / videoData.duration
      targetBitrate = Math.floor((totalBitrate - 128) * 1.1)  // 增加10%补偿
    } else if (params.compressionRatio) {
      // 压缩比例方式
      targetBitrate = Math.floor(videoData.bitrate * (params.compressionRatio / 100))
    } else {
      return
    }

    // 确保码率不会过低
    targetBitrate = Math.max(targetBitrate, 500)

    // 生成输出文件路径
    const pathParts = videoData.filePath.split('/')
    const fileName = pathParts.pop() || ''
    const fileNameParts = fileName.split('.')
    const ext = fileNameParts.pop()
    const baseName = fileNameParts.join('.')
    const outputPath = [...pathParts, `${baseName}_compressed.${ext}`].join('/')

    const result = await window.electronAPI.compressVideo({
      inputPath: videoData.filePath,
      outputPath,
      codec: params.codec,
      targetBitrate
    })

    if (result.success) {
      // 获取压缩后的文件信息
      const compressedInfo = await window.electronAPI.getVideoInfo(outputPath)
      
      if (compressedInfo.success && compressedInfo.data) {
        const savedSize = videoData.size - compressedInfo.data.size
        const savedPercent = (savedSize / videoData.size) * 100

        setCompressionResult({
          originalSize: videoData.size,
          compressedSize: compressedInfo.data.size,
          savedSize,
          savedPercent,
          outputPath
        })
        setState('completed')
      }
    }
  }

  const handleReset = () => {
    setState('idle')
    setVideoData(null)
    setCompressionResult(null)
  }

  const handleRemoveVideo = () => {
    setVideoData(null)
    setState('idle')
  }

  return (
    <div className="w-full h-screen mac-window flex flex-col">
      {/* 标题栏 */}
      <div className="h-12 flex items-center justify-center border-b border-mac-gray-200 dark:border-mac-gray-700 draggable-area">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">SlimVideo</h1>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-auto">
        {state === 'idle' && (
          <DropZone onFileLoaded={handleVideoLoaded} />
        )}

        {state === 'video-loaded' && videoData && (
          <div className="fade-in">
            <VideoInfo 
              videoData={videoData}
              onRemove={handleRemoveVideo}
            />
            <CompressSettings 
              videoData={videoData}
              onStartCompress={handleStartCompress}
            />
          </div>
        )}

        {state === 'compressing' && videoData && (
          <ProgressView 
            filename={videoData.filename}
            onCancel={() => {
              window.electronAPI.cancelCompression()
              setState('video-loaded')
            }}
          />
        )}

        {state === 'completed' && compressionResult && (
          <CompleteView 
            result={compressionResult}
            onOpenLocation={() => {
              window.electronAPI.openFileLocation(compressionResult.outputPath)
            }}
            onCompressNew={handleReset}
          />
        )}
      </div>
    </div>
  )
}

export default App

