/**
 * Settings Helpers - Entry point for settings management
 */
import { initializeGeneralSettings } from "./general"

/**
 * Initialize all settings
 * This should be called when the application starts
 */
export const initializeSettings = (): void => {
  // Initialize domain-specific settings
  initializeGeneralSettings()

  // Add other domains as they are implemented
  // initializeModelsSettings()
  // initializePromptsSettings()
  // initializeToolsSettings()
}

// Export all settings helpers
export * from "./general"
