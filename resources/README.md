# 应用图标 / Application Icons

## 📋 图标要求

如果需要打包应用，请添加以下图标文件：

### macOS
- **icon.icns** - macOS 图标文件 (1024x1024)

### Windows
- **icon.ico** - Windows 图标文件 (256x256，包含多个尺寸)

### Linux
- **icon.png** - Linux 图标文件 (512x512 或 1024x1024)

## 🔧 生成图标文件

### 方法 1: 使用在线工具（推荐）
访问 [AppIcon](https://www.appicon.co/) 或 [CloudConvert](https://cloudconvert.com/)，上传你的 PNG 图标即可生成所有格式。

### 方法 2: 使用命令行工具

```bash
# 安装 electron-icon-builder
npm install -g electron-icon-builder

# 从 1024x1024 的 PNG 生成所有平台图标
electron-icon-builder --input=./icon.png --output=./

# 或使用 png2icons
npm install -g png2icons

# 生成 macOS .icns
png2icons icon.png icon.icns --icns

# 生成 Windows .ico  
png2icons icon.png icon.ico --ico

# Linux 直接使用 PNG
cp icon.png ./icon.png
```

## 🎨 图标设计建议

- 简洁的视频图标
- 带有压缩/缩小的视觉暗示
- 遵循各平台设计规范
  - **macOS**: 圆角矩形，渐变效果
  - **Windows**: 清晰的边缘，适配浅色和深色主题
  - **Linux**: 简洁扁平化设计
- 使用高分辨率（至少 1024x1024）
- 支持透明背景

