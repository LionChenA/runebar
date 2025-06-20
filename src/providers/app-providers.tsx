import { initializeSettings } from "@/helpers/settings"
import { setupRendererProcessHandlers } from "@/helpers/settings/renderer"
import { useSettingsStore } from "@/store"
import { useEffect } from "react"
import type { ReactNode } from "react"
import { QueryProvider } from "./query-provider"

interface AppProvidersProps {
  children: ReactNode
}

/**
 * AppProviders - Main providers component that wraps the application
 * Initializes settings and provides all required context providers
 */
export function AppProviders({ children }: AppProvidersProps) {
  // Get initialize method from settings store
  const initialize = useSettingsStore((state) => state.initialize)

  // Initialize settings when the app starts
  useEffect(() => {
    // Initialize settings store
    initialize()

    // Initialize config registry
    initializeSettings()

    // Setup renderer process IPC handlers
    setupRendererProcessHandlers()
  }, [initialize])

  return (
    // Nest all providers here
    <QueryProvider>{children}</QueryProvider>
  )
}
