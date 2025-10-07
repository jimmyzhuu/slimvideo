interface VideoInfoProps {
  videoData: {
    filename: string
    size: number
    duration: number
    width: number
    height: number
  }
  onRemove: () => void
}

export default function VideoInfo({ videoData, onRemove }: VideoInfoProps) {
  const formatSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
    }
    return `${(bytes / (1024 * 1024)).toFixed(0)} MB`
  }

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="px-8 pt-6 pb-4 border-b border-mac-gray-200 dark:border-mac-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">📁</div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {videoData.filename}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatSize(videoData.size)} · {formatDuration(videoData.duration)} · {videoData.width}×{videoData.height}
            </p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          title="移除视频"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

