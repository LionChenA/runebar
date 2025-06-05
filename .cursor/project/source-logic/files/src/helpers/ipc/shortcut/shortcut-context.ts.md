# Shortcut Context - 快捷键上下文桥接

## 组件概述

**文件路径:** `src/helpers/ipc/shortcut/shortcut-context.ts`  
**角色:** 桥接层 - 主进程与渲染进程通信  
**层级:** 基础设施层

`shortcut-context.ts`实现了主进程和渲染进程之间的快捷键事件通信桥接，使用Electron的contextBridge API暴露全局快捷键事件给渲染进程，允许React组件监听和响应在主进程中注册的全局快捷键。

## 核心功能

- 定义快捷键事件的数据结构和监听器类型
- 通过contextBridge在渲染进程中暴露快捷键API
- 提供可靠的事件监听器注册和清理机制
- 确保主进程与渲染进程之间的安全通信

## 实现细节

### 类型定义

- `ShortcutEvent`: 定义从主进程发送到渲染进程的快捷键事件格式
- `ShortcutEventListener`: 定义渲染进程中的快捷键事件监听器函数类型
- `ShortcutContext`: 定义暴露给渲染进程的API接口

### 事件桥接

- `exposeShortcutContext()`: 使用contextBridge暴露快捷键API到渲染进程
- 使用Map存储监听器引用，确保可靠的事件注册和注销
- 提供`onShortcut`方法，用于注册快捷键事件监听器
- 返回清理函数用于移除监听器，防止内存泄漏

## 与其他模块的关系

- 依赖`shortcut-channels.ts`中定义的IPC通道名称
- 与`ShortcutManager`协同工作，接收主进程发送的全局快捷键事件
- 为`useGlobalShortcut` React钩子提供底层功能支持

## 使用场景

- React组件需要响应全局快捷键事件
- 在渲染进程中监听由主进程触发的快捷键事件
- 实现应用级别的快捷键功能，如显示/隐藏窗口

## 技术考量

- **安全性:** 使用contextBridge确保渲染进程和主进程之间的隔离
- **可靠性:** 实现可靠的事件监听器注册和清理机制
- **性能:** 高效处理事件监听器，避免内存泄漏
- **类型安全:** 提供完整的TypeScript类型定义

## 开发者注释

- 通过预加载脚本`preload.ts`在应用启动时执行`exposeShortcutContext()`
- 使用`electronShortcut.onShortcut`监听事件，并确保在组件卸载时清理监听器
- 所有全局快捷键事件都通过`SHORTCUT_EVENT_CHANNEL`单一通道传输 