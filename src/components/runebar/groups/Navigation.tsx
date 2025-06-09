/**
 * Runebar 导航命令组组件
 *
 * 显示导航相关的命令项
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem, CommandShortcut } from "@/components/ui/command"
import { FileText, Home } from "lucide-react"
import type { CommandGroupProps } from "../types"

export function NavigationGroup({ onSelect }: CommandGroupProps) {
  return (
    <CommandGroup heading="Navigation">
      <CommandItem value="home" onSelect={onSelect}>
        <Home className="mr-2 h-4 w-4" />
        <span>Home</span>
        <CommandShortcut>⌘H</CommandShortcut>
      </CommandItem>
      <CommandItem value="second-page" onSelect={onSelect}>
        <FileText className="mr-2 h-4 w-4" />
        <span>Second Page</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  )
}
