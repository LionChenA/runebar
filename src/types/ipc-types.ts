/**
 * IPC 基础类型定义
 * 这个文件包含所有IPC通信相关的基础类型定义，不导入任何Electron模块
 * 用于在渲染进程中安全地使用类型，避免模块外部化问题
 */

/**
 * IPC 事件的基础结构
 */
export interface IPCEvent {
  type: string
  timestamp: number
  data?: unknown
}

/**
 * IPC 事件监听器函数类型
 */
export type IPCEventListener<T = unknown> = (event: IPCEvent & { data: T }) => void

/**
 * IPC 通道名称类型
 */
export type IPCChannel = string

/**
 * IPC 响应结果类型
 */
export interface IPCResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

/**
 * IPC 调用选项
 */
export interface IPCCallOptions {
  timeout?: number
  retries?: number
}
