/**
 * 全局类型定义文件
 * 集中管理整个应用的全局类型和声明
 */

import type { ShortcutContext, ShortcutEvent } from "@/types/shortcut-types"
import type { ThemeContext, ThemeState } from "@/types/theme-types"
import type { WindowContext } from "@/types/window-types"

// 全局Window接口扩展
declare global {
  interface Window {
    // 预加载脚本中暴露的API
    themeMode: {
      current: () => Promise<import("@/helpers/theme/theme_types").ThemePreferences>
      toggle: () => Promise<boolean>
      dark: () => Promise<boolean>
      light: () => Promise<boolean>
      system: () => Promise<boolean>
      onThemeChange: (callback: (event: ThemeState) => void) => () => void
    }
    electronWindow: WindowContext
    electronShortcut?: {
      onShortcut: (handler: (event: ShortcutEvent) => void) => () => void
    }
    settings: {
      getSettings: () => Promise<import("@/helpers/settings/renderer").SettingsData>
      setSettings: (
        settings: import("@/helpers/settings/renderer").SettingsData,
      ) => Promise<import("@/helpers/settings/renderer").SettingsData>
      exportSettings: (options: {
        settings: import("@/helpers/settings/renderer").SettingsData
        filePath?: string
      }) => Promise<{ success: boolean; filePath?: string; error?: string }>
      importSettings: (
        filePath?: string,
      ) => Promise<import("@/helpers/settings/renderer").ImportResult>
      getFonts: () => Promise<string[]>
      applyFont: (
        fontFamily: string,
        fontSize: number,
      ) => Promise<{ success: boolean; error?: string }>
      onSettingsChanged: (
        callback: (settings: import("@/helpers/settings/renderer").SettingsData) => void,
      ) => () => void
    }

    // 调试相关
    __hotkeyDebug?: {
      lastKeyEvent?: KeyboardEvent
      registeredShortcuts: string[]
      onKeyEvent?: (
        event: KeyboardEvent,
        eventType: "keydown" | "keyup",
        shortcutTriggered: boolean,
      ) => void
    }
  }
}

// 确保这个文件被视为一个模块
