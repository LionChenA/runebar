import type { AppSettings, SettingsExport } from "@/types/settings-types"
/**
 * Settings Context - Exposes settings-related APIs to the renderer process
 */
import { contextBridge, ipcRenderer } from "electron"
import {
  SETTINGS_CHANGED_CHANNEL,
  SETTINGS_EXPORT_CHANNEL,
  SETTINGS_FONT_APPLY_CHANNEL,
  SETTINGS_FONT_LIST_CHANNEL,
  SETTINGS_GET_CHANNEL,
  SETTINGS_IMPORT_CHANNEL,
  SETTINGS_SET_CHANNEL,
} from "./settings-channels"

// Legacy type alias for backward compatibility
export type SettingsData = AppSettings

// Import result interface
export interface ImportResult {
  success: boolean
  settings?: AppSettings
  error?: string
}

/**
 * Exposes settings API to the renderer process
 */
export function exposeSettingsContext() {
  contextBridge.exposeInMainWorld("settings", {
    // Get all settings
    getSettings: () => ipcRenderer.invoke(SETTINGS_GET_CHANNEL),

    // Set settings
    setSettings: (settings: SettingsData) => ipcRenderer.invoke(SETTINGS_SET_CHANNEL, settings),

    // Export settings to a file
    exportSettings: (options: { settings: SettingsData; filePath?: string }) =>
      ipcRenderer.invoke(SETTINGS_EXPORT_CHANNEL, options),

    // Import settings from a file
    importSettings: (filePath?: string) => ipcRenderer.invoke(SETTINGS_IMPORT_CHANNEL, filePath),

    // Get available fonts
    getFonts: () => ipcRenderer.invoke(SETTINGS_FONT_LIST_CHANNEL),

    // Apply font settings
    applyFont: (fontFamily: string, fontSize: number) =>
      ipcRenderer.invoke(SETTINGS_FONT_APPLY_CHANNEL, { fontFamily, fontSize }),

    // Listen for settings changes
    onSettingsChanged: (callback: (settings: SettingsData) => void) => {
      ipcRenderer.removeAllListeners(SETTINGS_CHANGED_CHANNEL)
      ipcRenderer.on(
        SETTINGS_CHANGED_CHANNEL,
        (_event: Electron.IpcRendererEvent, settings: SettingsData) => {
          callback(settings)
        },
      )
      return () => {
        ipcRenderer.removeAllListeners(SETTINGS_CHANGED_CHANNEL)
      }
    },
  })
}
