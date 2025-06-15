/**
 * Fonts Helper - Provides font-related functionality
 */
import { applyFontSettings, getAvailableFonts } from "@/helpers/settings/renderer"
import { useSettingsStore } from "@/store/settings"

/**
 * Font categories
 */
export enum FontCategory {
  SYSTEM = "system",
  MONOSPACE = "monospace",
  SANS_SERIF = "sans-serif",
  SERIF = "serif",
  CUSTOM = "custom",
}

/**
 * Font information
 */
export interface FontInfo {
  name: string
  category: FontCategory
  isBuiltin: boolean
}

/**
 * Built-in fonts
 */
export const BUILTIN_FONTS: FontInfo[] = [
  { name: "Geist", category: FontCategory.SANS_SERIF, isBuiltin: true },
  { name: "Geist Mono", category: FontCategory.MONOSPACE, isBuiltin: true },
  { name: "Tomorrow", category: FontCategory.SANS_SERIF, isBuiltin: true },
]

/**
 * System fonts
 */
export const SYSTEM_FONTS: FontInfo[] = [
  { name: "system-ui", category: FontCategory.SYSTEM, isBuiltin: false },
  { name: "Arial", category: FontCategory.SANS_SERIF, isBuiltin: false },
  { name: "Helvetica", category: FontCategory.SANS_SERIF, isBuiltin: false },
  { name: "Verdana", category: FontCategory.SANS_SERIF, isBuiltin: false },
  { name: "Courier New", category: FontCategory.MONOSPACE, isBuiltin: false },
  { name: "Courier", category: FontCategory.MONOSPACE, isBuiltin: false },
  { name: "monospace", category: FontCategory.MONOSPACE, isBuiltin: false },
  { name: "sans-serif", category: FontCategory.SANS_SERIF, isBuiltin: false },
]

/**
 * Get all available fonts
 */
export const getAllFonts = async (): Promise<FontInfo[]> => {
  try {
    // Get available fonts from the main process
    const fontNames = await getAvailableFonts()

    // Map font names to font info
    return fontNames.map((name) => {
      // Check if it's a built-in font
      const builtinFont = BUILTIN_FONTS.find((font) => font.name === name)
      if (builtinFont) {
        return builtinFont
      }

      // Check if it's a system font
      const systemFont = SYSTEM_FONTS.find((font) => font.name === name)
      if (systemFont) {
        return systemFont
      }

      // Default to custom font
      return {
        name,
        category: FontCategory.CUSTOM,
        isBuiltin: false,
      }
    })
  } catch (error) {
    console.error("Failed to get available fonts:", error)
    // Return built-in and system fonts as fallback
    return [...BUILTIN_FONTS, ...SYSTEM_FONTS]
  }
}

/**
 * Apply font family
 */
export const applyFontFamily = async (fontFamily: string): Promise<boolean> => {
  try {
    const settingsStore = useSettingsStore.getState()
    const fontSize = settingsStore.fontSize

    const result = await applyFontSettings(fontFamily, fontSize)

    if (result.success) {
      // Update the settings store
      settingsStore.setFontFamily(fontFamily)

      // Apply font to the document
      document.documentElement.style.setProperty("--font-family", fontFamily)

      return true
    }

    return false
  } catch (error) {
    console.error("Failed to apply font family:", error)
    return false
  }
}

/**
 * Apply font size
 */
export const applyFontSize = async (fontSize: number): Promise<boolean> => {
  try {
    const settingsStore = useSettingsStore.getState()
    const fontFamily = settingsStore.fontFamily

    const result = await applyFontSettings(fontFamily, fontSize)

    if (result.success) {
      // Update the settings store
      settingsStore.setFontSize(fontSize)

      // Apply font size to the document
      document.documentElement.style.setProperty("--font-size", `${fontSize}px`)

      return true
    }

    return false
  } catch (error) {
    console.error("Failed to apply font size:", error)
    return false
  }
}

/**
 * Get font by name
 */
export const getFontByName = (name: string): FontInfo | undefined => {
  // Check built-in fonts
  const builtinFont = BUILTIN_FONTS.find((font) => font.name === name)
  if (builtinFont) {
    return builtinFont
  }

  // Check system fonts
  const systemFont = SYSTEM_FONTS.find((font) => font.name === name)
  if (systemFont) {
    return systemFont
  }

  return undefined
}

/**
 * Initialize fonts
 */
export const initFonts = (): void => {
  const settingsStore = useSettingsStore.getState()
  const { fontFamily, fontSize } = settingsStore

  // Apply font settings to the document
  document.documentElement.style.setProperty("--font-family", fontFamily)
  document.documentElement.style.setProperty("--font-size", `${fontSize}px`)
}
