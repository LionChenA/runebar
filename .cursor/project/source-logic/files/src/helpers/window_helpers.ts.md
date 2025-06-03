# Window Control Helpers

**Path:** src/helpers/window_helpers.ts

## Component Overview

window_helpers.ts 提供了一组用于控制 Electron 应用程序窗口的辅助函数。它封装了通过预加载脚本暴露的窗口控制 API，提供了简单的函数来最小化、最大化和关闭应用程序窗口。

**核心特性:**
- 窗口最小化功能
- 窗口最大化功能
- 窗口关闭功能
- 与 Electron 主进程的窗口控制 API 集成

## Implementation Details

### 窗口控制函数

文件导出了三个简单但重要的函数：

1. `minimizeWindow`: 最小化应用程序窗口
   - 调用 `window.electronWindow.minimize()` API

2. `maximizeWindow`: 最大化应用程序窗口
   - 调用 `window.electronWindow.maximize()` API

3. `closeWindow`: 关闭应用程序窗口
   - 调用 `window.electronWindow.close()` API

### 与 Electron 的集成

这些函数通过 `window.electronWindow` API（由预加载脚本暴露）与 Electron 主进程通信，实现对窗口的控制。这种设计遵循了 Electron 的上下文隔离安全模型，确保渲染进程不能直接访问 Electron 的 API。

## Usage Scenarios

window_helpers.ts 中的函数主要用于：
- 自定义窗口标题栏的控制按钮
- 提供窗口控制快捷键功能
- 在应用程序中实现窗口管理功能

## Technical Considerations

- **安全性**: 通过预加载脚本暴露的 API 与主进程通信，遵循 Electron 的安全最佳实践
- **异步操作**: 所有窗口控制操作都返回 Promise，表明它们是异步的
- **用户体验**: 提供标准的窗口控制功能，符合用户对桌面应用程序的期望
- **自定义标题栏**: 与应用程序的自定义标题栏设计配合使用

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 