/**
 * Settings types - Define types for configuration management
 */

export type ConfigItemType =
  | "string"
  | "number"
  | "boolean"
  | "select"
  | "multiselect"
  | "color"
  | "object"
  | "array"
  | "slider"

export interface SelectOption {
  value: string
  label: string
}

export interface ConfigItem {
  id: string
  type: ConfigItemType
  label: string
  description?: string
  defaultValue: unknown
  value: unknown
  options?: SelectOption[]
  validation?: unknown // Zod schema or validation function
  disabled?: boolean
  hidden?: boolean
  order?: number
}

export interface ConfigCategory {
  id: string
  label: string
  description?: string
  icon?: string
  order?: number
}

// Registration interface for type safety
export interface ConfigRegistration<T = unknown> {
  categoryId: string
  itemId: string
  type: ConfigItemType
  label: string
  description?: string
  defaultValue: T
  options?: SelectOption[]
  validation?: unknown
  disabled?: boolean
  hidden?: boolean
  order?: number
}
