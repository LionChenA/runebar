/**
 * Runebar 计算器页面组件
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem } from "@/components/ui/command"
import { Calculator } from "lucide-react"

export function CalculatorPage() {
  return (
    <CommandGroup heading="Calculator">
      <CommandItem>
        <Calculator className="mr-2 h-4 w-4" />
        <span>Simple Calculator</span>
      </CommandItem>
      <CommandItem>
        <Calculator className="mr-2 h-4 w-4" />
        <span>Scientific Calculator</span>
      </CommandItem>
    </CommandGroup>
  )
}
