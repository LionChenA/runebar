# Theme Context

**Path:** src/helpers/ipc/theme/theme-context.ts

## Component Overview

theme-context.ts 提供了一个函数，用于在 Electron 的预加载脚本中暴露主题管理相关的 API。它创建了一个安全的接口，使渲染进程能够与主进程通信以控制应用程序的主题。

**核心特性:**
- 暴露主题管理 API 到渲染进程
- 使用 contextBridge 确保安全的跨进程通信
- 提供简洁的接口用于主题操作

## Implementation Details

### 上下文暴露函数

文件导出了一个函数 `exposeThemeContext`，它使用 Electron 的 contextBridge API 将主题管理功能暴露给渲染进程：

```javascript
export function exposeThemeContext() {
  const { contextBridge, ipcRenderer } = window.require("electron")
  contextBridge.exposeInMainWorld("themeMode", {
    current: () => ipcRenderer.invoke(THEME_MODE_CURRENT_CHANNEL),
    toggle: () => ipcRenderer.invoke(THEME_MODE_TOGGLE_CHANNEL),
    dark: () => ipcRenderer.invoke(THEME_MODE_DARK_CHANNEL),
    light: () => ipcRenderer.invoke(THEME_MODE_LIGHT_CHANNEL),
    system: () => ipcRenderer.invoke(THEME_MODE_SYSTEM_CHANNEL),
  })
}
```

### 暴露的 API

函数暴露了一个名为 `themeMode` 的对象，包含以下方法：
- `current()`: 获取当前主题模式
- `toggle()`: 切换主题模式（深色/浅色）
- `dark()`: 设置深色主题
- `light()`: 设置浅色主题
- `system()`: 设置系统主题

每个方法都通过 `ipcRenderer.invoke()` 调用相应的 IPC 通道，与主进程通信。

## Usage Scenarios

theme-context.ts 中的函数在以下场景中使用：
- 在 Electron 的预加载脚本中初始化主题管理 API
- 使渲染进程能够安全地控制应用程序的主题
- 为渲染进程提供一个简洁的接口来管理主题

## Technical Considerations

- **安全性**: 使用 contextBridge 确保安全的跨进程通信
- **API 设计**: 提供简洁、直观的接口
- **Promise 支持**: 所有方法都返回 Promise，表明它们是异步的
- **通道复用**: 使用 theme-channels.ts 中定义的通道常量，确保一致性

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。