import { SHORTCUT_EVENT_CHANNEL } from "./shortcut-channels"

/**
 * Represents a shortcut event sent from the main process to the renderer
 */
export type ShortcutEvent = {
  type: string
  timestamp: number
  data?: unknown
}

/**
 * Type for shortcut event listener functions in the renderer process
 */
export type ShortcutEventListener = (event: ShortcutEvent) => void

/**
 * Exposes the shortcut context bridge to the renderer process
 * This allows the renderer to listen for global shortcut events fired in the main process
 */
export function exposeShortcutContext() {
  const { contextBridge, ipcRenderer } = window.require("electron")

  // Store listeners for proper cleanup
  const listeners: Map<
    ShortcutEventListener,
    (event: Electron.IpcRendererEvent, data: ShortcutEvent) => void
  > = new Map()

  contextBridge.exposeInMainWorld("electronShortcut", {
    /**
     * Add a listener for shortcut events from the main process
     * Returns a function that can be called to remove the listener
     */
    onShortcut: (listener: ShortcutEventListener) => {
      // Create a wrapped listener that can be removed later
      const wrappedListener = (_event: Electron.IpcRendererEvent, data: ShortcutEvent) => {
        listener(data)
      }

      // Store the mapping between the original and wrapped listener
      listeners.set(listener, wrappedListener)

      // Add the listener to the IPC channel
      ipcRenderer.on(SHORTCUT_EVENT_CHANNEL, wrappedListener)

      // Return a cleanup function
      return () => {
        if (listeners.has(listener)) {
          const wrapped = listeners.get(listener)
          if (wrapped) {
            ipcRenderer.removeListener(SHORTCUT_EVENT_CHANNEL, wrapped)
            listeners.delete(listener)
          }
        }
      }
    },
  })
}

/**
 * Type definition for the shortcut API exposed to the renderer process
 * Used for type checking when accessing the API from the renderer
 */
export interface ShortcutContext {
  onShortcut: (listener: ShortcutEventListener) => () => void
}
