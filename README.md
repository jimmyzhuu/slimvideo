# SlimVideo - 让你的视频更轻盈

<div align="center">

![SlimVideo Logo](https://img.shields.io/badge/SlimVideo-v1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

**一款跨平台的极简视频压缩工具**

[English](./README_EN.md) | 简体中文

</div>

---

## ✨ 特性

- 🚀 **简单易用** - 拖拽即可完成压缩，零学习成本
- 🎯 **智能压缩** - 提供高质量和高速度两种模板
- 🔒 **本地处理** - 所有处理完全在本地完成，保护隐私
- 🌍 **跨平台支持** - 支持 Windows、macOS 和 Linux
- 🆓 **完全免费** - 开源免费，无任何使用限制

## 💡 为什么选择 SlimVideo？

### 相比直接使用 FFmpeg 的优势

| 对比项 | FFmpeg 命令行 | SlimVideo |
|--------|--------------|-----------|
| **学习成本** | 需要记忆复杂命令和参数 | 拖拽即用，零学习成本 |
| **参数设置** | 手动计算码率、比特率等 | 输入目标大小或比例，自动计算 |
| **操作难度** | 需要输入长命令如：<br/>`ffmpeg -i input.mp4 -c:v libx265 -b:v 2000k ...` | 点选模板，设置参数，一键压缩 |
| **进度显示** | 终端文本信息 | 美观的可视化进度条 |
| **文件管理** | 需手动指定输出路径和文件名 | 自动命名，防止覆盖原文件 |
| **视频信息** | 需额外使用 `ffprobe` 查询 | 自动解析并展示详细信息 |
| **压缩效果** | 需手动对比文件大小 | 自动统计节省空间 |
| **适用人群** | 专业用户、开发者 | 所有用户，包括非技术人员 |

### 核心优势

#### 🎯 智能参数计算
- **目标大小模式**：直接输入想要的文件大小（如：100MB），自动计算最优码率
- **压缩比例模式**：设置压缩比例（如：50%），自动调整参数
- **质量保证**：内置智能算法，确保码率不会过低影响观看体验

#### 🎨 零门槛使用
```
FFmpeg 方式：
❌ 需要学习复杂命令
❌ 需要理解编码器参数
❌ 需要计算视频码率

SlimVideo 方式：
✅ 拖入视频文件
✅ 选择压缩模板（高速度/高质量）
✅ 设置目标大小
✅ 点击开始，完成！
```

#### 🔒 安全可靠
- 永不覆盖原文件，自动添加 `_compressed` 后缀
- 所有处理本地完成，保护隐私安全
- 可随时取消压缩操作

#### 📊 直观反馈
- 实时显示压缩进度
- 自动展示节省的空间大小和百分比
- 一键打开压缩后文件所在位置

> **💡 简单来说**：SlimVideo 将 FFmpeg 强大但复杂的功能封装成普通用户也能轻松使用的工具。对于 90% 的日常视频压缩需求，SlimVideo 提供了更高效、更友好的解决方案。

## 📸 界面预览

### 主界面
- 拖拽区域：直观的文件拖放界面
- 视频信息：自动显示文件详情
- 压缩设置：灵活的参数配置
- 实时进度：清晰的压缩进度显示

### 压缩模板

#### 🚄 高速度模板 (H.264)
- 编码器：H.264 (AVC)
- 压缩速度：快
- 兼容性：极佳
- 适用场景：需要快速压缩

#### 🎬 高质量模板 (H.265)
- 编码器：H.265 (HEVC)
- 压缩率：高（同等质量下文件约为H.264的50%）
- 压缩速度：中等
- 适用场景：追求最小文件体积

## 🚀 快速开始

### 系统要求

- **Windows**: Windows 10 或更高版本
- **macOS**: macOS 11.0 (Big Sur) 或更高版本
- **Linux**: 主流发行版（Ubuntu 20.04+、Fedora 35+ 等）
- Node.js 18+ 
- FFmpeg

### 安装步骤

#### 1. 安装 FFmpeg

<details>
<summary><b>macOS</b></summary>

```bash
# 使用 Homebrew 安装
brew install ffmpeg
```
</details>

<details>
<summary><b>Windows</b></summary>

**方法一：使用 Chocolatey（推荐）**
```powershell
# 以管理员权限运行 PowerShell
choco install ffmpeg
```

**方法二：手动安装**
1. 访问 [FFmpeg 官网](https://ffmpeg.org/download.html)
2. 下载 Windows 构建版本
3. 解压到 `C:\ffmpeg`
4. 将 `C:\ffmpeg\bin` 添加到系统环境变量 PATH
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

#### 2. 克隆项目

```bash
git clone https://github.com/yourusername/slimvideo.git
cd slimvideo
```

#### 3. 安装依赖

```bash
npm install
```

#### 4. 运行应用

```bash
# 开发模式
npm run dev

# 构建应用
npm run build

# 打包应用
npm run build:mac      # macOS
npm run build:win      # Windows
npm run build:linux    # Linux
```

## 📖 使用说明

### 基本使用流程

1. **导入视频**
   - 将视频文件拖拽到应用窗口
   - 或点击选择文件按钮
   - 支持格式：MP4、AVI、MOV

2. **选择压缩模板**
   - 高速度 (H.264)：快速压缩，兼容性好
   - 高质量 (H.265)：高压缩率，文件更小

3. **设置压缩参数**
   - **目标大小**：直接指定压缩后的文件大小（如：100MB）
   - **压缩比例**：按百分比压缩（如：50%为原文件的一半大小）

4. **开始压缩**
   - 点击"开始压缩"按钮
   - 实时查看压缩进度
   - 可随时取消压缩

5. **完成**
   - 压缩完成后显示节省空间统计
   - 可直接打开文件所在位置
   - 或继续压缩新视频

### 输出说明

- **输出位置**：原文件同目录
- **文件命名**：原文件名 + `_compressed` 后缀
  - 示例：`vacation.mp4` → `vacation_compressed.mp4`
- **格式保持**：输出格式与输入格式相同

## 🛠️ 技术栈

### 核心技术
- **Electron 27** - 跨平台桌面应用框架
- **React 18** - 用户界面构建
- **TypeScript 5** - 类型安全
- **Tailwind CSS 3** - 样式框架

### 构建工具
- **electron-vite** - 快速的 Electron 构建工具
- **electron-builder** - 应用打包工具

### 视频处理
- **FFmpeg** - 视频编码/解码引擎
- **fluent-ffmpeg** - FFmpeg Node.js 封装

## 📁 项目结构

```
slimvideo/
├── src/
│   ├── main/                 # Electron 主进程
│   │   ├── index.ts         # 主进程入口
│   │   └── ffmpeg.ts        # FFmpeg 处理逻辑
│   ├── preload/              # 预加载脚本
│   │   └── index.ts         # IPC 桥接
│   └── renderer/             # React 渲染进程
│       ├── src/
│       │   ├── App.tsx      # 主组件
│       │   ├── components/  # UI 组件
│       │   └── styles/      # 样式文件
│       └── index.html
├── resources/                # 应用资源
├── package.json
├── electron.vite.config.ts
└── README.md
```

## 🔧 开发指南

### 开发模式

```bash
npm run dev
```

应用将在开发模式下启动，支持热重载。

### 构建应用

```bash
# 构建所有文件
npm run build

# macOS
npm run build:mac              # 通用版本
npm run build:mac:arm64        # Apple Silicon
npm run build:mac:x64          # Intel

# Windows
npm run build:win              # Windows 安装包

# Linux
npm run build:linux            # AppImage 和 deb 包
```

打包后的应用位于 `out/` 目录。

### 调试技巧

- 开发模式下自动打开 DevTools
- 查看 FFmpeg 输出日志
- 使用 React DevTools 调试组件

## ❓ 常见问题

### Q: 提示找不到 FFmpeg？
**A:** 请确保已正确安装 FFmpeg：
- **macOS**: `brew install ffmpeg`
- **Windows**: 使用 Chocolatey `choco install ffmpeg` 或手动添加到 PATH
- **Linux**: `sudo apt install ffmpeg` (Ubuntu/Debian)

### Q: 压缩速度慢？
**A:** 
- 使用"高速度"模板（H.264）会更快
- H.265 压缩率更高但速度较慢
- 大文件压缩需要更多时间

### Q: 支持批量压缩吗？
**A:** 当前版本(v1.0)暂不支持，计划在后续版本中添加。

### Q: 输出视频质量如何控制？
**A:** 
- 目标大小越大，质量越好
- 压缩比例越高，质量越低
- 建议保持在原大小的30-70%获得较好效果

## 🗺️ 路线图

### v1.0 ✅ (当前版本)
- [x] 基础视频压缩功能
- [x] H.264/H.265 编码支持
- [x] 实时进度显示
- [x] Mac 原生 UI

### v1.1+ (计划中)
- [ ] 批量处理功能
- [ ] 更多视频格式支持 (MKV, WEBM)
- [ ] 视频预览功能
- [ ] GPU 硬件加速
- [ ] 更多编码器 (VP9, AV1)

## 🤝 贡献指南

欢迎贡献代码、提出问题和功能建议！详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议 - 详见 LICENSE 文件

## 👨‍💻 作者

**SlimVideo Team**

## 🙏 致谢

- [FFmpeg](https://ffmpeg.org/) - 强大的视频处理引擎
- [Electron](https://www.electronjs.org/) - 跨平台桌面应用框架
- [React](https://reactjs.org/) - 用户界面库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

## ⭐ Star History

如果这个项目对您有帮助，请给它一个 Star ⭐️

---

<div align="center">

**用 ❤️ 打造的开源项目**

[报告问题](https://github.com/yourusername/slimvideo/issues) · [功能建议](https://github.com/yourusername/slimvideo/issues)

</div>

