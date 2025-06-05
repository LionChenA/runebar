import { RunebarWindowManager } from "@/helpers/windows/runebar_manager"
import { app, globalShortcut } from "electron"
import type { BrowserWindow } from "electron"
import {
  GLOBAL_SHORTCUT_COMMAND_MENU_CHANNEL,
  GLOBAL_SHORTCUT_RUNEBAR_TOGGLE_CHANNEL,
  GLOBAL_SHORTCUT_SHOW_APP_CHANNEL,
  GLOBAL_SHORTCUT_TOGGLE_WINDOW_CHANNEL,
  SHORTCUT_EVENT_CHANNEL,
} from "./shortcut-channels"

class ShortcutManager {
  private static instance: ShortcutManager | null = null
  private registeredShortcuts: Set<string> = new Set()
  private mainWindow: BrowserWindow | null = null

  private constructor() {
    app.on("will-quit", () => this.unregisterAll())
  }

  public static getInstance(): ShortcutManager {
    if (!ShortcutManager.instance) {
      ShortcutManager.instance = new ShortcutManager()
    }
    return ShortcutManager.instance
  }

  public init(mainWindow: BrowserWindow): void {
    this.mainWindow = mainWindow
    this.registerDefaultShortcuts()
  }

  private registerDefaultShortcuts(): void {
    // Toggle window visibility (show/hide)
    this.register("CommandOrControl+Shift+Space", () => {
      if (this.mainWindow?.isVisible()) {
        this.mainWindow.hide()
      } else {
        this.mainWindow?.show()
        this.mainWindow?.focus()
      }
      this.sendShortcutEvent(GLOBAL_SHORTCUT_TOGGLE_WINDOW_CHANNEL)
    })

    // Show application and bring to front
    this.register("CommandOrControl+Shift+A", () => {
      this.mainWindow?.show()
      this.mainWindow?.focus()
      this.sendShortcutEvent(GLOBAL_SHORTCUT_SHOW_APP_CHANNEL)
    })

    // 打开命令菜单
    this.register("CommandOrControl+K", () => {
      this.mainWindow?.show()
      this.mainWindow?.focus()
      this.sendShortcutEvent(GLOBAL_SHORTCUT_COMMAND_MENU_CHANNEL)
    })

    // 控制Runebar窗口
    this.register("Alt+Space", () => {
      const runebarManager = RunebarWindowManager.getInstance(this.mainWindow!)
      runebarManager.toggleWindow()
      this.sendShortcutEvent(GLOBAL_SHORTCUT_RUNEBAR_TOGGLE_CHANNEL)
    })
  }

  public register(accelerator: string, callback: () => void): boolean {
    try {
      if (globalShortcut.isRegistered(accelerator)) {
        console.error(`Shortcut ${accelerator} is already registered by another application`)
        return false
      }
      const success = globalShortcut.register(accelerator, callback)
      if (success) {
        this.registeredShortcuts.add(accelerator)
        console.log(`Global shortcut registered: ${accelerator}`)
        return true
      }
      console.error(`Failed to register shortcut ${accelerator}: Registration unsuccessful`)
      return false
    } catch (error) {
      console.error(`Failed to register shortcut ${accelerator}:`, error)
      return false
    }
  }

  public unregister(accelerator: string): void {
    if (this.registeredShortcuts.has(accelerator)) {
      globalShortcut.unregister(accelerator)
      this.registeredShortcuts.delete(accelerator)
      console.log(`Unregistered shortcut: ${accelerator}`)
    }
  }

  public unregisterAll(): void {
    try {
      globalShortcut.unregisterAll()
      this.registeredShortcuts.clear()
      console.log("All global shortcuts unregistered")
    } catch (error) {
      console.error("Failed to unregister shortcuts:", error)
    }
  }

  private sendShortcutEvent(type: string, data?: unknown): void {
    if (this.mainWindow) {
      this.mainWindow.webContents.send(SHORTCUT_EVENT_CHANNEL, {
        type,
        timestamp: Date.now(),
        data,
      })
    }
  }
}

export { ShortcutManager }
