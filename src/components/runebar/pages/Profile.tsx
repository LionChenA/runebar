/**
 * Runebar 个人资料页面组件
 *
 * 注意: 此组件中的所有硬编码字符串仅用于演示和开发目的。
 * 这些内容将在实际功能实现时替换或删除。
 */

import { CommandGroup, CommandItem } from "@/components/ui/command"
import { CreditCard, Settings, User } from "lucide-react"

export function ProfilePage() {
  return (
    <CommandGroup heading="Profile">
      <CommandItem>
        <User className="mr-2 h-4 w-4" />
        <span>View Profile</span>
      </CommandItem>
      <CommandItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Billing</span>
      </CommandItem>
      <CommandItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </CommandItem>
    </CommandGroup>
  )
}
