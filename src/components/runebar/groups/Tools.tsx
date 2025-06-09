/**
 * Runebar 工具命令组组件
 *
 * 显示工具相关的命令项
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Calculator, Layers, Smile } from "lucide-react"
import { type CommandGroupProps, RunebarPage } from "../types"

export function ToolsGroup({ pages, setPages }: CommandGroupProps) {
  const navigateToPage = (page: string) => {
    setPages([...pages, page])
  }

  return (
    <CommandGroup heading="Tools">
      <CommandItem onSelect={() => navigateToPage(RunebarPage.CALCULATOR)}>
        <Calculator className="mr-2 h-4 w-4" />
        <span>Calculator</span>
      </CommandItem>
      <CommandItem onSelect={() => navigateToPage(RunebarPage.EMOJI)}>
        <Smile className="mr-2 h-4 w-4" />
        <span>Search Emoji</span>
      </CommandItem>
      <CommandItem onSelect={() => navigateToPage(RunebarPage.ASYNC)}>
        <Layers className="mr-2 h-4 w-4" />
        <span>Async Results</span>
      </CommandItem>
    </CommandGroup>
  )
}
