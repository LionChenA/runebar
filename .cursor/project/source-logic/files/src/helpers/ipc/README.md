# IPC 通信系统

## 系统概述

runebar 应用程序的 IPC（进程间通信）系统是一个模块化的架构，用于在 Electron 的主进程和渲染进程之间建立安全、可靠的通信。该系统遵循 Electron 的上下文隔离安全模型，确保渲染进程不能直接访问 Electron 的 API，而是通过预定义的通道进行通信。

## 架构设计

IPC 系统采用了分层的模块化设计，由以下几个主要组件组成：

### 1. 中央协调器

- **context-exposer.ts**: 在预加载脚本中集中暴露所有上下文
- **listeners-register.ts**: 在主进程中集中注册所有事件监听器

### 2. 功能模块

每个功能模块（如主题管理、窗口控制等）都包含三个关键文件：

- **{module}-channels.ts**: 定义 IPC 通道常量
- **{module}-context.ts**: 暴露渲染进程可访问的 API
- **{module}-listeners.ts**: 在主进程中处理渲染进程的请求

### 3. 渲染进程辅助函数

- **helpers/{module}_helpers.ts**: 提供简化的接口，封装对 IPC API 的调用

## 数据流

IPC 系统中的数据流遵循以下模式：

1. 渲染进程通过 `window.{namespace}.{method}()` 调用暴露的 API
2. 预加载脚本将调用转换为对特定 IPC 通道的 `ipcRenderer.invoke()` 调用
3. 主进程中的监听器接收请求，执行相应操作
4. 主进程返回结果，通过 Promise 传递回渲染进程

## 安全考虑

IPC 系统设计时考虑了以下安全因素：

- **上下文隔离**: 使用 contextBridge 安全地暴露 API
- **有限的 API**: 只暴露必要的功能，限制渲染进程的权限
- **类型安全**: 使用 TypeScript 确保类型安全
- **异步通信**: 使用 Promise 进行异步通信，避免阻塞

## 现有模块

### 主题管理模块

负责应用程序主题的控制，包括获取、设置和切换主题模式。

### 窗口控制模块

负责应用程序窗口的控制，包括最小化、最大化和关闭窗口。

## 扩展指南

要添加新的功能模块，需要创建以下文件：

1. `src/helpers/ipc/{module}/{module}-channels.ts`: 定义通道常量
2. `src/helpers/ipc/{module}/{module}-context.ts`: 创建上下文暴露函数
3. `src/helpers/ipc/{module}/{module}-listeners.ts`: 创建事件监听器

然后，将新模块集成到中央协调器中：

1. 在 `context-exposer.ts` 中导入并调用上下文暴露函数
2. 在 `listeners-register.ts` 中导入并调用事件监听器注册函数

最后，创建渲染进程辅助函数：

- `src/helpers/{module}_helpers.ts`: 提供简化的接口 