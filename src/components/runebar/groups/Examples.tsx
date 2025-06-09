/**
 * Runebar 示例命令组组件
 *
 * 显示示例相关的命令项
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem, CommandShortcut } from "@/components/ui/command"
import { Github, Terminal } from "lucide-react"
import { type CommandGroupProps, RunebarPage } from "../types"

export function ExamplesGroup({ pages, setPages }: CommandGroupProps) {
  const navigateToPage = (page: string) => {
    setPages([...pages, page])
  }

  return (
    <CommandGroup heading="Examples">
      <CommandItem onSelect={() => navigateToPage(RunebarPage.SUBITEMS)}>
        <Terminal className="mr-2 h-4 w-4" />
        <span>Sub-items example</span>
      </CommandItem>
      <CommandItem>
        <Github className="mr-2 h-4 w-4" />
        <span>GitHub</span>
        <CommandShortcut>⌘G</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  )
}
