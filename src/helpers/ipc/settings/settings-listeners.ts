import fs from "node:fs/promises"
import path from "node:path"
import type { ImportResult, SettingsData } from "@/helpers/settings/renderer"
/**
 * Settings Listeners - Handles settings-related IPC events in the main process
 */
import { app, dialog, ipcMain } from "electron"
import {
  SETTINGS_EXPORT_CHANNEL,
  SETTINGS_FONT_APPLY_CHANNEL,
  SETTINGS_FONT_LIST_CHANNEL,
  SETTINGS_GET_CHANNEL,
  SETTINGS_IMPORT_CHANNEL,
  SETTINGS_SET_CHANNEL,
} from "./settings-channels"

// Settings file path
const getSettingsFilePath = () => path.join(app.getPath("userData"), "settings.json")

// Available fonts in the application
const AVAILABLE_FONTS = [
  "system-ui",
  "Geist",
  "Geist Mono",
  "Tomorrow",
  "Arial",
  "Helvetica",
  "Verdana",
  "Courier New",
  "Courier",
  "monospace",
  "sans-serif",
]

/**
 * Initialize settings in the main process
 */
let cachedSettings: SettingsData | null = null

/**
 * Load settings from disk
 */
async function loadSettings(): Promise<SettingsData> {
  if (cachedSettings) return cachedSettings

  try {
    const filePath = getSettingsFilePath()
    const data = await fs.readFile(filePath, "utf-8")
    cachedSettings = JSON.parse(data) as SettingsData
    return cachedSettings
  } catch (_error) {
    // Return default settings if file doesn't exist or is invalid
    const defaultSettings: SettingsData = {
      core: {
        theme: "system",
        language: "en",
        autoSave: true,
        fontFamily: "system-ui",
        fontSize: 14,
      },
      configRegistry: {},
    }
    return defaultSettings
  }
}

/**
 * Save settings to disk
 */
async function saveSettings(settings: SettingsData): Promise<void> {
  try {
    const filePath = getSettingsFilePath()
    await fs.writeFile(filePath, JSON.stringify(settings, null, 2), "utf-8")
    cachedSettings = settings
  } catch (error) {
    console.error("Failed to save settings:", error)
    throw new Error("Failed to save settings")
  }
}

/**
 * Add settings event listeners to the main process
 */
export function addSettingsEventListeners() {
  // Get all settings
  ipcMain.handle(SETTINGS_GET_CHANNEL, async () => {
    return await loadSettings()
  })

  // Set settings
  ipcMain.handle(SETTINGS_SET_CHANNEL, async (_event, settings: SettingsData) => {
    await saveSettings(settings)
    return settings
  })

  // Export settings to a file
  ipcMain.handle(
    SETTINGS_EXPORT_CHANNEL,
    async (
      _event,
      { settings, filePath: requestedPath }: { settings: SettingsData; filePath?: string },
    ) => {
      try {
        // If no filePath provided, show save dialog
        let exportPath = requestedPath
        if (!exportPath) {
          const { canceled, filePath: selectedPath } = await dialog.showSaveDialog({
            title: "Export Settings",
            defaultPath: path.join(app.getPath("downloads"), "runebar-settings.json"),
            filters: [{ name: "JSON", extensions: ["json"] }],
          })

          if (canceled || !selectedPath) {
            return { success: false, error: "Export cancelled" }
          }

          exportPath = selectedPath
        }

        await fs.writeFile(exportPath, JSON.stringify(settings, null, 2), "utf-8")
        return { success: true, filePath: exportPath }
      } catch (error) {
        console.error("Failed to export settings:", error)
        return { success: false, error: "Failed to export settings" }
      }
    },
  )

  // Import settings from a file
  ipcMain.handle(SETTINGS_IMPORT_CHANNEL, async (_event, requestedPath?: string) => {
    try {
      // If no filePath provided, show open dialog
      let importPath = requestedPath
      if (!importPath) {
        const { canceled, filePaths } = await dialog.showOpenDialog({
          title: "Import Settings",
          filters: [{ name: "JSON", extensions: ["json"] }],
          properties: ["openFile"],
        })

        if (canceled || filePaths.length === 0) {
          return { success: false, error: "Import cancelled" } as ImportResult
        }

        importPath = filePaths[0]
      }

      const data = await fs.readFile(importPath, "utf-8")
      const settings = JSON.parse(data) as SettingsData

      // Validate settings structure
      if (!settings || typeof settings !== "object") {
        return { success: false, error: "Invalid settings format" } as ImportResult
      }

      // Save the imported settings
      await saveSettings(settings)

      return { success: true, settings } as ImportResult
    } catch (error) {
      console.error("Failed to import settings:", error)
      return { success: false, error: "Failed to import settings" } as ImportResult
    }
  })

  // Get available fonts
  ipcMain.handle(SETTINGS_FONT_LIST_CHANNEL, () => {
    return AVAILABLE_FONTS
  })

  // Apply font settings
  ipcMain.handle(
    SETTINGS_FONT_APPLY_CHANNEL,
    async (_event, { fontFamily, fontSize }: { fontFamily: string; fontSize: number }) => {
      try {
        // Validate font
        if (!AVAILABLE_FONTS.includes(fontFamily)) {
          return { success: false, error: "Invalid font family" }
        }

        // Validate font size
        if (fontSize < 8 || fontSize > 32) {
          return { success: false, error: "Invalid font size" }
        }

        // Update settings
        const settings = await loadSettings()
        if (!settings.core) settings.core = {}

        settings.core.fontFamily = fontFamily
        settings.core.fontSize = fontSize

        await saveSettings(settings)

        return { success: true }
      } catch (error) {
        console.error("Failed to apply font settings:", error)
        return { success: false, error: "Failed to apply font settings" }
      }
    },
  )
}
