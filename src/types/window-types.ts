/**
 * 窗口类型定义
 * 这个文件包含所有窗口相关的类型定义，不导入任何Electron模块
 * 用于在渲染进程中安全地使用窗口类型，避免模块外部化问题
 */

import type { IPCResult } from "./ipc-types"

/**
 * 窗口类型枚举
 */
export enum WindowType {
  APP = "app",
  RUNEBAR = "runebar",
}

/**
 * 窗口状态
 */
export interface WindowState {
  isMaximized: boolean
  isMinimized: boolean
  isFullScreen: boolean
  isVisible: boolean
  isFocused: boolean
}

/**
 * 窗口位置和尺寸
 */
export interface WindowBounds {
  x: number
  y: number
  width: number
  height: number
}

/**
 * 窗口配置选项
 */
export interface WindowConfig {
  width: number
  height: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  resizable?: boolean
  movable?: boolean
  minimizable?: boolean
  maximizable?: boolean
  closable?: boolean
  alwaysOnTop?: boolean
  fullscreenable?: boolean
  transparent?: boolean
  frame?: boolean
  titleBarStyle?: string
  backgroundColor?: string
}

/**
 * 窗口上下文API接口
 * 定义了渲染进程中可用的窗口相关API
 */
export interface WindowContext {
  /**
   * 最小化窗口
   */
  minimize: () => Promise<IPCResult<void>>

  /**
   * 最大化窗口
   */
  maximize: () => Promise<IPCResult<void>>

  /**
   * 关闭窗口
   */
  close: () => Promise<IPCResult<void>>

  /**
   * 切换窗口最大化状态
   */
  toggleMaximize: () => Promise<IPCResult<void>>

  /**
   * 显示窗口
   */
  show: () => Promise<IPCResult<void>>

  /**
   * 隐藏窗口
   */
  hide: () => Promise<IPCResult<void>>

  /**
   * 聚焦窗口
   */
  focus: () => Promise<IPCResult<void>>

  /**
   * 获取窗口状态
   */
  getState: () => Promise<IPCResult<WindowState>>

  /**
   * 获取窗口边界
   */
  getBounds: () => Promise<IPCResult<WindowBounds>>

  /**
   * 设置窗口边界
   */
  setBounds: (bounds: Partial<WindowBounds>) => Promise<IPCResult<void>>

  /**
   * 切换Runebar窗口
   */
  toggleRunebar: () => Promise<IPCResult<void>>
}
