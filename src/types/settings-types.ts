/**
 * 设置类型定义
 * 这个文件包含所有设置相关的类型定义，不导入任何Electron模块
 * 用于在渲染进程中安全地使用设置类型，避免模块外部化问题
 */

import type { IPCResult } from "./ipc-types"

/**
 * 应用设置接口
 */
export interface AppSettings {
  // 通用设置
  language: string
  theme: "light" | "dark" | "system"

  // 字体设置
  fontFamily: string
  fontSize: number

  // 窗口设置
  windowBounds?: {
    x: number
    y: number
    width: number
    height: number
  }

  // 快捷键设置
  shortcuts: Record<string, string>

  // 其他设置
  autoStart: boolean
  minimizeToTray: boolean
  showNotifications: boolean
}

/**
 * 字体信息
 */
export interface FontInfo {
  family: string
  displayName: string
  style: string
  weight: number
}

/**
 * 设置导出/导入格式
 */
export interface SettingsExport {
  version: string
  timestamp: number
  settings: AppSettings
}

/**
 * 设置上下文API接口
 * 定义了渲染进程中可用的设置相关API
 */
export interface SettingsContext {
  /**
   * 获取所有设置
   */
  getSettings: () => Promise<IPCResult<AppSettings>>

  /**
   * 保存设置
   */
  saveSettings: (settings: Partial<AppSettings>) => Promise<IPCResult<void>>

  /**
   * 重置设置到默认值
   */
  resetSettings: () => Promise<IPCResult<void>>

  /**
   * 导出设置
   */
  exportSettings: () => Promise<IPCResult<SettingsExport>>

  /**
   * 导入设置
   */
  importSettings: (settings: SettingsExport) => Promise<IPCResult<void>>

  /**
   * 获取可用字体列表
   */
  getAvailableFonts: () => Promise<IPCResult<FontInfo[]>>

  /**
   * 应用字体设置
   */
  applyFontSettings: (fontFamily: string, fontSize: number) => Promise<IPCResult<void>>

  /**
   * 监听设置变化
   */
  onSettingsChange: (callback: (settings: AppSettings) => void) => () => void
}

/**
 * 配置项类型
 */
export type ConfigItemType =
  | "string"
  | "number"
  | "boolean"
  | "select"
  | "multiselect"
  | "slider"
  | "color"
  | "file"
  | "directory"

/**
 * 选择选项
 */
export interface SelectOption {
  label: string
  value: string | number
  description?: string
}

/**
 * 配置项定义
 */
export interface ConfigItem {
  id: string
  label: string
  description?: string
  type: ConfigItemType
  defaultValue: unknown
  required?: boolean

  // 字符串类型选项
  placeholder?: string
  maxLength?: number

  // 数字/滑块类型选项
  min?: number
  max?: number
  step?: number

  // 选择类型选项
  options?: SelectOption[]

  // 文件类型选项
  fileFilters?: Array<{
    name: string
    extensions: string[]
  }>

  // 验证函数
  validate?: (value: unknown) => boolean | string
}

/**
 * 配置分类
 */
export interface ConfigCategory {
  id: string
  label: string
  description?: string
  icon?: string
  items: ConfigItem[]
}
