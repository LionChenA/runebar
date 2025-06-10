import type { ThemeMode } from "@/helpers/theme"
/**
 * Settings IPC - Handles settings synchronization between renderer and main processes
 */
import { useConfigRegistry } from "@/store/config-registry"
import { useSettingsStore } from "@/store/settings"

/**
 * IPC Channels for settings
 */
export enum SettingsChannels {
  GET_SETTINGS = "get-settings",
  SET_SETTINGS = "set-settings",
  EXPORT_SETTINGS = "export-settings",
  IMPORT_SETTINGS = "import-settings",
  SETTINGS_CHANGED = "settings-changed",
}

// Define the settings shape for type safety
interface SettingsData {
  core?: {
    theme?: ThemeMode
    language?: string
    autoSave?: boolean
    fontFamily?: string
    fontSize?: number
  }
  configRegistry?: Record<string, unknown>
}

interface ImportResult {
  success: boolean
  settings?: SettingsData
  error?: string
}

/**
 * Initialize settings IPC handlers
 */
export const initSettingsIPC = () => {
  // Setup IPC handlers for the main process
  if (typeof window === "undefined") {
    setupMainProcessHandlers()
  } else {
    // Setup IPC handlers for the renderer process
    setupRendererProcessHandlers()
  }
}

/**
 * Setup main process IPC handlers
 */
const setupMainProcessHandlers = () => {
  // For Electron main process
  // This will be filled in when implementing the main process side
}

/**
 * Setup renderer process IPC handlers
 */
const setupRendererProcessHandlers = () => {
  // For Electron renderer process
  // @ts-expect-error - electron is injected by preload script
  const { ipcRenderer } = window.electron

  // Listen for settings changed events from main process
  ipcRenderer.on(SettingsChannels.SETTINGS_CHANGED, (_event: unknown, settings: SettingsData) => {
    // Update the settings in the store
    const configRegistry = useConfigRegistry.getState()
    configRegistry.importConfig(settings.configRegistry || {})

    // Update core settings
    const settingsStore = useSettingsStore.getState()
    if (settings.core) {
      const { theme, language, autoSave, fontFamily, fontSize } = settings.core
      if (theme) settingsStore.setTheme(theme)
      if (language) settingsStore.setLanguage(language)
      if (autoSave !== undefined) settingsStore.setAutoSave(autoSave)
      if (fontFamily) settingsStore.setFontFamily(fontFamily)
      if (fontSize) settingsStore.setFontSize(fontSize)
    }
  })
}

/**
 * Get all settings (combines core settings and config registry)
 */
export const getAllSettings = () => {
  const settingsStore = useSettingsStore.getState()
  const configRegistry = useConfigRegistry.getState()

  return {
    core: {
      theme: settingsStore.theme,
      language: settingsStore.language,
      autoSave: settingsStore.autoSave,
      fontFamily: settingsStore.fontFamily,
      fontSize: settingsStore.fontSize,
    },
    configRegistry: configRegistry.exportConfig(),
  }
}

/**
 * Save all settings to main process
 */
export const saveAllSettings = async () => {
  const settings = getAllSettings()
  // @ts-expect-error - electron is injected by preload script
  const { ipcRenderer } = window.electron

  return ipcRenderer.invoke(SettingsChannels.SET_SETTINGS, settings)
}

/**
 * Export settings to a file
 */
export const exportSettings = async (filePath?: string) => {
  // @ts-expect-error - electron is injected by preload script
  const { ipcRenderer } = window.electron
  const settings = getAllSettings()

  return ipcRenderer.invoke(SettingsChannels.EXPORT_SETTINGS, { settings, filePath })
}

/**
 * Import settings from a file
 */
export const importSettings = async (filePath?: string): Promise<ImportResult> => {
  // @ts-expect-error - electron is injected by preload script
  const { ipcRenderer } = window.electron

  const result = (await ipcRenderer.invoke(
    SettingsChannels.IMPORT_SETTINGS,
    filePath,
  )) as ImportResult

  if (result.success && result.settings) {
    // Update the settings in the stores
    const configRegistry = useConfigRegistry.getState()
    configRegistry.importConfig(result.settings.configRegistry || {})

    // Update core settings
    const settingsStore = useSettingsStore.getState()
    if (result.settings.core) {
      const { theme, language, autoSave, fontFamily, fontSize } = result.settings.core
      if (theme) settingsStore.setTheme(theme)
      if (language) settingsStore.setLanguage(language)
      if (autoSave !== undefined) settingsStore.setAutoSave(autoSave)
      if (fontFamily) settingsStore.setFontFamily(fontFamily)
      if (fontSize) settingsStore.setFontSize(fontSize)
    }
  }

  return result
}
