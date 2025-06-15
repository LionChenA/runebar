import { applyFontFamily, applyFontSize } from "@/helpers/fonts"
import type { ThemeMode } from "@/helpers/theme"
import { useConfigRegistry } from "@/store/config-registry"
import { useSettingsStore } from "@/store/settings"
import { FONT_FAMILIES } from "@/store/settings"
/**
 * General Settings Helpers - Functions for managing general application settings
 */
import { ConfigDomain } from "@/types/settings"
import type { ConfigItem } from "@/types/settings"

// Category IDs
const APPEARANCE_CATEGORY = "appearance"
const LANGUAGE_CATEGORY = "language"
const BEHAVIOR_CATEGORY = "behavior"

/**
 * Initialize general settings
 */
export const initializeGeneralSettings = (): void => {
  const registry = useConfigRegistry.getState()
  const settings = useSettingsStore.getState()

  // Register categories
  registry.registerCategory(APPEARANCE_CATEGORY, {
    id: APPEARANCE_CATEGORY,
    label: "Appearance",
    description: "Customize the look and feel of the application",
    icon: "palette",
    order: 1,
    domain: ConfigDomain.GENERAL,
  })

  registry.registerCategory(LANGUAGE_CATEGORY, {
    id: LANGUAGE_CATEGORY,
    label: "Language",
    description: "Configure language and localization settings",
    icon: "globe",
    order: 2,
    domain: ConfigDomain.GENERAL,
  })

  registry.registerCategory(BEHAVIOR_CATEGORY, {
    id: BEHAVIOR_CATEGORY,
    label: "Behavior",
    description: "Configure application behavior",
    icon: "settings",
    order: 3,
    domain: ConfigDomain.GENERAL,
  })

  // Register appearance settings
  registry.registerItem(ConfigDomain.GENERAL, APPEARANCE_CATEGORY, "theme", {
    id: "theme",
    type: "select",
    label: "Theme",
    description: "Select the application theme",
    defaultValue: settings.theme,
    value: settings.theme,
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "system", label: "System" },
    ],
    domain: ConfigDomain.GENERAL,
    order: 1,
  })

  registry.registerItem(ConfigDomain.GENERAL, APPEARANCE_CATEGORY, "fontFamily", {
    id: "fontFamily",
    type: "select",
    label: "Font Family",
    description: "Select the application font family",
    defaultValue: settings.fontFamily,
    value: settings.fontFamily,
    options: FONT_FAMILIES.map((font) => ({ value: font, label: font })),
    domain: ConfigDomain.GENERAL,
    order: 2,
  })

  registry.registerItem(ConfigDomain.GENERAL, APPEARANCE_CATEGORY, "fontSize", {
    id: "fontSize",
    type: "slider",
    label: "Font Size",
    description: "Adjust the application font size",
    defaultValue: settings.fontSize,
    value: settings.fontSize,
    domain: ConfigDomain.GENERAL,
    order: 3,
  })

  // Register language settings
  registry.registerItem(ConfigDomain.GENERAL, LANGUAGE_CATEGORY, "language", {
    id: "language",
    type: "select",
    label: "Language",
    description: "Select the application language",
    defaultValue: settings.language,
    value: settings.language,
    options: [
      { value: "en", label: "English" },
      { value: "zh", label: "中文" },
      { value: "pt-BR", label: "Português (Brasil)" },
    ],
    domain: ConfigDomain.GENERAL,
    order: 1,
  })

  // Register behavior settings
  registry.registerItem(ConfigDomain.GENERAL, BEHAVIOR_CATEGORY, "autoSave", {
    id: "autoSave",
    type: "boolean",
    label: "Auto Save",
    description: "Automatically save changes",
    defaultValue: settings.autoSave,
    value: settings.autoSave,
    domain: ConfigDomain.GENERAL,
    order: 1,
  })
}

/**
 * Get all general settings
 */
export const getGeneralSettings = () => {
  const registry = useConfigRegistry.getState()
  return registry.getAllItems(ConfigDomain.GENERAL) as Record<string, Record<string, ConfigItem>>
}

/**
 * Update theme setting
 */
export const updateTheme = (theme: ThemeMode): void => {
  const settingsStore = useSettingsStore.getState()
  const registry = useConfigRegistry.getState()

  // Update the settings store
  settingsStore.setTheme(theme)

  // Update the config registry
  registry.updateItemValue(ConfigDomain.GENERAL, APPEARANCE_CATEGORY, "theme", theme)
}

/**
 * Update font family setting
 */
export const updateFontFamily = async (fontFamily: string): Promise<boolean> => {
  const registry = useConfigRegistry.getState()

  // Apply the font
  const success = await applyFontFamily(fontFamily)

  if (success) {
    // Update the config registry
    registry.updateItemValue(ConfigDomain.GENERAL, APPEARANCE_CATEGORY, "fontFamily", fontFamily)
  }

  return success
}

/**
 * Update font size setting
 */
export const updateFontSize = async (fontSize: number): Promise<boolean> => {
  const registry = useConfigRegistry.getState()

  // Apply the font size
  const success = await applyFontSize(fontSize)

  if (success) {
    // Update the config registry
    registry.updateItemValue(ConfigDomain.GENERAL, APPEARANCE_CATEGORY, "fontSize", fontSize)
  }

  return success
}

/**
 * Update language setting
 */
export const updateLanguage = (language: string): void => {
  const settingsStore = useSettingsStore.getState()
  const registry = useConfigRegistry.getState()

  // Update the settings store
  settingsStore.setLanguage(language)

  // Update the config registry
  registry.updateItemValue(ConfigDomain.GENERAL, LANGUAGE_CATEGORY, "language", language)
}

/**
 * Update auto save setting
 */
export const updateAutoSave = (autoSave: boolean): void => {
  const settingsStore = useSettingsStore.getState()
  const registry = useConfigRegistry.getState()

  // Update the settings store
  settingsStore.setAutoSave(autoSave)

  // Update the config registry
  registry.updateItemValue(ConfigDomain.GENERAL, BEHAVIOR_CATEGORY, "autoSave", autoSave)
}
