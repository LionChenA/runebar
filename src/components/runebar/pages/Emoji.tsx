/**
 * Runebar 表情页面组件
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem } from "@/components/ui/command"

export function EmojiPage() {
  return (
    <CommandGroup heading="Emoji">
      <CommandItem>😀 Smile</CommandItem>
      <CommandItem>😂 Laugh</CommandItem>
      <CommandItem>😍 Heart Eyes</CommandItem>
      <CommandItem>🤔 Thinking</CommandItem>
      <CommandItem>👍 Thumbs Up</CommandItem>
    </CommandGroup>
  )
}
