/**
 * 主题类型定义
 * 这个文件包含所有主题相关的类型定义，不导入任何Electron模块
 * 用于在渲染进程中安全地使用主题类型，避免模块外部化问题
 */

import type { IPCResult } from "./ipc-types"

/**
 * 主题模式
 */
export type ThemeMode = "light" | "dark" | "system"

/**
 * 主题配置
 */
export interface ThemeConfig {
  mode: ThemeMode
  accentColor?: string
  customColors?: Record<string, string>
}

/**
 * 主题状态
 */
export interface ThemeState {
  currentMode: ThemeMode
  isDarkMode: boolean
  systemPrefersDark: boolean
}

/**
 * 主题上下文API接口
 * 定义了渲染进程中可用的主题相关API
 */
export interface ThemeContext {
  /**
   * 获取当前主题状态
   */
  getTheme: () => Promise<IPCResult<ThemeState>>

  /**
   * 设置主题模式
   */
  setTheme: (mode: ThemeMode) => Promise<IPCResult<void>>

  /**
   * 切换主题模式（在light和dark之间切换）
   */
  toggleTheme: () => Promise<IPCResult<void>>

  /**
   * 监听主题变化
   */
  onThemeChange: (callback: (theme: ThemeState) => void) => () => void

  /**
   * 监听系统主题变化
   */
  onSystemThemeChange: (callback: (prefersDark: boolean) => void) => () => void
}

/**
 * CSS主题变量
 */
export interface ThemeVariables {
  "--background": string
  "--foreground": string
  "--primary": string
  "--primary-foreground": string
  "--secondary": string
  "--secondary-foreground": string
  "--muted": string
  "--muted-foreground": string
  "--accent": string
  "--accent-foreground": string
  "--destructive": string
  "--destructive-foreground": string
  "--border": string
  "--input": string
  "--ring": string
  "--radius": string
}
