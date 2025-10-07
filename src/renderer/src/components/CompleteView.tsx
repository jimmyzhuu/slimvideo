interface CompleteViewProps {
  result: {
    originalSize: number
    compressedSize: number
    savedSize: number
    savedPercent: number
  }
  onOpenLocation: () => void
  onCompressNew: () => void
}

export default function CompleteView({ result, onOpenLocation, onCompressNew }: CompleteViewProps) {
  const formatSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
    }
    return `${(bytes / (1024 * 1024)).toFixed(0)} MB`
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-6 px-8">
        {/* 成功图标 */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            压缩完成！
          </h2>
          
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>
              原文件: <span className="font-medium text-gray-900 dark:text-white">{formatSize(result.originalSize)}</span>
            </p>
            <p>
              压缩后: <span className="font-medium text-gray-900 dark:text-white">{formatSize(result.compressedSize)}</span>
            </p>
            <p>
              节省空间: <span className="font-medium text-green-600 dark:text-green-400">
                {formatSize(result.savedSize)} ({result.savedPercent.toFixed(1)}%)
              </span>
            </p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-4 pt-4">
          <button onClick={onOpenLocation} className="flex-1 btn-secondary">
            打开文件位置
          </button>
          <button onClick={onCompressNew} className="flex-1 btn-primary">
            压缩新视频
          </button>
        </div>
      </div>
    </div>
  )
}

