/**
 * Runebar 设置命令组组件
 *
 * 显示设置相关的命令项
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem, CommandShortcut } from "@/components/ui/command"
import { Settings, User } from "lucide-react"
import { type CommandGroupProps, RunebarPage } from "../types"

export function SettingsGroup({ pages, setPages }: CommandGroupProps) {
  const navigateToPage = (page: string) => {
    setPages([...pages, page])
  }

  return (
    <CommandGroup heading="Settings">
      <CommandItem onSelect={() => navigateToPage(RunebarPage.THEME)}>
        <Settings className="mr-2 h-4 w-4" />
        <span>Change Theme...</span>
      </CommandItem>
      <CommandItem onSelect={() => navigateToPage(RunebarPage.PROFILE)}>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  )
}
