# Theme Management Helpers

**Path:** src/helpers/theme_helpers.ts

## Component Overview

theme_helpers.ts 提供了一组用于管理应用程序主题的辅助函数。它处理主题的获取、设置、切换和同步，支持深色、浅色和系统主题模式，并确保主题设置在本地存储和文档样式之间保持同步。

**核心特性:**
- 主题模式管理（深色、浅色、系统）
- 主题状态的本地存储
- 主题与文档样式的同步
- 与 Electron 主进程的主题 API 集成

## Implementation Details

### 数据结构

文件定义了一个 `ThemePreferences` 接口，用于表示主题偏好：
- `system`: 当前系统主题模式
- `local`: 本地存储的主题模式（可能为 null）

### 主题管理函数

文件导出了几个关键函数：

1. `getCurrentTheme`: 获取当前主题状态，包括系统主题和本地存储的主题
2. `setTheme`: 设置新的主题模式，更新文档样式并保存到本地存储
3. `toggleTheme`: 切换主题模式（深色/浅色）
4. `syncThemeWithLocal`: 应用程序启动时，将主题与本地存储同步

### 与 Electron 的集成

函数通过 `window.themeMode` API（由预加载脚本暴露）与 Electron 主进程通信：
- `window.themeMode.current()`: 获取当前主题
- `window.themeMode.dark()`: 设置深色主题
- `window.themeMode.light()`: 设置浅色主题
- `window.themeMode.system()`: 设置系统主题
- `window.themeMode.toggle()`: 切换主题

### 文档样式更新

`updateDocumentTheme` 函数通过添加或移除 HTML 根元素的 "dark" 类来更新文档样式，这与 Tailwind CSS 的深色模式配置相匹配。

## Usage Scenarios

theme_helpers.ts 中的函数用于：
- 应用程序启动时同步主题设置
- 响应用户主题切换请求
- 在深色和浅色主题之间切换
- 遵循系统主题设置

## Technical Considerations

- **持久化**: 使用 localStorage 存储用户的主题偏好
- **跨进程通信**: 通过预加载脚本暴露的 API 与 Electron 主进程通信
- **CSS 集成**: 通过 HTML 类名与 Tailwind CSS 的深色模式集成
- **异步操作**: 所有与主进程的通信都是异步的，使用 Promise

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 