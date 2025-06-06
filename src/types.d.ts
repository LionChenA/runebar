/**
 * 全局类型定义文件
 * 集中管理整个应用的全局类型和声明
 */

import type { ShortcutContext } from "./helpers/ipc/shortcut/shortcut-context"
import type { ThemeChangeEvent, ThemePreferences } from "./helpers/theme"

// 全局Window接口扩展
declare global {
  interface Window {
    // 预加载脚本中暴露的API
    themeMode: ThemeModeContext
    electronWindow: WindowContext
    shortcut: ShortcutContext
  }
}

// 主题模式上下文
interface ThemeModeContext {
  current: () => Promise<ThemePreferences>
  toggle: () => Promise<boolean>
  dark: () => Promise<boolean>
  light: () => Promise<boolean>
  system: () => Promise<boolean>
  onThemeChange: (callback: (event: ThemeChangeEvent) => void) => () => void
}

// 窗口上下文
interface WindowContext {
  minimize: () => Promise<void>
  maximize: () => Promise<void>
  close: () => Promise<void>
  toggleRunebar: () => Promise<void>
}

// 确保这个文件被视为一个模块
