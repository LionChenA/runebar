import { BrowserWindow, app, nativeTheme } from "electron"
import { THEME_MODE_CHANGED_CHANNEL } from "../ipc/theme/theme-channels"
import { DARK_CLASS_NAME, DEFAULT_THEME, THEME_STORAGE_KEY } from "./theme_constants"
import type { ThemeChangeEvent, ThemeMode, ThemePreferences } from "./theme_types"

/**
 * 主题管理器
 * 集中管理主题状态，确保所有窗口的主题保持同步
 */
export class ThemeManager {
  private static instance: ThemeManager | null = null
  private currentTheme: ThemeMode = DEFAULT_THEME
  private initialized = false

  private constructor() {
    // 监听系统主题变化
    nativeTheme.on("updated", () => {
      if (this.currentTheme === "system") {
        this.broadcastThemeChange()
      }
    })

    // 监听应用退出，清理资源
    app.on("will-quit", () => {
      nativeTheme.removeAllListeners("updated")
    })
  }

  /**
   * 获取ThemeManager实例
   */
  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager()
    }
    return ThemeManager.instance
  }

  /**
   * 初始化主题管理器
   * 从渲染进程的localStorage中恢复主题设置
   */
  public init(mainWindow: BrowserWindow): void {
    if (this.initialized) return

    // 从渲染进程获取保存的主题设置
    mainWindow.webContents
      .executeJavaScript(`localStorage.getItem('${THEME_STORAGE_KEY}')`)
      .then((savedTheme: string | null) => {
        if (savedTheme) {
          this.setTheme(savedTheme as ThemeMode)
        } else {
          this.setTheme(DEFAULT_THEME)
        }
        this.initialized = true
      })
      .catch((error) => {
        console.error("Failed to get theme from localStorage:", error)
        this.setTheme(DEFAULT_THEME)
        this.initialized = true
      })
  }

  /**
   * 获取当前主题偏好
   */
  public getThemePreferences(): ThemePreferences {
    return {
      system: nativeTheme.themeSource as ThemeMode,
      local: this.currentTheme,
      isDark: nativeTheme.shouldUseDarkColors,
    }
  }

  /**
   * 设置主题
   * @param theme 主题模式
   */
  public setTheme(theme: ThemeMode): boolean {
    this.currentTheme = theme

    switch (theme) {
      case "dark":
        nativeTheme.themeSource = "dark"
        break
      case "light":
        nativeTheme.themeSource = "light"
        break
      case "system":
        nativeTheme.themeSource = "system"
        break
      default:
        return false
    }

    // 广播主题变化到所有窗口
    this.broadcastThemeChange()
    return true
  }

  /**
   * 切换主题（在亮色和暗色之间）
   */
  public toggleTheme(): boolean {
    const newTheme = nativeTheme.shouldUseDarkColors ? "light" : "dark"
    return this.setTheme(newTheme)
  }

  /**
   * 广播主题变化到所有窗口
   */
  private broadcastThemeChange(): void {
    const windows = BrowserWindow.getAllWindows()
    const themeEvent: ThemeChangeEvent = {
      themeMode: this.currentTheme,
      isDark: nativeTheme.shouldUseDarkColors,
    }

    for (const window of windows) {
      if (!window.isDestroyed()) {
        window.webContents.send(THEME_MODE_CHANGED_CHANNEL, themeEvent)
      }
    }
  }
}
