import { useState, useEffect } from 'react'

interface CompressSettingsProps {
  videoData: {
    size: number
    duration: number
    bitrate: number
  }
  onStartCompress: (params: {
    codec: 'h264' | 'h265'
    targetSize?: number
    compressionRatio?: number
  }) => void
}

export default function CompressSettings({ videoData, onStartCompress }: CompressSettingsProps) {
  const [codec, setCodec] = useState<'h264' | 'h265'>('h265')
  const [mode, setMode] = useState<'size' | 'ratio'>('size')
  const [targetSize, setTargetSize] = useState('')
  const [compressionRatio, setCompressionRatio] = useState('')

  // 预计结果
  const [estimatedSize, setEstimatedSize] = useState(0)
  const [estimatedSaved, setEstimatedSaved] = useState(0)

  // 设置默认值：视频大小的50%
  useEffect(() => {
    const defaultSize = Math.round((videoData.size / (1024 * 1024)) * 0.5) // 50%的大小，单位MB
    setTargetSize(defaultSize.toString())
  }, [videoData.size])

  useEffect(() => {
    if (mode === 'size' && targetSize) {
      const size = parseFloat(targetSize)
      if (!isNaN(size)) {
        const sizeInBytes = size * 1024 * 1024
        setEstimatedSize(sizeInBytes)
        setEstimatedSaved(videoData.size - sizeInBytes)
      }
    } else if (mode === 'ratio' && compressionRatio) {
      const ratio = parseFloat(compressionRatio)
      if (!isNaN(ratio)) {
        const sizeInBytes = videoData.size * (ratio / 100)
        setEstimatedSize(sizeInBytes)
        setEstimatedSaved(videoData.size - sizeInBytes)
      }
    }
  }, [mode, targetSize, compressionRatio, videoData.size])

  const handleStart = () => {
    if (mode === 'size' && targetSize) {
      const size = parseFloat(targetSize)
      if (!isNaN(size) && size > 0) {
        onStartCompress({ codec, targetSize: size })
      }
    } else if (mode === 'ratio' && compressionRatio) {
      const ratio = parseFloat(compressionRatio)
      if (!isNaN(ratio) && ratio > 0 && ratio < 100) {
        onStartCompress({ codec, compressionRatio: ratio })
      }
    }
  }

  const formatSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
    }
    return `${(bytes / (1024 * 1024)).toFixed(0)} MB`
  }

  const isValid = () => {
    if (mode === 'size') {
      const size = parseFloat(targetSize)
      return !isNaN(size) && size > 0 && size < (videoData.size / (1024 * 1024))
    } else {
      const ratio = parseFloat(compressionRatio)
      return !isNaN(ratio) && ratio > 0 && ratio < 100
    }
  }

  return (
    <div className="px-8 py-6 space-y-6">
      {/* 压缩模板 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          压缩模板
        </h3>
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="codec"
              value="h264"
              checked={codec === 'h264'}
              onChange={() => setCodec('h264')}
              className="radio-mac"
            />
            <span className="text-gray-900 dark:text-white">高速度 (H.264)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="codec"
              value="h265"
              checked={codec === 'h265'}
              onChange={() => setCodec('h265')}
              className="radio-mac"
            />
            <span className="text-gray-900 dark:text-white">高质量 (H.265)</span>
          </label>
        </div>
      </div>

      {/* 压缩设置 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          压缩设置
        </h3>
        <div className="flex space-x-6 mb-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="size"
              checked={mode === 'size'}
              onChange={() => setMode('size')}
              className="radio-mac"
            />
            <span className="text-gray-900 dark:text-white">目标大小</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="ratio"
              checked={mode === 'ratio'}
              onChange={() => setMode('ratio')}
              className="radio-mac"
            />
            <span className="text-gray-900 dark:text-white">压缩比例</span>
          </label>
        </div>

        {mode === 'size' ? (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={targetSize}
              onChange={(e) => setTargetSize(e.target.value)}
              placeholder="100"
              className="input-mac w-32"
            />
            <span className="text-gray-600 dark:text-gray-400">MB</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={compressionRatio}
              onChange={(e) => setCompressionRatio(e.target.value)}
              placeholder="50"
              min="1"
              max="99"
              className="input-mac w-32"
            />
            <span className="text-gray-600 dark:text-gray-400">%</span>
          </div>
        )}
      </div>

      {/* 预览信息 */}
      {estimatedSize > 0 && (
        <div className="bg-mac-gray-50 dark:bg-mac-gray-800 rounded-lg p-4 space-y-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            压缩后预计大小: <span className="font-medium text-gray-900 dark:text-white">~{formatSize(estimatedSize)}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            预计节省空间: <span className="font-medium text-gray-900 dark:text-white">
              {formatSize(estimatedSaved)} ({((estimatedSaved / videoData.size) * 100).toFixed(1)}%)
            </span>
          </p>
        </div>
      )}

      {/* 开始按钮 */}
      <div className="pt-2">
        <button
          onClick={handleStart}
          disabled={!isValid()}
          className={`w-full btn-primary ${!isValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          开始压缩
        </button>
      </div>
    </div>
  )
}

