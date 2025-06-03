# Main Process Entry

**Path:** src/main.ts

## Component Overview

main.ts 是 Electron 应用程序的主进程入口点，负责创建和管理应用程序窗口、设置进程间通信 (IPC) 以及处理应用程序生命周期事件。它是 Electron 应用程序的核心，控制着整个应用程序的启动和运行。

**核心特性:**
- 创建和配置主应用窗口
- 设置开发环境特定功能（如开发者工具）
- 注册 IPC 监听器
- 处理应用程序生命周期事件
- 支持 macOS 特定的应用行为

## Implementation Details

### 窗口创建

`createWindow` 函数负责创建应用程序的主窗口，其关键配置包括：
- 设置窗口尺寸（宽 800px，高 600px）
- 配置 webPreferences 以确保安全性：
  - 启用上下文隔离 (contextIsolation)
  - 配置预加载脚本 (preload.js)
  - 在开发环境中启用开发者工具
- 使用隐藏的标题栏样式 (titleBarStyle: "hidden")
- 注册 IPC 监听器
- 根据环境加载适当的内容（开发服务器 URL 或打包后的 HTML 文件）

### 开发工具安装

`installExtensions` 函数用于在开发环境中安装 React 开发者工具，提升开发体验。

### 应用生命周期

文件包含对 Electron 应用程序关键生命周期事件的处理：
- `app.whenReady()`: 应用程序准备就绪时创建窗口并安装开发者工具
- `app.on("window-all-closed")`: 处理所有窗口关闭的情况，在非 macOS 平台退出应用
- `app.on("activate")`: 处理 macOS 特有的行为，在点击 dock 图标且没有窗口时创建新窗口

## Usage Scenarios

main.ts 作为 Electron 应用程序的主进程入口点，负责：
- 初始化应用程序环境
- 创建和管理应用程序窗口
- 设置进程间通信
- 处理平台特定的应用程序行为

## Technical Considerations

- **安全性**: 启用上下文隔离和禁用不必要的 Node 集成，遵循 Electron 安全最佳实践
- **开发体验**: 在开发环境中提供额外的工具和日志
- **平台兼容性**: 处理 macOS 特有的应用程序行为
- **进程间通信**: 使用注册的监听器进行主进程和渲染进程之间的通信
- **自定义标题栏**: 使用隐藏的标题栏样式，可能配合自定义 UI 实现应用程序控制

## Developer Notes & TODOs

- **注释**: 文件开头有关于 "electron-squirrel-startup" 在使用 Vite 打包时似乎存在问题的注释
- **标记区域**: 代码中标记了 "osX only" 的区域，指示特定于 macOS 的功能 