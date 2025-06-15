/**
 * Settings IPC - Entry point for settings IPC functionality (Main Process Only)
 * 这个文件只用于主进程和preload脚本，不应该被渲染进程导入
 */
import { exposeSettingsContext } from "./settings-context"
import { addSettingsEventListeners } from "./settings-listeners"
export * from "./settings-channels"
export type { ImportResult, SettingsData } from "@/helpers/settings/renderer"

/**
 * Initialize settings IPC handlers (Main Process Only)
 */
export const initSettingsIPC = () => {
  // 只在主进程中设置IPC监听器
  addSettingsEventListeners()
}

/**
 * Expose settings context (Preload Script Only)
 */
export const exposeSettings = () => {
  exposeSettingsContext()
}
