import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { join } from 'path'
import { 
  getVideoInfo, 
  compressVideo, 
  cancelCompression 
} from './ffmpeg'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    center: true,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'under-window', // macOS毛玻璃效果
    visualEffectState: 'active',
    backgroundColor: '#00000000',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // 开发环境加载vite服务器，生产环境加载构建文件
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
    // mainWindow.webContents.openDevTools() // 如需调试，取消此行注释
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 应用启动
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 所有窗口关闭时退出应用（macOS除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC处理：获取视频信息
ipcMain.handle('get-video-info', async (_, filePath: string) => {
  try {
    const info = await getVideoInfo(filePath)
    return { success: true, data: info }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// IPC处理：压缩视频
ipcMain.handle('compress-video', async (_, params: {
  inputPath: string
  outputPath: string
  codec: 'h264' | 'h265'
  targetBitrate: number
}) => {
  try {
    await compressVideo(params, (progress) => {
      // 发送进度更新到渲染进程
      mainWindow?.webContents.send('compression-progress', progress)
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// IPC处理：取消压缩
ipcMain.handle('cancel-compression', async () => {
  try {
    cancelCompression()
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// IPC处理：打开文件位置
ipcMain.handle('open-file-location', async (_, filePath: string) => {
  try {
    shell.showItemInFolder(filePath)
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// IPC处理：选择文件
ipcMain.handle('select-file', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ['openFile'],
      filters: [
        { name: 'Videos', extensions: ['mp4', 'avi', 'mov'] }
      ]
    })
    
    if (!result.canceled && result.filePaths.length > 0) {
      return { success: true, filePath: result.filePaths[0] }
    }
    return { success: false }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

