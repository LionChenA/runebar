/**
 * Settings types - Define types for configuration management
 */

/**
 * Configuration item type
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

/**
 * Configuration domains - Used to categorize configuration items
 */
export enum ConfigDomain {
  GENERAL = "general",
  MODELS = "models",
  PROMPTS = "prompts",
  TOOLS = "tools",
}

/**
 * Select option interface
 */
export interface SelectOption {
  value: string
  label: string
}

/**
 * Configuration item interface
 */
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
  domain: ConfigDomain
  tags?: string[] // For filtering and searching
}

/**
 * Configuration category interface
 */
export interface ConfigCategory {
  id: string
  label: string
  description?: string
  icon?: string
  order?: number
  domain: ConfigDomain
}

/**
 * Registration interface for type safety
 */
export interface ConfigRegistration<T = unknown> {
  domain: ConfigDomain
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
  tags?: string[]
}

/**
 * General domain configuration items
 */
export interface GeneralConfigItems {
  appearance: {
    theme: string
    fontFamily: string
    fontSize: number
    accentColor: string
  }
  language: {
    locale: string
    dateFormat: string
    timeFormat: string
  }
  behavior: {
    autoSave: boolean
    confirmExit: boolean
    startMinimized: boolean
  }
}

/**
 * Models domain configuration items
 */
export interface ModelsConfigItems {
  defaults: {
    model: string
    temperature: number
    maxTokens: number
  }
  providers: Record<
    string,
    {
      apiKey: string
      baseUrl: string
      enabled: boolean
    }
  >
}

/**
 * Prompts domain configuration items
 */
export interface PromptsConfigItems {
  defaults: {
    template: string
    variables: Record<string, string>
  }
  templates: Record<
    string,
    {
      name: string
      content: string
      description: string
      tags: string[]
    }
  >
}

/**
 * Tools domain configuration items
 */
export interface ToolsConfigItems {
  defaults: {
    tool: string
    parameters: Record<string, unknown>
  }
  integrations: Record<
    string,
    {
      enabled: boolean
      apiKey: string
      settings: Record<string, unknown>
    }
  >
}
