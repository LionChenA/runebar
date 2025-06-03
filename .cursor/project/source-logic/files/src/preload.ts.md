# Preload Script

**Path:** src/preload.ts

## Component Overview

preload.ts 是 Electron 应用程序的预加载脚本，它在渲染进程启动之前运行，负责设置渲染进程与主进程之间的通信桥梁。它通过导入和执行上下文暴露函数，使渲染进程能够安全地访问主进程的功能。

**核心特性:**
- 初始化 IPC 通信系统
- 暴露安全的 API 到渲染进程
- 遵循 Electron 的上下文隔离安全模型

## Implementation Details

### 上下文暴露

文件非常简洁，只包含两行有效代码：

```javascript
import exposeContexts from "./helpers/ipc/context-exposer"

exposeContexts()
```

它导入 `exposeContexts` 函数并立即执行它。这个函数是 IPC 系统的中央协调器，负责暴露所有功能模块的 API。

### 模块化设计

预加载脚本采用了模块化设计，将具体的上下文暴露逻辑委托给 `context-exposer.ts`。这使得预加载脚本保持简洁，同时仍然能够暴露多个功能模块的 API。

## Usage Scenarios

preload.ts 在以下场景中使用：
- Electron 应用程序启动时，在渲染进程加载之前执行
- 建立渲染进程与主进程之间的通信桥梁
- 暴露安全的 API，使渲染进程能够与主进程通信

## Technical Considerations

- **安全性**: 遵循 Electron 的上下文隔离模型，确保渲染进程不能直接访问 Node.js 或 Electron API
- **模块化**: 将具体的上下文暴露逻辑委托给专门的模块，使代码更易于维护
- **可扩展性**: 通过 `context-exposer.ts` 的模块化设计，可以轻松添加新的功能模块

## Developer Notes & TODOs

无明确的 TODO、FIXME 或 NOTE 注释。 