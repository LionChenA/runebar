import { DARK_CLASS_NAME, THEME_STORAGE_KEY } from "./theme/theme_constants"
import type { ThemeChangeEvent, ThemeMode, ThemePreferences } from "./theme/theme_types"

export async function getCurrentTheme(): Promise<ThemeMode> {
  const themePrefs = await window.themeMode.current()
  return themePrefs.local || themePrefs.system
}

export async function setTheme(newTheme: ThemeMode) {
  switch (newTheme) {
    case "dark":
      await window.themeMode.dark()
      break
    case "light":
      await window.themeMode.light()
      break
    case "system":
      await window.themeMode.system()
      break
  }

  localStorage.setItem(THEME_STORAGE_KEY, newTheme)
}

export async function toggleTheme() {
  const isDarkMode = await window.themeMode.toggle()
  const newTheme = isDarkMode ? "dark" : "light"

  localStorage.setItem(THEME_STORAGE_KEY, newTheme)
}

export async function syncThemeWithLocal() {
  const preferences = await window.themeMode.current()
  const localTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null

  if (localTheme) {
    await setTheme(localTheme)
  } else {
    // 如果本地没有存储主题，则使用系统主题
    await setTheme("system")
    // 更新DOM以反映当前主题
    updateDocumentTheme(preferences.isDark)
  }
}

/**
 * 订阅主题变化事件
 * @param callback 主题变化时的回调函数
 * @returns 取消订阅的函数
 */
export function subscribeToThemeChanges(callback: (event: ThemeChangeEvent) => void) {
  // 使用IPC渲染器注册主题变化事件
  return window.themeMode.onThemeChange((themeState) => {
    // 转换ThemeState为ThemeChangeEvent
    const event: ThemeChangeEvent = {
      themeMode: themeState.currentMode,
      isDark: themeState.isDarkMode,
    }

    // 更新DOM
    updateDocumentTheme(event.isDark)
    // 调用回调
    callback(event)
  })
}

/**
 * 更新文档的主题类
 * @param isDarkMode 是否是暗色模式
 */
export function updateDocumentTheme(isDarkMode: boolean) {
  const root = document.documentElement

  // 确保清除现有主题类
  root.classList.remove("light", DARK_CLASS_NAME)

  // 添加新的主题类
  if (isDarkMode) {
    root.classList.add(DARK_CLASS_NAME)
  } else {
    root.classList.add("light")
  }

  // 为body元素添加bg-background类以确保背景颜色跟随主题
  document.body.classList.add("bg-background")
}
