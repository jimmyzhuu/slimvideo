import { useState, useCallback } from 'react'

interface DropZoneProps {
  onFileLoaded: (filePath: string) => void
}

export default function DropZone({ onFileLoaded }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const validateFile = (fileName: string): boolean => {
    const validExtensions = ['mp4', 'avi', 'mov']
    const ext = fileName.split('.').pop()?.toLowerCase()
    return validExtensions.includes(ext || '')
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return

    const file = files[0]
    if (!validateFile(file.name)) {
      setError('不支持的文件格式，请选择 MP4、AVI 或 MOV 文件')
      setTimeout(() => setError(null), 3000)
      return
    }

    // 检查文件路径是否存在
    const filePath = (file as any).path
    if (!filePath) {
      setError('无法获取文件路径，请尝试点击选择文件')
      setTimeout(() => setError(null), 3000)
      return
    }

    onFileLoaded(filePath)
  }, [onFileLoaded])

  const handleClick = async () => {
    const result = await window.electronAPI.selectFile()
    if (result.success && result.filePath) {
      onFileLoaded(result.filePath)
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-8">
      <div
        className={`drop-zone w-full max-w-xl h-80 flex flex-col items-center justify-center cursor-pointer ${
          isDragging ? 'active' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="text-6xl mb-4">📹</div>
        <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          将视频拖拽到此处
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          或点击选择文件
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
          支持 MP4、AVI、MOV 格式
        </p>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg fade-in">
          {error}
        </div>
      )}
    </div>
  )
}

