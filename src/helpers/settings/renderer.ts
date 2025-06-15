/**
 * Settings Renderer Helpers - 渲染进程专用的设置管理功能
 * 这个文件不导入任何包含Electron API的模块，避免模块外部化问题
 */
import { useConfigRegistry } from "@/store/config-registry"
import { useSettingsStore } from "@/store/settings"
import type { AppSettings } from "@/types/settings-types"

/**
 * 渲染进程设置数据接口（向后兼容）
 */
export interface SettingsData {
  core?: {
    theme?: "light" | "dark" | "system"
    language?: string
    autoSave?: boolean
    fontFamily?: string
    fontSize?: number
  }
  configRegistry?: Record<string, unknown>
}

/**
 * 导入结果接口
 */
export interface ImportResult {
  success: boolean
  settings?: SettingsData
  error?: string
}

/**
 * 获取所有设置（合并核心设置和配置注册表）
 */
export const getAllSettings = (): SettingsData => {
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
 * 保存所有设置到主进程
 */
export const saveAllSettings = async (): Promise<SettingsData> => {
  const settings = getAllSettings()

  // 使用window.settings API（由preload脚本暴露）
  if (window.settings) {
    await window.settings.setSettings(settings)
    return settings
  }

  throw new Error("Settings API not available")
}

/**
 * 导出设置到文件
 */
export const exportSettings = async (
  filePath?: string,
): Promise<{ success: boolean; filePath?: string; error?: string }> => {
  const settings = getAllSettings()

  if (window.settings) {
    return window.settings.exportSettings({ settings, filePath })
  }

  throw new Error("Settings API not available")
}

/**
 * 从文件导入设置
 */
export const importSettings = async (filePath?: string): Promise<ImportResult> => {
  if (!window.settings) {
    throw new Error("Settings API not available")
  }

  const result = await window.settings.importSettings(filePath)

  if (result.success && result.settings) {
    // 更新store中的设置
    const configRegistry = useConfigRegistry.getState()
    configRegistry.importConfig(result.settings.configRegistry || {})

    // 更新核心设置
    const settingsStore = useSettingsStore.getState()
    const { theme, language, autoSave, fontFamily, fontSize } = result.settings
    if (theme) settingsStore.setTheme(theme)
    if (language) settingsStore.setLanguage(language)
    if (autoSave !== undefined) settingsStore.setAutoSave(autoSave)
    if (fontFamily) settingsStore.setFontFamily(fontFamily)
    if (fontSize) settingsStore.setFontSize(fontSize)
  }

  return result
}

/**
 * 获取可用字体
 */
export const getAvailableFonts = async (): Promise<string[]> => {
  if (window.settings) {
    return window.settings.getFonts()
  }

  throw new Error("Settings API not available")
}

/**
 * 应用字体设置
 */
export const applyFontSettings = async (
  fontFamily: string,
  fontSize: number,
): Promise<{ success: boolean; error?: string }> => {
  if (window.settings) {
    return window.settings.applyFont(fontFamily, fontSize)
  }

  throw new Error("Settings API not available")
}

/**
 * 设置渲染进程IPC处理器
 */
export const setupRendererProcessHandlers = () => {
  // 监听来自主进程的设置变更事件
  if (window.settings) {
    window.settings.onSettingsChanged((updatedSettings: SettingsData) => {
      // 更新store中的设置
      const configRegistry = useConfigRegistry.getState()
      configRegistry.importConfig(updatedSettings.configRegistry || {})

      // 更新核心设置
      const settingsStore = useSettingsStore.getState()
      const { theme, language, autoSave, fontFamily, fontSize } = updatedSettings
      if (theme) settingsStore.setTheme(theme)
      if (language) settingsStore.setLanguage(language)
      if (autoSave !== undefined) settingsStore.setAutoSave(autoSave)
      if (fontFamily) settingsStore.setFontFamily(fontFamily)
      if (fontSize) settingsStore.setFontSize(fontSize)
    })
  }
}
