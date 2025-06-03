# Window Listeners

**Path:** src/helpers/ipc/window/window-listeners.ts

## Component Overview

window-listeners.ts 提供了一个函数，用于在 Electron 的主进程中注册窗口控制相关的事件监听器。它处理来自渲染进程的窗口控制请求，并操作 Electron 的 BrowserWindow 实例来实现窗口控制功能。

**核心特性:**
- 注册窗口控制相关的 IPC 事件监听器
- 处理渲染进程的窗口控制请求
- 操作 Electron 的 BrowserWindow 实例

## Implementation Details

### 监听器注册函数

文件导出了一个函数 `addWindowEventListeners`，它接收一个 BrowserWindow 实例作为参数，并注册了三个 IPC 事件监听器，每个监听器对应一个窗口操作：

1. `WIN_MINIMIZE_CHANNEL`: 最小化窗口
2. `WIN_MAXIMIZE_CHANNEL`: 最大化/还原窗口
3. `WIN_CLOSE_CHANNEL`: 关闭窗口

### 窗口控制逻辑

窗口控制逻辑直接操作传入的 BrowserWindow 实例：
- 最小化: 调用 `mainWindow.minimize()`
- 最大化/还原: 根据当前窗口状态调用 `mainWindow.maximize()` 或 `mainWindow.unmaximize()`
- 关闭: 调用 `mainWindow.close()`

特别地，最大化操作会先检查窗口当前是否已经最大化（`mainWindow.isMaximized()`），然后决定是最大化还是还原窗口。

## Usage Scenarios

window-listeners.ts 中的函数在以下场景中使用：
- 在 Electron 的主进程初始化过程中注册窗口控制事件监听器
- 响应渲染进程的窗口控制请求
- 实现应用程序的自定义窗口标题栏功能

## Technical Considerations

- **窗口实例**: 函数需要接收 BrowserWindow 实例作为参数
- **事件处理**: 使用 ipcMain.handle 处理渲染进程的异步请求
- **窗口状态**: 最大化操作会检查当前窗口状态，实现切换行为
- **通道复用**: 使用 window-channels.ts 中定义的通道常量，确保一致性

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 