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
  fontFamily: string
  fontSize: number

  // Sidebar state
  sidebarWidth: number
  sidebarCollapsed: boolean

  // Theme related methods
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void

  // Language related methods
  setLanguage: (language: string) => void

  // Font related methods
  setFontFamily: (fontFamily: string) => void
  setFontSize: (fontSize: number) => void

  // Sidebar related methods
  setSidebarWidth: (width: number) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void

  // Other settings
  setAutoSave: (autoSave: boolean) => void
  toggleAutoSave: () => void

  // Initialization
  initialize: () => void
}

/**
 * Available font families
 */
export const FONT_FAMILIES = [
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

// Sidebar width configuration
export const SIDEBAR_WIDTHS = {
  ICON_MODE: 70, // icon模式宽度
  FULL_MIN: 180, // 完整模式最小宽度
  FULL_DEFAULT: 180, // 默认宽度
  FULL_MAX: 220, // 最大宽度
  SWITCH_THRESHOLD: 120, // 模式切换阈值
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
      fontFamily: "system-ui",
      fontSize: 14,

      // Sidebar state
      sidebarWidth: SIDEBAR_WIDTHS.FULL_DEFAULT,
      sidebarCollapsed: false,

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

      // Font related methods
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),

      // Sidebar related methods
      setSidebarWidth: (width) => {
        const collapsed = width < SIDEBAR_WIDTHS.SWITCH_THRESHOLD
        set({ sidebarWidth: width, sidebarCollapsed: collapsed })
      },
      setSidebarCollapsed: (collapsed) => {
        const width = collapsed ? SIDEBAR_WIDTHS.ICON_MODE : SIDEBAR_WIDTHS.FULL_DEFAULT
        set({ sidebarCollapsed: collapsed, sidebarWidth: width })
      },
      toggleSidebar: () => {
        const { sidebarCollapsed } = get()
        const newCollapsed = !sidebarCollapsed
        const width = newCollapsed ? SIDEBAR_WIDTHS.ICON_MODE : SIDEBAR_WIDTHS.FULL_DEFAULT
        set({ sidebarCollapsed: newCollapsed, sidebarWidth: width })
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
