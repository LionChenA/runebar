/**
 * Runebar 主题页面组件
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Moon, Settings, Sun } from "lucide-react"
import type { RunebarPageProps } from "../types"

export function ThemePage({ dispatch }: RunebarPageProps) {
  const handleThemeChange = async (theme: "light" | "dark" | "system") => {
    if (theme === "light") {
      await window.themeMode.light()
    } else if (theme === "dark") {
      await window.themeMode.dark()
    } else if (theme === "system") {
      await window.themeMode.system()
    }

    // 重置页面
    dispatch({ type: "RESET_PAGES" })
  }

  return (
    <CommandGroup heading="Change Theme">
      <CommandItem onSelect={() => handleThemeChange("light")}>
        <Sun className="mr-2 h-4 w-4" />
        <span>Light Theme</span>
      </CommandItem>
      <CommandItem onSelect={() => handleThemeChange("dark")}>
        <Moon className="mr-2 h-4 w-4" />
        <span>Dark Theme</span>
      </CommandItem>
      <CommandItem onSelect={() => handleThemeChange("system")}>
        <Settings className="mr-2 h-4 w-4" />
        <span>System Theme</span>
      </CommandItem>
    </CommandGroup>
  )
}
