# 更新日志 / Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-07

### Added / 新增
- ✨ 初始版本发布
- 🎯 支持 MP4、AVI、MOV 格式视频导入
- 🚀 H.264 (高速度) 和 H.265 (高质量) 两种压缩模板
- 📊 实时压缩进度显示
- 💎 Mac 原生风格 UI，支持深色模式
- 🔒 100% 本地处理，保护用户隐私
- 🎨 拖拽导入和文件选择两种方式
- ⚙️ 目标大小和压缩比例两种设置方式
- 📁 自动输出到原文件目录，添加 _compressed 后缀
- 🎬 压缩完成后显示节省空间统计
- 🔍 快速打开文件所在位置

### Technical / 技术实现
- Electron 27 + React 18 + TypeScript 5
- Tailwind CSS 3 样式框架
- electron-vite 快速构建
- fluent-ffmpeg 视频处理封装
- IPC 通信桥接主进程和渲染进程

---

## [Unreleased] / 未发布

### Planned / 计划中
- 批量压缩功能
- 更多视频格式支持 (MKV, WEBM)
- 错误处理优化
- 视频预览功能
- GPU 硬件加速

---

[1.0.0]: https://github.com/yourusername/slimvideo/releases/tag/v1.0.0

