# 快捷键功能设计

## 概述
本文档描述了Runebar应用中快捷键功能的实现方案，包括主进程全局快捷键和渲染进程局部快捷键。

## 设计决策
- 主进程：使用Electron的globalShortcut API直接注册全局快捷键
- 渲染进程：使用自定义React hook管理局部快捷键
- 键盘测试：提供可视化的键盘测试工具，帮助调试快捷键
- 未来扩展：预留与electron-store和hotkeys-js集成的接口，支持用户自定义配置

## 技术实现

### 主进程全局快捷键
- 使用Electron的globalShortcut模块
- 在应用启动时注册，应用退出时注销
- 通过IPC通道向渲染进程发送事件

#### 文件结构
- `src/helpers/ipc/shortcut/shortcut-channels.ts` - 定义IPC通道名称
- `src/helpers/ipc/shortcut/global-shortcut.ts` - 全局快捷键注册和注销
- `src/helpers/ipc/shortcut/shortcut-context.ts` - 渲染进程快捷键上下文

#### 注册流程
1. 主进程启动时，通过`registerListeners`注册全局快捷键
2. 应用退出时，通过`app.on("will-quit")`注销全局快捷键
3. 快捷键触发时，通过`mainWindow.webContents.send()`向渲染进程发送事件

### 渲染进程局部快捷键
- 自定义`useHotkeys` hook封装键盘事件监听逻辑
- 支持组件级别快捷键注册与注销
- 提供简洁API，便于在各组件中使用
- 内置调试模式，提供详细的快捷键触发信息

#### 文件结构
- `src/hooks/useHotkeys.ts` - 自定义hook实现
- `src/pages/HomePage.tsx` - 示例用法

#### 使用方式
```typescript
// 局部快捷键示例
useHotkeys(
  {
    "ctrl+s": (e) => saveDocument(),
    "esc": (e) => closeModal()
  },
  [saveDocument, closeModal],
  { debug: true } // 可选的调试模式
);

// 全局快捷键事件监听示例
useGlobalShortcut((event) => {
  console.log(`Global shortcut: ${event.type}`);
});
```

### 键盘测试功能
- 提供可视化的键盘测试界面，帮助调试快捷键
- 实时显示当前按下的键和组合键
- 显示最后一次按键事件的详细信息
- 显示已注册的所有快捷键
- 快捷键触发时提供明显的视觉反馈

#### 键盘测试界面功能
- 通过`Ctrl+K`快捷键切换显示/隐藏
- 显示当前按下的所有键
- 显示最后一次按键事件的键名、键码、组合键和是否触发了快捷键
- 列出所有已注册的快捷键
- 使用`useKeyboardMonitor` hook监控所有键盘事件

## 当前已实现的快捷键

### 全局快捷键
- `CommandOrControl+Shift+Space` - 切换应用窗口可见性
- `CommandOrControl+Shift+A` - 显示应用窗口并聚焦

### 局部快捷键（仅在HomePage.tsx示例中）
- `Ctrl+D` - 切换主题（深色/浅色）
- `Ctrl+L` - 切换语言（英文/中文）
- `Ctrl+K` - 切换键盘测试界面
- `Escape` - 清除快捷键消息

## 后续扩展
- 集成electron-store持久化快捷键配置
- 集成hotkeys-js提供更强大的快捷键管理
- 实现用户界面，允许用户自定义快捷键 