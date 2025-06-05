/**
 * 全局类型定义文件
 * 集中管理整个应用的全局类型和声明
 */

// ShortcutEvent类型定义
interface ShortcutEvent {
  type: string
  timestamp: number
  data?: unknown
}

// 窗口控制接口
interface ElectronWindow {
  minimize: () => Promise<void>
  maximize: () => Promise<void>
  close: () => Promise<void>
  toggleRunebar: () => Promise<void>
}

// 主题模式上下文
interface ThemeModeContext {
  toggle: () => Promise<boolean>
  dark: () => Promise<void>
  light: () => Promise<void>
  system: () => Promise<boolean>
  current: () => Promise<"dark" | "light" | "system">
}

// 全局Window接口扩展
declare global {
  interface Window {
    themeMode: ThemeModeContext
    electronWindow: ElectronWindow
    electronShortcut?: {
      onShortcut: (handler: (event: ShortcutEvent) => void) => () => void
    }
  }
}

// 确保这个文件被视为一个模块
export {}
