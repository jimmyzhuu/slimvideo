import { useState, useEffect } from 'react'

interface ProgressViewProps {
  filename: string
  onCancel: () => void
}

export default function ProgressView({ filename, onCancel }: ProgressViewProps) {
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [speed, setSpeed] = useState(0)

  useEffect(() => {
    // 监听压缩进度
    window.electronAPI.onCompressionProgress((progressData) => {
      setProgress(progressData.percent)
      setCurrentTime(progressData.currentTime)
      setRemainingTime(progressData.remainingTime)
      setSpeed(progressData.speed)
    })

    return () => {
      window.electronAPI.removeCompressionProgressListener()
    }
  }, [])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md px-8 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            正在压缩 {filename}
          </h3>
        </div>

        {/* 进度条 */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-mac-gray-200 dark:bg-mac-gray-700 rounded-full overflow-hidden">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 时间信息 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">已处理视频:</span>
            <span className="font-medium text-gray-900 dark:text-white">{formatTime(currentTime)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">预计剩余:</span>
            <span className="font-medium text-gray-900 dark:text-white">{formatTime(remainingTime)}</span>
          </div>
        </div>

        {/* 取消按钮 */}
        <div className="pt-4">
          <button onClick={onCancel} className="w-full btn-danger">
            取消压缩
          </button>
        </div>
      </div>
    </div>
  )
}

