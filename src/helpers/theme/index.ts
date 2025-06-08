export * from "./theme_constants"
export * from "./theme_types"
// 不能导出 theme_manager.ts 给渲染进程使用，因为渲染进程不能直接访问主进程的模块
// export * from "./theme_manager"

export type ThemeMode = "light" | "dark" | "system"

/**
 * Set the theme mode for the application
 * This function updates both the HTML attribute and the localStorage value
 */
export function setThemeMode(mode: ThemeMode): void {
  // Update localStorage
  localStorage.setItem("theme", mode)

  // Apply theme to HTML element
  const root = window.document.documentElement

  if (mode === "system") {
    const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    root.classList.remove("light", "dark")
    root.classList.add(systemMode)
  } else {
    root.classList.remove("light", "dark")
    root.classList.add(mode)
  }
}

/**
 * Get the current theme mode
 */
export function getThemeMode(): ThemeMode {
  return (localStorage.getItem("theme") as ThemeMode) || "system"
}

/**
 * Initialize theme
 * This should be called when the application starts
 */
export function initializeTheme(): void {
  const storedTheme = getThemeMode()
  setThemeMode(storedTheme)

  // Add listener for system theme changes
  if (storedTheme === "system") {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? "dark" : "light"
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(newMode)
    }

    mediaQuery.addEventListener("change", handleChange)
  }
}
