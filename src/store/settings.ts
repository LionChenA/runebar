import { getLanguage, setLanguage as setAppLanguage } from "@/helpers/localization"
import { type ThemeMode, getThemeMode, setThemeMode } from "@/helpers/theme"
import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * Settings state - Manages user settings like theme, language, etc.
 */
type SettingsState = {
  // Core state
  theme: ThemeMode
  language: string
  autoSave: boolean

  // Theme related methods
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void

  // Language related methods
  setLanguage: (language: string) => void

  // Other settings
  setAutoSave: (autoSave: boolean) => void
  toggleAutoSave: () => void

  // Initialization
  initialize: () => void
}

/**
 * Settings store - Manages user settings
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: getThemeMode(),
      language: getLanguage(),
      autoSave: true,

      // Theme related methods
      setTheme: (theme) => {
        set({ theme })
        setThemeMode(theme)
      },
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === "dark" ? "light" : "dark"
        set({ theme: newTheme })
        setThemeMode(newTheme)
      },

      // Language related methods
      setLanguage: (language) => {
        set({ language })
        setAppLanguage(language)
      },

      // Other settings
      setAutoSave: (autoSave) => set({ autoSave }),
      toggleAutoSave: () => set((state) => ({ autoSave: !state.autoSave })),

      // Initialization
      initialize: () => {
        const { theme, language } = get()
        setThemeMode(theme)
        setAppLanguage(language)
      },
    }),
    {
      name: "runebar-settings",
    },
  ),
)
