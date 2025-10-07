# SlimVideo - Make Your Videos Lighter

<div align="center">

![SlimVideo Logo](https://img.shields.io/badge/SlimVideo-v1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

**A cross-platform minimalist video compression tool**

English | [简体中文](./README.md)

</div>

---

## ✨ Features

- 🚀 **Easy to Use** - Drag and drop to compress, zero learning curve
- 🎯 **Smart Compression** - High quality and high speed templates
- 🔒 **Local Processing** - All processing done locally, protecting privacy
- 🌍 **Cross-Platform** - Supports Windows, macOS, and Linux
- 🆓 **Completely Free** - Open source and free, no usage restrictions

## 💡 Why Choose SlimVideo?

### Advantages Over Using FFmpeg Directly

| Comparison | FFmpeg Command Line | SlimVideo |
|------------|---------------------|-----------|
| **Learning Curve** | Need to memorize complex commands and parameters | Drag and drop, zero learning curve |
| **Parameter Setup** | Manually calculate bitrate, quality settings | Enter target size or ratio, auto-calculated |
| **Operation Difficulty** | Long commands like:<br/>`ffmpeg -i input.mp4 -c:v libx265 -b:v 2000k ...` | Select template, set parameters, one-click compress |
| **Progress Display** | Text output in terminal | Beautiful visual progress bar |
| **File Management** | Manually specify output path and filename | Auto-naming, prevents overwriting original |
| **Video Information** | Requires separate `ffprobe` command | Auto-parsed and displayed details |
| **Compression Results** | Manually compare file sizes | Auto-statistics of saved space |
| **Target Users** | Professional users, developers | Everyone, including non-technical users |

### Core Advantages

#### 🎯 Smart Parameter Calculation
- **Target Size Mode**: Enter desired file size (e.g., 100MB), auto-calculates optimal bitrate
- **Compression Ratio Mode**: Set compression ratio (e.g., 50%), auto-adjusts parameters
- **Quality Assurance**: Built-in smart algorithm ensures bitrate won't be too low

#### 🎨 Zero Barrier to Entry
```
FFmpeg Way:
❌ Need to learn complex commands
❌ Need to understand codec parameters
❌ Need to calculate video bitrate

SlimVideo Way:
✅ Drag in video file
✅ Select compression template (High Speed/High Quality)
✅ Set target size
✅ Click start, done!
```

#### 🔒 Safe and Reliable
- Never overwrites original file, auto-adds `_compressed` suffix
- All processing done locally, privacy protected
- Can cancel compression anytime

#### 📊 Intuitive Feedback
- Real-time compression progress display
- Auto-displays saved space size and percentage
- One-click to open compressed file location

> **💡 In Short**: SlimVideo wraps FFmpeg's powerful but complex features into an easy-to-use tool for everyone. For 90% of daily video compression needs, SlimVideo provides a more efficient and user-friendly solution.

## 📸 Interface Preview

### Main Interface
- Drop Zone: Intuitive file drag and drop
- Video Info: Auto-display file details
- Compression Settings: Flexible parameter configuration
- Real-time Progress: Clear compression progress display

### Compression Templates

#### 🚄 High Speed Template (H.264)
- Codec: H.264 (AVC)
- Compression Speed: Fast
- Compatibility: Excellent
- Use Case: Quick compression needed

#### 🎬 High Quality Template (H.265)
- Codec: H.265 (HEVC)
- Compression Ratio: High (files ~50% of H.264 at same quality)
- Compression Speed: Medium
- Use Case: Minimum file size desired

## 🚀 Quick Start

### System Requirements

- **Windows**: Windows 10 or higher
- **macOS**: macOS 11.0 (Big Sur) or higher
- **Linux**: Popular distributions (Ubuntu 20.04+, Fedora 35+, etc.)
- Node.js 18+
- FFmpeg

### Installation Steps

#### 1. Install FFmpeg

<details>
<summary><b>macOS</b></summary>

```bash
# Install using Homebrew
brew install ffmpeg
```
</details>

<details>
<summary><b>Windows</b></summary>

**Option 1: Using Chocolatey (Recommended)**
```powershell
# Run PowerShell as Administrator
choco install ffmpeg
```

**Option 2: Manual Installation**
1. Visit [FFmpeg Official Website](https://ffmpeg.org/download.html)
2. Download Windows build
3. Extract to `C:\ffmpeg`
4. Add `C:\ffmpeg\bin` to system PATH environment variable
</details>

<details>
<summary><b>Linux</b></summary>

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ffmpeg

# Fedora
sudo dnf install ffmpeg

# Arch Linux
sudo pacman -S ffmpeg
```
</details>

#### 2. Clone the Project

```bash
git clone https://github.com/yourusername/slimvideo.git
cd slimvideo
```

#### 3. Install Dependencies

```bash
npm install
```

#### 4. Run the Application

```bash
# Development mode
npm run dev

# Build the application
npm run build

# Package application
npm run build:mac      # macOS
npm run build:win      # Windows
npm run build:linux    # Linux
```

## 📖 Usage Guide

### Basic Workflow

1. **Import Video**
   - Drag and drop video file to the app window
   - Or click the select file button
   - Supported formats: MP4, AVI, MOV

2. **Select Compression Template**
   - High Speed (H.264): Fast compression, good compatibility
   - High Quality (H.265): High compression ratio, smaller files

3. **Set Compression Parameters**
   - **Target Size**: Specify compressed file size directly (e.g., 100MB)
   - **Compression Ratio**: Compress by percentage (e.g., 50% = half the original size)

4. **Start Compression**
   - Click "Start Compression" button
   - View real-time compression progress
   - Can cancel anytime

5. **Complete**
   - View saved space statistics when done
   - Open file location directly
   - Or continue compressing new videos

### Output Information

- **Output Location**: Same directory as original file
- **File Naming**: Original filename + `_compressed` suffix
  - Example: `vacation.mp4` → `vacation_compressed.mp4`
- **Format Preservation**: Output format matches input format

## 🛠️ Tech Stack

### Core Technologies
- **Electron 27** - Cross-platform desktop app framework
- **React 18** - UI building
- **TypeScript 5** - Type safety
- **Tailwind CSS 3** - Styling framework

### Build Tools
- **electron-vite** - Fast Electron build tool
- **electron-builder** - App packaging tool

### Video Processing
- **FFmpeg** - Video encoding/decoding engine
- **fluent-ffmpeg** - FFmpeg Node.js wrapper

## 📁 Project Structure

```
slimvideo/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── index.ts         # Main process entry
│   │   └── ffmpeg.ts        # FFmpeg processing logic
│   ├── preload/              # Preload scripts
│   │   └── index.ts         # IPC bridge
│   └── renderer/             # React renderer process
│       ├── src/
│       │   ├── App.tsx      # Main component
│       │   ├── components/  # UI components
│       │   └── styles/      # Style files
│       └── index.html
├── resources/                # App resources
├── package.json
├── electron.vite.config.ts
└── README.md
```

## 🔧 Development Guide

### Development Mode

```bash
npm run dev
```

The app will start in development mode with hot reload support.

### Building the App

```bash
# Build all files
npm run build

# macOS
npm run build:mac              # Universal build
npm run build:mac:arm64        # Apple Silicon
npm run build:mac:x64          # Intel

# Windows
npm run build:win              # Windows installer

# Linux
npm run build:linux            # AppImage and deb packages
```

Packaged apps are located in the `out/` directory.

### Debugging Tips

- DevTools automatically open in development mode
- View FFmpeg output logs
- Use React DevTools for component debugging

## ❓ FAQ

### Q: FFmpeg not found error?
**A:** Please ensure FFmpeg is properly installed:
- **macOS**: `brew install ffmpeg`
- **Windows**: Use Chocolatey `choco install ffmpeg` or manually add to PATH
- **Linux**: `sudo apt install ffmpeg` (Ubuntu/Debian)

### Q: Compression is slow?
**A:** 
- Use "High Speed" template (H.264) for faster compression
- H.265 has higher compression ratio but slower speed
- Large files require more time to compress

### Q: Does it support batch compression?
**A:** Current version (v1.0) doesn't support it, planned for future releases.

### Q: How to control output video quality?
**A:** 
- Larger target size = better quality
- Higher compression ratio = lower quality
- Recommended to keep at 30-70% of original size for good results

## 🗺️ Roadmap

### v1.0 ✅ (Current Version)
- [x] Basic video compression
- [x] H.264/H.265 codec support
- [x] Real-time progress display
- [x] Native Mac UI

### v1.1+ (Planned)
- [ ] Batch processing
- [ ] More video format support (MKV, WEBM)
- [ ] Video preview
- [ ] GPU hardware acceleration
- [ ] More codecs (VP9, AV1)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

1. Fork this project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT](LICENSE) License - see the LICENSE file for details

## 👨‍💻 Authors

**SlimVideo Team**

## 🙏 Acknowledgments

- [FFmpeg](https://ffmpeg.org/) - Powerful video processing engine
- [Electron](https://www.electronjs.org/) - Cross-platform desktop app framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## ⭐ Star History

If this project helps you, please give it a Star ⭐️

---

<div align="center">

**Built with ❤️ as an open-source project**

[Report Bug](https://github.com/yourusername/slimvideo/issues) · [Request Feature](https://github.com/yourusername/slimvideo/issues)

</div>

