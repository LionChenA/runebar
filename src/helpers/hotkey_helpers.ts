import type { ShortcutEvent } from "@/types/shortcut-types"
import { detectPlatform } from "../utils/platform"

/**
 * 规范化快捷键组合
 * 将人类可读的快捷键格式转换为标准格式
 */
export function normalizeKeyCombo(combo: string, platform: "mac" | "windows" | "linux"): string {
  if (!combo) return ""

  const result = combo
    .toLowerCase()
    .split("+")
    .map((part) => {
      // 处理平台特定的修饰键
      if (part === "cmd" || part === "command") {
        return platform === "mac" ? "Meta" : "Control"
      }

      if (part === "win" || part === "windows") {
        return platform === "windows" ? "Meta" : "Control"
      }

      // 标准键名映射
      switch (part) {
        case "ctrl":
        case "control":
          return "Control"
        case "alt":
        case "option": // macOS Alt键名
          return "Alt"
        case "shift":
          return "Shift"
        case "meta":
          return "Meta"
        case "space":
          return "Space"
        case "enter":
        case "return": // macOS名称
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
        // 字母或数字键 - 转换为KeyX格式
        default:
          if (part.length === 1) {
            // 单个字符 - 可能是字母或数字
            if (/^[a-z]$/.test(part)) {
              return `Key${part.toUpperCase()}`
            }
            if (/^[0-9]$/.test(part)) {
              return `Digit${part}`
            }
          }
          // 如果不是特殊情况，原样返回
          return part.charAt(0).toUpperCase() + part.slice(1)
      }
    })
    .join("+")

  return result
}

/**
 * 从键盘事件构建快捷键组合字符串
 * 创建一个规范化的字符串，如"Control+Alt+KeyA"
 */
export function buildKeyComboFromEvent(event: KeyboardEvent): string {
  const parts: string[] = []

  // 按一致的顺序添加修饰键
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

  // 添加主键 - 使用event.code以获得更好的跨键盘布局一致性
  if (event.code) {
    parts.push(event.code)
  }

  return parts.join("+")
}

/**
 * 检查快捷键是否是系统保留的快捷键
 */
export function isSystemShortcut(combo: string): boolean {
  const systemCombos = [
    // Windows/Linux常用系统快捷键
    "Control+KeyC",
    "Control+KeyV",
    "Control+KeyX",
    "Control+KeyZ",
    // macOS常用系统快捷键
    "Meta+KeyC",
    "Meta+KeyV",
    "Meta+KeyX",
    "Meta+KeyZ",
    // 浏览器常用快捷键
    "Control+KeyT",
    "Control+KeyW",
    "Control+KeyR",
    "Control+KeyF",
    "Meta+KeyT",
    "Meta+KeyW",
    "Meta+KeyR",
    "Meta+KeyF",
  ]

  return systemCombos.includes(combo)
}

/**
 * 转换Electron快捷键格式为Web格式
 * 例如：CommandOrControl+Shift+A -> Control+Shift+KeyA (Windows/Linux) 或 Meta+Shift+KeyA (Mac)
 */
export function convertElectronToWebShortcut(accelerator: string): string {
  const platform = detectPlatform()

  // 替换CommandOrControl为平台特定的修饰符
  const webAccelerator = accelerator
    .replace(/CommandOrControl/gi, platform === "mac" ? "Command" : "Control")
    .replace(/CmdOrCtrl/gi, platform === "mac" ? "Command" : "Control")

  // 规范化格式
  return normalizeKeyCombo(webAccelerator, platform)
}

/**
 * 转换Web快捷键格式为Electron格式
 * 例如：Control+Shift+KeyA -> CommandOrControl+Shift+A
 */
export function convertWebToElectronShortcut(webShortcut: string): string {
  const parts = webShortcut.split("+")
  const hasControl = parts.includes("Control")
  const hasMeta = parts.includes("Meta")

  if (hasControl || hasMeta) {
    const index = hasControl ? parts.indexOf("Control") : parts.indexOf("Meta")

    if (index !== -1) {
      parts[index] = "CommandOrControl"
    }
  }

  // 简化键名（例如KeyA -> A）
  return parts
    .map((part) => {
      if (part.startsWith("Key")) {
        return part.substring(3)
      }
      if (part.startsWith("Digit")) {
        return part.substring(5)
      }
      return part
    })
    .join("+")
}

/**
 * 格式化快捷键用于显示
 * 例如：Control+Shift+KeyA -> Ctrl+Shift+A
 */
export function formatHotkeyForDisplay(
  combo: string,
  platform: "mac" | "windows" | "linux" = detectPlatform(),
): string {
  if (!combo) return ""

  return combo
    .split("+")
    .map((part) => {
      switch (part) {
        case "Control":
          return platform === "mac" ? "⌃" : "Ctrl"
        case "Alt":
          return platform === "mac" ? "⌥" : "Alt"
        case "Shift":
          return platform === "mac" ? "⇧" : "Shift"
        case "Meta":
          return platform === "mac" ? "⌘" : "Win"
        case "Space":
          return "Space"
        default:
          if (part.startsWith("Key")) {
            return part.substring(3)
          }
          if (part.startsWith("Digit")) {
            return part.substring(5)
          }
          return part
      }
    })
    .join(platform === "mac" ? " " : "+")
}

/**
 * 检查快捷键是否与另一个快捷键冲突
 */
export function isHotkeyConflict(hotkey1: string, hotkey2: string): boolean {
  return (
    normalizeKeyCombo(hotkey1, detectPlatform()) === normalizeKeyCombo(hotkey2, detectPlatform())
  )
}
