import { globalShortcut, ipcMain } from "electron"
import {
  GLOBAL_SHORTCUT_SHOW_APP_CHANNEL,
  GLOBAL_SHORTCUT_TOGGLE_WINDOW_CHANNEL,
  SHORTCUT_EVENT_CHANNEL,
} from "./shortcut-channels"

// Registered shortcuts reference for cleanup
const registeredShortcuts: string[] = []

/**
 * Register a global shortcut
 * @param accelerator Keyboard shortcut to register
 * @param callback Function to call when shortcut is triggered
 * @returns boolean Whether registration was successful
 */
function registerShortcut(accelerator: string, callback: () => void): boolean {
  try {
    // Check if shortcut is already registered in the system
    if (globalShortcut.isRegistered(accelerator)) {
      console.error(`Shortcut ${accelerator} is already registered by another application`)
      return false
    }

    const success = globalShortcut.register(accelerator, callback)
    if (success) {
      registeredShortcuts.push(accelerator)
      console.log(`Global shortcut registered: ${accelerator}`)
      return true
    }

    console.error(`Failed to register shortcut ${accelerator}: Registration unsuccessful`)
    return false
  } catch (error) {
    console.error(`Failed to register shortcut ${accelerator}:`, error)
    return false
  }
}

// Export registerShortcut if needed elsewhere
export { registerShortcut }

// Listen for IPC events to register or unregister shortcuts dynamically
// This could be expanded for future user-defined shortcuts
ipcMain.handle(GLOBAL_SHORTCUT_TOGGLE_WINDOW_CHANNEL, () => {
  return registeredShortcuts
})
