import { ThemeManager } from "@/helpers/theme/theme_manager"
import { ipcMain } from "electron"
import {
  THEME_MODE_CURRENT_CHANNEL,
  THEME_MODE_DARK_CHANNEL,
  THEME_MODE_LIGHT_CHANNEL,
  THEME_MODE_SYSTEM_CHANNEL,
  THEME_MODE_TOGGLE_CHANNEL,
} from "./theme-channels"

export function addThemeEventListeners() {
  const themeManager = ThemeManager.getInstance()

  ipcMain.handle(THEME_MODE_CURRENT_CHANNEL, () => {
    return themeManager.getThemePreferences()
  })

  ipcMain.handle(THEME_MODE_TOGGLE_CHANNEL, () => {
    return themeManager.toggleTheme()
  })

  ipcMain.handle(THEME_MODE_DARK_CHANNEL, () => {
    return themeManager.setTheme("dark")
  })

  ipcMain.handle(THEME_MODE_LIGHT_CHANNEL, () => {
    return themeManager.setTheme("light")
  })

  ipcMain.handle(THEME_MODE_SYSTEM_CHANNEL, () => {
    return themeManager.setTheme("system")
  })
}
