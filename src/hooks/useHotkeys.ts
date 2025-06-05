import { useEffect, useRef } from "react"
import type { ShortcutEvent } from "../helpers/ipc/shortcut/shortcut-context"

// Window augmentation for TypeScript
declare global {
  interface Window {
    electronShortcut?: {
      onShortcut: (handler: (event: ShortcutEvent) => void) => () => void
    }
    __hotkeyDebug?: {
      lastKeyEvent?: KeyboardEvent
      registeredShortcuts: string[]
      onKeyEvent?: (
        event: KeyboardEvent,
        eventType: "keydown" | "keyup",
        shortcutTriggered: boolean,
      ) => void
    }
  }
}

type KeyCombo = string
type KeyHandler = (event: KeyboardEvent) => void
type Options = {
  enableOnFormTags?: boolean
  preventDefault?: boolean
  debug?: boolean
  platform?: "mac" | "windows" | "linux" | "auto" // Specify platform or auto-detect
  captureSystemKeys?: boolean // Add option to capture system-reserved keys
}

/**
 * Detects the current platform
 * @returns The detected platform: 'mac', 'windows', or 'linux'
 */
function detectPlatform(): "mac" | "windows" | "linux" {
  const platform = navigator.platform.toLowerCase()
  if (platform.includes("mac")) return "mac"
  if (platform.includes("win")) return "windows"
  return "linux" // Default to Linux or other platforms
}

// Store processed events to prevent duplicate handling
const processedEvents = new Map<string, number>()

/**
 * Custom hook for registering keyboard shortcuts in React components
 *
 * @param keyMap Object mapping key combinations to handler functions
 * @param deps Dependencies array (similar to useEffect)
 * @param options Additional options
 * @returns void
 *
 * @example
 * useHotkeys({
 *   "ctrl+s": (e) => saveDocument(),
 *   "esc": (e) => closeModal()
 * }, [saveDocument, closeModal]);
 */
export function useHotkeys(
  keyMap: Record<KeyCombo, KeyHandler>,
  deps: React.DependencyList = [],
  options: Options = {},
): void {
  const {
    enableOnFormTags = false,
    preventDefault = true,
    debug = false,
    platform = "auto",
    captureSystemKeys = false, // Default to not capturing system keys
  } = options

  // Determine current platform
  const currentPlatform = platform === "auto" ? detectPlatform() : platform

  // Use a ref to store the latest keyMap to avoid issues with closures
  const keyMapRef = useRef(keyMap)

  // Update ref when keyMap changes
  useEffect(() => {
    keyMapRef.current = keyMap
  }, [keyMap])

  // Setup debug helpers
  useEffect(() => {
    if (debug) {
      // Initialize the global debug object if it doesn't exist
      if (!window.__hotkeyDebug) {
        window.__hotkeyDebug = {
          registeredShortcuts: [],
        }
      }
    }
  }, [debug])

  useEffect(() => {
    // Parse key combinations and store them in a Map for quick lookup
    const shortcuts = new Map<string, KeyHandler>()
    const registeredShortcuts: string[] = []

    for (const [combo, handler] of Object.entries(keyMapRef.current)) {
      // Normalize key combo format (e.g., "ctrl+a" -> "Control+KeyA")
      const normalizedCombo = normalizeKeyCombo(combo, currentPlatform)
      shortcuts.set(normalizedCombo, handler)
      registeredShortcuts.push(normalizedCombo)

      if (debug) {
        // Add to the global debug registry
        window.__hotkeyDebug!.registeredShortcuts.push(normalizedCombo)
        console.log(`[useHotkeys] Registered shortcut: ${combo} -> ${normalizedCombo}`)
      }
    }

    // Main keydown event handler
    function handleKeyDown(event: KeyboardEvent) {
      // Prevent duplicate event handling
      const eventId = `${event.timeStamp}-${event.code}`
      if (processedEvents.has(eventId)) {
        return
      }

      // Record processed event, delete after 5ms
      processedEvents.set(eventId, Date.now())
      setTimeout(() => {
        processedEvents.delete(eventId)
      }, 5)

      // Store the last event for debugging
      if (debug) {
        window.__hotkeyDebug!.lastKeyEvent = event
      }

      // Ignore keydown events from form elements unless specifically enabled
      if (
        !enableOnFormTags &&
        (event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement)
      ) {
        if (debug) {
          console.log(`[useHotkeys] Ignoring keyboard event from form element: ${event.key}`)
        }
        return
      }

      // Build the actual key combo string from the event
      const eventCombo = buildKeyComboFromEvent(event)

      // System key check - only proceed if captureSystemKeys is true for system shortcuts
      if (!captureSystemKeys) {
        // List of combos that are typically reserved by the system
        const systemCombos = [
          // Common system shortcuts on Windows/Linux
          "Control+KeyC", // Copy
          "Control+KeyV", // Paste
          "Control+KeyX", // Cut
          "Control+KeyD", // Bookmark (browsers) or duplicate (many editors)
          "Control+KeyW", // Close tab
          "Control+KeyF", // Find
          "Control+KeyN", // New window
          "Control+KeyT", // New tab
          "Control+KeyP", // Print
          "Control+KeyO", // Open
          "Control+KeyS", // Save
          "Control+KeyR", // Reload

          // Common system shortcuts on Mac
          "Meta+KeyC", // Copy
          "Meta+KeyV", // Paste
          "Meta+KeyX", // Cut
          "Meta+KeyD", // Duplicate
          "Meta+KeyW", // Close window
          "Meta+KeyF", // Find
          "Meta+KeyN", // New window
          "Meta+KeyT", // New tab
          "Meta+KeyP", // Print
          "Meta+KeyO", // Open
          "Meta+KeyS", // Save
          "Meta+KeyR", // Reload
        ]

        // Skip handling if it's a system combo
        if (systemCombos.includes(eventCombo)) {
          if (debug) {
            console.log(`[useHotkeys] Skipping system shortcut: ${eventCombo}`)
          }
          return
        }
      }

      // Check if we have a handler for this combo
      const hasHandler = shortcuts.has(eventCombo)

      // Only log in debug mode when a shortcut is matched
      if (debug && hasHandler) {
        console.log(
          `[useHotkeys] Keyboard event: ${event.key} (${event.code}), combo: ${eventCombo}`,
        )
      }

      // Call debug callback if exists
      if (debug && window.__hotkeyDebug?.onKeyEvent && hasHandler) {
        window.__hotkeyDebug.onKeyEvent(event, "keydown", hasHandler)
      }

      if (hasHandler) {
        if (preventDefault) {
          event.preventDefault()
          if (debug) {
            console.log("[useHotkeys] Prevented default event behavior")
          }
        }

        // Call the handler
        const handler = shortcuts.get(eventCombo)
        if (handler) {
          if (debug) {
            console.log(`[useHotkeys] Executing shortcut handler: ${eventCombo}`)
          }
          handler(event)
        }
      }
    }

    // Optionally track keyup events for debugging
    function handleKeyUp(event: KeyboardEvent) {
      // Only call in debug mode with callback and matching shortcut
      const eventCombo = buildKeyComboFromEvent(event)
      const hasHandler = shortcuts.has(eventCombo)

      if (debug && window.__hotkeyDebug?.onKeyEvent && hasHandler) {
        window.__hotkeyDebug.onKeyEvent(event, "keyup", false)
      }
    }

    // Add global event listeners
    window.addEventListener("keydown", handleKeyDown)
    if (debug) {
      window.addEventListener("keyup", handleKeyUp)
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (debug) {
        window.removeEventListener("keyup", handleKeyUp)

        // Clean up registered shortcuts from the global registry
        if (window.__hotkeyDebug) {
          window.__hotkeyDebug.registeredShortcuts =
            window.__hotkeyDebug.registeredShortcuts.filter(
              (combo) => !registeredShortcuts.includes(combo),
            )
        }
      }
    }
  }, [...deps, enableOnFormTags, preventDefault, debug, currentPlatform, captureSystemKeys]) // Re-run when dependencies change
}

/**
 * Converts a user-friendly key combo to a normalized format
 * e.g., "ctrl+a" -> "Control+KeyA"
 */
function normalizeKeyCombo(combo: string, platform: "mac" | "windows" | "linux"): string {
  const result = combo
    .toLowerCase()
    .split("+")
    .map((part) => {
      // Handle platform-specific modifier keys
      if (part === "cmd" || part === "command") {
        return platform === "mac" ? "Meta" : "Control"
      }

      if (part === "win" || part === "windows") {
        return platform === "windows" ? "Meta" : "Control"
      }

      // Standard key name mappings
      switch (part) {
        case "ctrl":
        case "control":
          return "Control"
        case "alt":
        case "option": // macOS Alt key name
          return "Alt"
        case "shift":
          return "Shift"
        case "meta":
          return "Meta"
        case "space":
          return "Space"
        case "enter":
        case "return": // macOS name
          return "Enter"
        case "esc":
        case "escape":
          return "Escape"
        case "tab":
          return "Tab"
        case "backspace":
          return "Backspace"
        case "delete":
        case "del":
          return "Delete"
        case "insert":
        case "ins":
          return "Insert"
        case "home":
          return "Home"
        case "end":
          return "End"
        case "pageup":
        case "pgup":
          return "PageUp"
        case "pagedown":
        case "pgdn":
          return "PageDown"
        case "left":
        case "leftarrow":
          return "ArrowLeft"
        case "right":
        case "rightarrow":
          return "ArrowRight"
        case "up":
        case "uparrow":
          return "ArrowUp"
        case "down":
        case "downarrow":
          return "ArrowDown"
        case "capslock":
          return "CapsLock"
        // Function keys
        case "f1":
          return "F1"
        case "f2":
          return "F2"
        case "f3":
          return "F3"
        case "f4":
          return "F4"
        case "f5":
          return "F5"
        case "f6":
          return "F6"
        case "f7":
          return "F7"
        case "f8":
          return "F8"
        case "f9":
          return "F9"
        case "f10":
          return "F10"
        case "f11":
          return "F11"
        case "f12":
          return "F12"
        // Single letter/number keys - convert to KeyX format
        default:
          if (part.length === 1) {
            // Single character - could be letter or number
            if (/^[a-z]$/.test(part)) {
              return `Key${part.toUpperCase()}`
            }
            if (/^[0-9]$/.test(part)) {
              return `Digit${part}`
            }
          }
          // Return as is if not a special case
          return part.charAt(0).toUpperCase() + part.slice(1)
      }
    })
    .join("+")

  return result
}

/**
 * Builds a key combo string from a keyboard event
 * Creates a normalized string like "Control+Alt+KeyA"
 */
function buildKeyComboFromEvent(event: KeyboardEvent): string {
  const parts: string[] = []

  // Add modifier keys in consistent order
  if (event.ctrlKey) {
    parts.push("Control")
  }
  if (event.altKey) {
    parts.push("Alt")
  }
  if (event.shiftKey) {
    parts.push("Shift")
  }
  if (event.metaKey) {
    parts.push("Meta")
  }

  // Add the main key - use event.code for better consistency across keyboard layouts
  if (event.code) {
    parts.push(event.code)
  }

  return parts.join("+")
}

/**
 * Custom hook for listening to global shortcuts from the main process
 * Connects to electronShortcut.onShortcut provided by the preload script
 */
export function useGlobalShortcut(
  handler: (event: ShortcutEvent) => void,
  deps: React.DependencyList = [],
): void {
  useEffect(() => {
    // Only set up if the API is available
    if (window.electronShortcut?.onShortcut) {
      // Register listener and get cleanup function
      const cleanup = window.electronShortcut.onShortcut(handler)

      // Return cleanup function to remove the listener on unmount
      return cleanup
    }

    // No cleanup needed if API not available
    return undefined
  }, [handler, ...deps]) // Include handler in dependencies
}

/**
 * Hook for monitoring keyboard activity for debugging
 * Returns list of registered shortcuts
 */
export function useKeyboardMonitor(
  onKeyEvent?: (
    event: KeyboardEvent,
    eventType: "keydown" | "keyup",
    shortcutTriggered: boolean,
  ) => void,
  deps: React.DependencyList = [],
): { registeredShortcuts: string[] } {
  useEffect(() => {
    // Initialize the debug object if it doesn't exist
    if (!window.__hotkeyDebug) {
      window.__hotkeyDebug = {
        registeredShortcuts: [],
      }
    }

    // Set the callback function
    window.__hotkeyDebug.onKeyEvent = onKeyEvent

    // Cleanup function
    return () => {
      if (window.__hotkeyDebug) {
        window.__hotkeyDebug.onKeyEvent = undefined
      }
    }
  }, [onKeyEvent, ...deps]) // Include onKeyEvent in dependencies

  // Return registered shortcuts for display
  return {
    registeredShortcuts: window.__hotkeyDebug?.registeredShortcuts || [],
  }
}
