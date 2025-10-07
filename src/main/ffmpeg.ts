import ffmpeg from 'fluent-ffmpeg'
import { promisify } from 'util'
import { exec } from 'child_process'
import { basename } from 'path'

const execAsync = promisify(exec)

// 视频信息接口
export interface VideoInfo {
  filename: string
  size: number // bytes
  duration: number // seconds
  width: number
  height: number
  bitrate: number // kbps
  codec: string
}

// 压缩进度接口
export interface CompressionProgress {
  percent: number
  currentTime: number
  speed: number
  remainingTime: number
}

let currentFFmpegCommand: any = null

// 获取视频信息
export async function getVideoInfo(filePath: string): Promise<VideoInfo> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err)
        return
      }

      const videoStream = metadata.streams.find(s => s.codec_type === 'video')
      if (!videoStream) {
        reject(new Error('No video stream found'))
        return
      }

      const info: VideoInfo = {
        filename: basename(filePath),
        size: metadata.format.size || 0,
        duration: metadata.format.duration || 0,
        width: videoStream.width || 0,
        height: videoStream.height || 0,
        bitrate: Math.floor((metadata.format.bit_rate || 0) / 1000), // 转换为kbps
        codec: videoStream.codec_name || 'unknown'
      }

      resolve(info)
    })
  })
}

// 压缩视频
export async function compressVideo(
  params: {
    inputPath: string
    outputPath: string
    codec: 'h264' | 'h265'
    targetBitrate: number // kbps
  },
  onProgress: (progress: CompressionProgress) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    // 获取视频总时长
    ffmpeg.ffprobe(params.inputPath, (err, metadata) => {
      if (err) {
        reject(err)
        return
      }

      const duration = metadata.format.duration || 0
      const codecLib = params.codec === 'h264' ? 'libx264' : 'libx265'
      const preset = params.codec === 'h264' ? 'fast' : 'medium'
      
      let startTime = Date.now()
      let lastUpdateTime = 0

      const maxrate = Math.floor(params.targetBitrate * 1.2)  // 最大码率为目标的120%
      const bufsize = Math.floor(params.targetBitrate * 2)   // 缓冲区大小为目标的2倍
      
      // QuickTime 兼容性配置
      const videoOptions = [
        `-preset ${preset}`,
        '-movflags +faststart',
        '-pix_fmt yuv420p',
        `-maxrate ${maxrate}k`,
        `-bufsize ${bufsize}k`
      ]
      
      // H.264 添加 profile 确保 QuickTime 兼容
      if (params.codec === 'h264') {
        videoOptions.push('-profile:v high', '-level 4.1')
      }
      
      // H.265 添加 tag 确保兼容性
      if (params.codec === 'h265') {
        videoOptions.push('-tag:v hvc1')  // 使用 hvc1 tag 而不是 hev1
      }
      
      currentFFmpegCommand = ffmpeg(params.inputPath)
        .videoCodec(codecLib)
        .videoBitrate(`${params.targetBitrate}k`)
        .outputOptions(videoOptions)
        .audioCodec('aac')
        .audioBitrate('128k')
        .audioChannels(2)
        .audioFrequency(48000)  // 改为 48kHz，QuickTime 更兼容
        .output(params.outputPath)
        .format('mp4')  // 明确指定 MP4 格式
        .on('progress', (progressData) => {
          const currentTime = progressData.timemark ? parseTimemark(progressData.timemark) : 0
          const percent = Math.min((currentTime / duration) * 100, 100)
          
          // 计算实际处理速度：处理的视频时长 / 实际经过的时间
          const elapsedSeconds = (Date.now() - startTime) / 1000
          const speed = elapsedSeconds > 0 ? currentTime / elapsedSeconds : 0
          const remainingTime = speed > 0 ? (duration - currentTime) / speed : 0
          
          // 限制更新频率，避免跳动太快（每500ms更新一次）
          const now = Date.now()
          if (now - lastUpdateTime < 500 && percent < 99) {
            return
          }
          lastUpdateTime = now

          onProgress({
            percent: Math.floor(percent),
            currentTime,
            speed,
            remainingTime: Math.floor(remainingTime)
          })
        })
        .on('end', () => {
          currentFFmpegCommand = null
          resolve()
        })
        .on('error', (err) => {
          currentFFmpegCommand = null
          reject(err)
        })

      currentFFmpegCommand.run()
    })
  })
}

// 取消压缩
export function cancelCompression() {
  if (currentFFmpegCommand) {
    currentFFmpegCommand.kill('SIGKILL')
    currentFFmpegCommand = null
  }
}

// 解析时间标记（格式：00:00:00.00）
function parseTimemark(timemark: string): number {
  const parts = timemark.split(':')
  if (parts.length !== 3) return 0

  const hours = parseInt(parts[0], 10)
  const minutes = parseInt(parts[1], 10)
  const seconds = parseFloat(parts[2])

  return hours * 3600 + minutes * 60 + seconds
}

// 检查FFmpeg是否已安装
export async function checkFFmpegInstalled(): Promise<boolean> {
  try {
    await execAsync('ffmpeg -version')
    return true
  } catch {
    return false
  }
}

