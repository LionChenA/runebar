import { useNavigate } from "@tanstack/react-router"
import {
  Calculator,
  CreditCard,
  FileText,
  Github,
  Home,
  Layers,
  Moon,
  Settings,
  Smile,
  Sun,
  Terminal,
  User,
} from "lucide-react"
import { useEffect, useState } from "react"
import type { KeyboardEvent as ReactKeyboardEvent } from "react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { GLOBAL_SHORTCUT_COMMAND_MENU_CHANNEL } from "@/helpers/ipc/shortcut/shortcut-channels"
import { useGlobalShortcut } from "@/hooks/useHotkeys"
import { useCommandState } from "cmdk"

export function RunebarCommand() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [asyncItems, setAsyncItems] = useState<string[]>([])
  const [pages, setPages] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const page = pages[pages.length - 1]
  const navigate = useNavigate()

  // 监听cmd+k快捷键
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // 监听全局快捷键事件
  useGlobalShortcut((event) => {
    if (event.type === GLOBAL_SHORTCUT_COMMAND_MENU_CHANNEL) {
      setOpen(true)
    }
  }, [])

  // 模拟异步加载数据
  useEffect(() => {
    if (open && page === "async") {
      setLoading(true)
      const timer = setTimeout(() => {
        setAsyncItems(["Result 1", "Result 2", "Result 3", "Result 4", "Result 5"])
        setLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [open, page])

  // 处理导航
  const handleSelect = (value: string) => {
    if (value === "home") {
      navigate({ to: "/" })
      setOpen(false)
    } else if (value === "second-page") {
      navigate({ to: "/second-page" })
      setOpen(false)
    }
  }

  // 处理主题切换
  const handleThemeChange = async (theme: "light" | "dark" | "system") => {
    if (theme === "light") {
      await window.themeMode.light()
    } else if (theme === "dark") {
      await window.themeMode.dark()
    } else if (theme === "system") {
      await window.themeMode.system()
    }
    setPages([])
  }

  // 处理键盘事件
  const handleKeyDown = (e: ReactKeyboardEvent) => {
    // Escape或Backspace（当搜索为空时）返回上一级页面
    if (e.key === "Escape" || (e.key === "Backspace" && !search && pages.length > 0)) {
      e.preventDefault()
      setPages((pages) => pages.slice(0, -1))
    }
  }

  // 使用useCommandState获取搜索状态
  const SubItem = (props: React.ComponentPropsWithoutRef<typeof CommandItem>) => {
    const searchQuery = useCommandState((state) => state.search)
    if (!searchQuery) return null
    return <CommandItem {...props} />
  }

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>{" "}
        to open Runebar Command
      </p>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command onKeyDown={handleKeyDown}>
          <CommandInput
            placeholder="Type a command or search..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {/* 主页面 */}
            {!page && (
              <>
                <CommandGroup heading="Navigation">
                  <CommandItem value="home" onSelect={handleSelect}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                    <CommandShortcut>⌘H</CommandShortcut>
                  </CommandItem>
                  <CommandItem value="second-page" onSelect={handleSelect}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Second Page</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Tools">
                  <CommandItem onSelect={() => setPages([...pages, "calculator"])}>
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Calculator</span>
                  </CommandItem>
                  <CommandItem onSelect={() => setPages([...pages, "emoji"])}>
                    <Smile className="mr-2 h-4 w-4" />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem onSelect={() => setPages([...pages, "async"])}>
                    <Layers className="mr-2 h-4 w-4" />
                    <span>Async Results</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Settings">
                  <CommandItem onSelect={() => setPages([...pages, "theme"])}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Change Theme...</span>
                  </CommandItem>
                  <CommandItem onSelect={() => setPages([...pages, "profile"])}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Examples">
                  <CommandItem onSelect={() => setPages([...pages, "subitems"])}>
                    <Terminal className="mr-2 h-4 w-4" />
                    <span>Sub-items example</span>
                  </CommandItem>
                  <CommandItem>
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                    <CommandShortcut>⌘G</CommandShortcut>
                  </CommandItem>
                </CommandGroup>

                {/* 搜索时显示的子项 */}
                <SubItem onSelect={() => console.log("Hidden item selected")}>
                  <Terminal className="mr-2 h-4 w-4" />
                  <span>Hidden item (only visible when searching)</span>
                </SubItem>
              </>
            )}

            {/* 计算器页面 */}
            {page === "calculator" && (
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
            )}

            {/* 表情页面 */}
            {page === "emoji" && (
              <CommandGroup heading="Emoji">
                <CommandItem>😀 Smile</CommandItem>
                <CommandItem>😂 Laugh</CommandItem>
                <CommandItem>😍 Heart Eyes</CommandItem>
                <CommandItem>🤔 Thinking</CommandItem>
                <CommandItem>👍 Thumbs Up</CommandItem>
              </CommandGroup>
            )}

            {/* 主题页面 */}
            {page === "theme" && (
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
            )}

            {/* 个人资料页面 */}
            {page === "profile" && (
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
            )}

            {/* 异步结果页面 */}
            {page === "async" && (
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
            )}

            {/* 子项示例页面 */}
            {page === "subitems" && (
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
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
