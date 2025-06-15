/**
 * 快捷键类型定义
 * 这个文件包含所有快捷键相关的类型定义，不导入任何Electron模块
 * 用于在渲染进程中安全地使用快捷键类型，避免模块外部化问题
 */

import type { IPCEvent, IPCEventListener } from "./ipc-types"

/**
 * 快捷键事件，继承自基础IPC事件
 */
export interface ShortcutEvent extends IPCEvent {
  type: string
  timestamp: number
  data?: unknown
}

/**
 * 快捷键事件监听器函数类型
 */
export type ShortcutEventListener = (event: ShortcutEvent) => void

/**
 * 快捷键上下文API接口
 * 定义了渲染进程中可用的快捷键相关API
 */
export interface ShortcutContext {
  /**
   * 添加快捷键事件监听器
   * @param listener 监听器函数
   * @returns 清理函数，调用后移除监听器
   */
  onShortcut: (listener: ShortcutEventListener) => () => void
}

/**
 * 键盘组合键类型
 */
export type KeyCombo = string

/**
 * 键盘事件处理器类型
 */
export type KeyHandler = (event: KeyboardEvent) => void

/**
 * 快捷键选项配置
 */
export interface HotkeyOptions {
  enableOnFormTags?: boolean
  preventDefault?: boolean
  debug?: boolean
  platform?: "mac" | "windows" | "linux" | "auto"
  captureSystemKeys?: boolean
}

/**
 * 平台类型
 */
export type Platform = "mac" | "windows" | "linux"

/**
 * 快捷键映射类型
 */
export type KeyMap = Record<KeyCombo, KeyHandler>
