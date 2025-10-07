import { contextBridge, ipcRenderer } from 'electron'
import type { VideoInfo, CompressionProgress } from '../main/ffmpeg'

// 暴露给渲染进程的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取视频信息
  getVideoInfo: (filePath: string): Promise<{ success: boolean; data?: VideoInfo; error?: string }> => 
    ipcRenderer.invoke('get-video-info', filePath),

  // 压缩视频
  compressVideo: (params: {
    inputPath: string
    outputPath: string
    codec: 'h264' | 'h265'
    targetBitrate: number
  }): Promise<{ success: boolean; error?: string }> => 
    ipcRenderer.invoke('compress-video', params),

  // 取消压缩
  cancelCompression: (): Promise<{ success: boolean; error?: string }> => 
    ipcRenderer.invoke('cancel-compression'),

  // 打开文件位置
  openFileLocation: (filePath: string): Promise<{ success: boolean; error?: string }> => 
    ipcRenderer.invoke('open-file-location', filePath),

  // 选择文件
  selectFile: (): Promise<{ success: boolean; filePath?: string; error?: string }> => 
    ipcRenderer.invoke('select-file'),

  // 监听压缩进度
  onCompressionProgress: (callback: (progress: CompressionProgress) => void) => {
    ipcRenderer.on('compression-progress', (_, progress) => callback(progress))
  },

  // 移除压缩进度监听器
  removeCompressionProgressListener: () => {
    ipcRenderer.removeAllListeners('compression-progress')
  }
})

// TypeScript类型声明
declare global {
  interface Window {
    electronAPI: {
      getVideoInfo: (filePath: string) => Promise<{ success: boolean; data?: VideoInfo; error?: string }>
      compressVideo: (params: {
        inputPath: string
        outputPath: string
        codec: 'h264' | 'h265'
        targetBitrate: number
      }) => Promise<{ success: boolean; error?: string }>
      cancelCompression: () => Promise<{ success: boolean; error?: string }>
      openFileLocation: (filePath: string) => Promise<{ success: boolean; error?: string }>
      selectFile: () => Promise<{ success: boolean; filePath?: string; error?: string }>
      onCompressionProgress: (callback: (progress: CompressionProgress) => void) => void
      removeCompressionProgressListener: () => void
    }
  }
}

