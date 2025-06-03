# TypeScript Declarations

**Path:** src/types.d.ts

## Component Overview

types.d.ts 是 TypeScript 声明文件，定义了应用程序中使用的全局类型和接口。它包含两类重要的类型定义：Electron Forge 生成的常量和预加载脚本暴露的 API 接口。

**核心特性:**
- 定义 Electron Forge 生成的魔术常量
- 定义预加载脚本暴露的 API 接口
- 扩展全局 Window 接口

## Implementation Details

### Electron Forge 常量

文件定义了 Electron Forge 的 Vite 插件自动生成的魔术常量：
- `MAIN_WINDOW_VITE_DEV_SERVER_URL`: 开发服务器 URL
- `MAIN_WINDOW_VITE_NAME`: Vite 应用名称

这些常量在主进程中用于确定应该加载的内容（开发服务器或打包后的文件）。

### 预加载脚本 API

文件定义了通过预加载脚本暴露给渲染进程的 API 接口：

1. `ThemeModeContext`: 主题模式控制接口
   - `toggle()`: 切换主题
   - `dark()`: 设置深色主题
   - `light()`: 设置浅色主题
   - `system()`: 设置系统主题
   - `current()`: 获取当前主题

2. `ElectronWindow`: 窗口控制接口
   - `minimize()`: 最小化窗口
   - `maximize()`: 最大化窗口
   - `close()`: 关闭窗口

### Window 接口扩展

通过声明合并，扩展了全局 `Window` 接口，添加了预加载脚本暴露的 API：
- `themeMode`: 主题模式控制 API
- `electronWindow`: 窗口控制 API

## Usage Scenarios

types.d.ts 作为 TypeScript 声明文件，用于：
- 为 Electron Forge 生成的常量提供类型支持
- 为预加载脚本暴露的 API 提供类型定义
- 确保在渲染进程中使用这些 API 时有完整的类型检查和自动完成

## Technical Considerations

- **类型安全**: 提供完整的类型定义，确保代码的类型安全
- **API 设计**: 反映了应用程序的 IPC 通信设计和主题管理策略
- **声明合并**: 使用 TypeScript 的声明合并功能扩展全局接口
- **异步通信**: 所有 IPC 方法都返回 Promise，表明它们是异步操作

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 