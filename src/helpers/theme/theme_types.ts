/**
 * 主题模式类型定义
 */
export type ThemeMode = "dark" | "light" | "system"

/**
 * 主题变化事件数据接口
 */
export interface ThemeChangeEvent {
  themeMode: ThemeMode
  isDark: boolean
}

/**
 * 主题偏好设置接口
 */
export interface ThemePreferences {
  system: ThemeMode
  local: ThemeMode | null
  isDark: boolean
}
