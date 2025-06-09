/**
 * Runebar 子项示例页面组件
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Terminal } from "lucide-react"

export function SubItemsPage() {
  return (
    <CommandGroup heading="Sub-items Example">
      <CommandItem>
        <Terminal className="mr-2 h-4 w-4" />
        <span>Main Item</span>
      </CommandItem>
      <CommandItem className="ml-4">
        <span>Sub-item 1</span>
      </CommandItem>
      <CommandItem className="ml-4">
        <span>Sub-item 2</span>
      </CommandItem>
      <CommandItem className="ml-4">
        <span>Sub-item 3</span>
      </CommandItem>
    </CommandGroup>
  )
}
