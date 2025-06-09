/**
 * Runebar 异步结果页面组件
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Layers } from "lucide-react"
import type { RunebarPageProps } from "../types"

export function AsyncPage({ loading, asyncItems = [] }: RunebarPageProps) {
  return (
    <CommandGroup heading="Async Results">
      {loading && <CommandItem>Loading results...</CommandItem>}
      {!loading &&
        asyncItems.map((item) => (
          <CommandItem key={item} value={item}>
            <Layers className="mr-2 h-4 w-4" />
            <span>{item}</span>
          </CommandItem>
        ))}
    </CommandGroup>
  )
}
