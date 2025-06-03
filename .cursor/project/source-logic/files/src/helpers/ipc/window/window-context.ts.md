# Window Context

**Path:** src/helpers/ipc/window/window-context.ts

## Component Overview

window-context.ts 提供了一个函数，用于在 Electron 的预加载脚本中暴露窗口控制相关的 API。它创建了一个安全的接口，使渲染进程能够与主进程通信以控制应用程序窗口。

**核心特性:**
- 暴露窗口控制 API 到渲染进程
- 使用 contextBridge 确保安全的跨进程通信
- 提供简洁的接口用于窗口操作

## Implementation Details

### 上下文暴露函数

文件导出了一个函数 `exposeWindowContext`，它使用 Electron 的 contextBridge API 将窗口控制功能暴露给渲染进程：

```javascript
export function exposeWindowContext() {
  const { contextBridge, ipcRenderer } = window.require("electron")
  contextBridge.exposeInMainWorld("electronWindow", {
    minimize: () => ipcRenderer.invoke(WIN_MINIMIZE_CHANNEL),
    maximize: () => ipcRenderer.invoke(WIN_MAXIMIZE_CHANNEL),
    close: () => ipcRenderer.invoke(WIN_CLOSE_CHANNEL),
  })
}
```

### 暴露的 API

函数暴露了一个名为 `electronWindow` 的对象，包含以下方法：
- `minimize()`: 最小化窗口
- `maximize()`: 最大化/还原窗口
- `close()`: 关闭窗口

每个方法都通过 `ipcRenderer.invoke()` 调用相应的 IPC 通道，与主进程通信。

## Usage Scenarios

window-context.ts 中的函数在以下场景中使用：
- 在 Electron 的预加载脚本中初始化窗口控制 API
- 使渲染进程能够安全地控制应用程序窗口
- 为自定义窗口标题栏提供必要的窗口控制功能

## Technical Considerations

- **安全性**: 使用 contextBridge 确保安全的跨进程通信
- **API 设计**: 提供简洁、直观的接口
- **Promise 支持**: 所有方法都返回 Promise，表明它们是异步的
- **通道复用**: 使用 window-channels.ts 中定义的通道常量，确保一致性

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 