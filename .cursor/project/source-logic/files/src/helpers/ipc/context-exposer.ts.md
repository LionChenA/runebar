# Context Exposer

**Path:** src/helpers/ipc/context-exposer.ts

## Component Overview

context-exposer.ts 提供了一个集中的函数，用于在 Electron 的预加载脚本中暴露所有必要的上下文。它作为一个协调器，确保所有需要从主进程暴露给渲染进程的 API 都被正确注册。

**核心特性:**
- 集中管理所有上下文暴露逻辑
- 协调多个功能模块的上下文暴露
- 简化预加载脚本的结构

## Implementation Details

### 上下文暴露函数

文件导出了一个默认函数 `exposeContexts`，它负责调用各个模块的上下文暴露函数：

1. `exposeWindowContext`: 暴露窗口控制相关的 API
2. `exposeThemeContext`: 暴露主题管理相关的 API

这种模块化的设计使得添加新的上下文变得简单，只需创建新的暴露函数并在 `exposeContexts` 中调用它。

### 模块化设计

文件采用了模块化设计，将不同功能的上下文暴露逻辑分离到不同的模块中：
- 窗口控制功能在 `./window/window-context` 模块中
- 主题管理功能在 `./theme/theme-context` 模块中

## Usage Scenarios

context-exposer.ts 在以下场景中使用：
- 在 Electron 的预加载脚本中初始化所有 IPC 通信通道
- 设置渲染进程可以安全访问的主进程功能
- 确保上下文隔离环境中的安全通信

## Technical Considerations

- **安全性**: 遵循 Electron 的上下文隔离模型，安全地暴露 API
- **模块化**: 将不同功能的上下文暴露逻辑分离，提高代码的可维护性
- **可扩展性**: 设计允许轻松添加新的上下文暴露功能
- **单一职责**: 每个模块只负责暴露自己的功能，符合单一职责原则

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 