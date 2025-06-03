# Theme Listeners

**Path:** src/helpers/ipc/theme/theme-listeners.ts

## Component Overview

theme-listeners.ts 提供了一个函数，用于在 Electron 的主进程中注册主题管理相关的事件监听器。它处理来自渲染进程的主题管理请求，并操作 Electron 的 nativeTheme API 来实现主题切换。

**核心特性:**
- 注册主题相关的 IPC 事件监听器
- 处理渲染进程的主题管理请求
- 操作 Electron 的 nativeTheme API

## Implementation Details

### 监听器注册函数

文件导出了一个函数 `addThemeEventListeners`，它注册了五个 IPC 事件监听器，每个监听器对应一个主题操作：

1. `THEME_MODE_CURRENT_CHANNEL`: 返回当前主题模式（`nativeTheme.themeSource`）
2. `THEME_MODE_TOGGLE_CHANNEL`: 切换主题模式（深色/浅色）
3. `THEME_MODE_DARK_CHANNEL`: 设置深色主题
4. `THEME_MODE_LIGHT_CHANNEL`: 设置浅色主题
5. `THEME_MODE_SYSTEM_CHANNEL`: 设置系统主题

### 主题切换逻辑

切换主题的逻辑主要通过设置 `nativeTheme.themeSource` 属性来实现：
- 设置为 `"dark"` 启用深色主题
- 设置为 `"light"` 启用浅色主题
- 设置为 `"system"` 使用系统主题

toggle 操作会根据当前的 `nativeTheme.shouldUseDarkColors` 值来决定切换到哪个主题。

## Usage Scenarios

theme-listeners.ts 中的函数在以下场景中使用：
- 在 Electron 的主进程初始化过程中注册主题事件监听器
- 响应渲染进程的主题管理请求
- 实现应用程序的主题切换功能

## Technical Considerations

- **状态管理**: 使用 Electron 的 nativeTheme API 管理主题状态
- **事件处理**: 使用 ipcMain.handle 处理渲染进程的异步请求
- **返回值**: 部分处理函数返回当前状态，使渲染进程能够更新 UI
- **通道复用**: 使用 theme-channels.ts 中定义的通道常量，确保一致性

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 