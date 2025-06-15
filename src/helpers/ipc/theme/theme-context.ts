import type { ThemeState } from "@/types/theme-types"
import { contextBridge, ipcRenderer } from "electron"
import {
  THEME_MODE_CHANGED_CHANNEL,
  THEME_MODE_CURRENT_CHANNEL,
  THEME_MODE_DARK_CHANNEL,
  THEME_MODE_LIGHT_CHANNEL,
  THEME_MODE_SYSTEM_CHANNEL,
  THEME_MODE_TOGGLE_CHANNEL,
} from "./theme-channels"

export function exposeThemeContext() {
  contextBridge.exposeInMainWorld("themeMode", {
    current: () => ipcRenderer.invoke(THEME_MODE_CURRENT_CHANNEL),
    toggle: () => ipcRenderer.invoke(THEME_MODE_TOGGLE_CHANNEL),
    dark: () => ipcRenderer.invoke(THEME_MODE_DARK_CHANNEL),
    light: () => ipcRenderer.invoke(THEME_MODE_LIGHT_CHANNEL),
    system: () => ipcRenderer.invoke(THEME_MODE_SYSTEM_CHANNEL),
    onThemeChange: (callback: (event: ThemeState) => void) => {
      ipcRenderer.removeAllListeners(THEME_MODE_CHANGED_CHANNEL)
      ipcRenderer.on(
        THEME_MODE_CHANGED_CHANNEL,
        (_event: Electron.IpcRendererEvent, themeEvent: ThemeState) => {
          callback(themeEvent)
        },
      )
      return () => {
        ipcRenderer.removeAllListeners(THEME_MODE_CHANGED_CHANNEL)
      }
    },
  })
}
