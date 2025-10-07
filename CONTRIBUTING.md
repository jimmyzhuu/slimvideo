# 贡献指南 / Contributing Guide

[English](#english) | [简体中文](#简体中文)

---

## 简体中文

### 欢迎贡献！

感谢您对 SlimVideo 项目的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- ✨ 开发新功能

### 开发环境设置

1. **Fork 本仓库**

2. **克隆您的 Fork**
   ```bash
   git clone https://github.com/yourusername/slimvideo.git
   cd slimvideo
   ```

3. **安装依赖**
   ```bash
   # 安装 FFmpeg
   brew install ffmpeg
   
   # 安装 Node 依赖
   npm install
   ```

4. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### 开发流程

1. **运行开发服务器**
   ```bash
   npm run dev
   ```

2. **进行您的修改**
   - 遵循现有代码风格
   - 添加适当的注释
   - 确保类型安全（TypeScript）

3. **测试您的更改**
   - 手动测试所有受影响的功能
   - 确保应用正常运行

4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加某某功能"
   ```

   **提交信息规范：**
   - `feat:` 新功能
   - `fix:` Bug 修复
   - `docs:` 文档更新
   - `style:` 代码格式调整
   - `refactor:` 代码重构
   - `perf:` 性能优化
   - `test:` 测试相关

5. **推送到您的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **创建 Pull Request**
   - 详细描述您的更改
   - 关联相关的 Issue（如果有）
   - 等待代码审查

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用函数式写法（React Hooks）
- 使用 Tailwind CSS 类名

### 项目结构

```
src/
├── main/          # Electron 主进程
├── preload/       # IPC 预加载脚本
└── renderer/      # React UI
    ├── src/
    │   ├── components/  # 可复用组件
    │   └── styles/      # 全局样式
```

### 需要帮助？

如果您有任何问题，欢迎：
- 在 Issues 中提问
- 在 Pull Request 中讨论
- 联系维护者

---

## English

### Welcome to Contribute!

Thank you for your interest in the SlimVideo project! We welcome all forms of contributions, including but not limited to:

- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🔧 Code fixes
- ✨ New feature development

### Development Setup

1. **Fork the repository**

2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/slimvideo.git
   cd slimvideo
   ```

3. **Install dependencies**
   ```bash
   # Install FFmpeg
   brew install ffmpeg
   
   # Install Node dependencies
   npm install
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Run development server**
   ```bash
   npm run dev
   ```

2. **Make your changes**
   - Follow existing code style
   - Add appropriate comments
   - Ensure type safety (TypeScript)

3. **Test your changes**
   - Manually test all affected features
   - Ensure the app runs correctly

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add some feature"
   ```

   **Commit Message Convention:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation update
   - `style:` Code formatting
   - `refactor:` Code refactoring
   - `perf:` Performance improvement
   - `test:` Testing related

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes in detail
   - Link related issues (if any)
   - Wait for code review

### Code Standards

- Write code in TypeScript
- Follow ESLint rules
- Format code with Prettier
- Use functional components (React Hooks)
- Use Tailwind CSS class names

### Project Structure

```
src/
├── main/          # Electron main process
├── preload/       # IPC preload scripts
└── renderer/      # React UI
    ├── src/
    │   ├── components/  # Reusable components
    │   └── styles/      # Global styles
```

### Need Help?

If you have any questions, feel free to:
- Ask in Issues
- Discuss in Pull Requests
- Contact maintainers

---

**Thank you for contributing! 感谢您的贡献！** 🎉

