/**
 * Channel names for global shortcut events in the main process
 * These channels are used for IPC communication between main and renderer processes
 */
export const GLOBAL_SHORTCUT_TOGGLE_WINDOW_CHANNEL = "global-shortcut:toggle-window"
export const GLOBAL_SHORTCUT_SHOW_APP_CHANNEL = "global-shortcut:show-app"

/**
 * Main channel for all shortcut events sent from main to renderer process
 */
export const SHORTCUT_EVENT_CHANNEL = "shortcut:event"
