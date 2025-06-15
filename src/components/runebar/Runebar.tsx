/**
 * Runebar 主组件
 *
 * 替代原来的 RunebarCommand 组件，使用 useReducer 进行状态管理，
 * 并将各个页面和命令组拆分为独立组件
 */

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import {
  GLOBAL_SHORTCUT_COMMAND_MENU_CHANNEL,
  GLOBAL_SHORTCUT_RUNEBAR_TOGGLE_CHANNEL,
} from "@/helpers/ipc/shortcut/shortcut-channels"
import { useGlobalShortcut } from "@/hooks/useHotkeys"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useReducer } from "react"
import type { KeyboardEvent as ReactKeyboardEvent } from "react"
import { AsyncPage } from "./pages/Async"
import { CalculatorPage } from "./pages/Calculator"
import { EmojiPage } from "./pages/Emoji"
import { MainPage } from "./pages/MainPage"
import { ProfilePage } from "./pages/Profile"
import { SubItemsPage } from "./pages/SubItems"
import { ThemePage } from "./pages/Theme"
import { runebarReducer } from "./reducer"
import { RunebarPage, type RunebarProps, initialRunebarState } from "./types"

export function Runebar({ autoFocus = false }: RunebarProps) {
  const [state, dispatch] = useReducer(runebarReducer, {
    ...initialRunebarState,
    open: autoFocus,
  })

  const { open, loading, asyncItems, pages, search } = state
  const page = pages[pages.length - 1]
  const navigate = useNavigate()

  // 独立窗口模式下监听ESC键关闭窗口
  useEffect(() => {
    if (autoFocus) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && !pages.length) {
          // 通知主进程隐藏窗口
          window.electronWindow.toggleRunebar()
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
    return undefined
  }, [autoFocus, pages.length])

  // 只在非独立窗口模式下监听cmd+k快捷键
  useEffect(() => {
    if (!autoFocus) {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          dispatch({ type: "TOGGLE" })
        }
      }

      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }
    return undefined
  }, [autoFocus])

  // 监听全局快捷键事件
  useGlobalShortcut(
    (event) => {
      if (event.type === GLOBAL_SHORTCUT_COMMAND_MENU_CHANNEL) {
        dispatch({ type: "OPEN" })
      } else if (event.type === GLOBAL_SHORTCUT_RUNEBAR_TOGGLE_CHANNEL && autoFocus) {
        // 只在独立窗口模式下响应该事件
        dispatch({ type: "OPEN" })
      }
    },
    [autoFocus],
  )

  // 模拟异步加载数据
  useEffect(() => {
    if (open && page === RunebarPage.ASYNC) {
      dispatch({ type: "LOAD_ASYNC_START" })
      const timer = setTimeout(() => {
        dispatch({
          type: "LOAD_ASYNC_SUCCESS",
          payload: ["Result 1", "Result 2", "Result 3", "Result 4", "Result 5"],
        })
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [open, page])

  // 处理导航
  const handleSelect = (value: string) => {
    if (value === "home") {
      navigate({ to: "/" })
      dispatch({ type: "CLOSE" })
    } else if (value === "second-page") {
      navigate({ to: "/tools" })
      dispatch({ type: "CLOSE" })
    } else if (value === "settings") {
      navigate({ to: "/settings" })
      dispatch({ type: "CLOSE" })
    }
  }

  // 处理键盘事件
  const handleKeyDown = (e: ReactKeyboardEvent) => {
    // Escape或Backspace（当搜索为空时）返回上一级页面
    if (e.key === "Escape" || (e.key === "Backspace" && !search && pages.length > 0)) {
      e.preventDefault()
      dispatch({ type: "NAVIGATE_BACK" })
    }
  }

  // 渲染页面内容
  const renderPageContent = () => {
    switch (page) {
      case RunebarPage.MAIN:
        return <MainPage pages={pages} dispatch={dispatch} onSelect={handleSelect} />
      case RunebarPage.CALCULATOR:
        return <CalculatorPage />
      case RunebarPage.EMOJI:
        return <EmojiPage />
      case RunebarPage.THEME:
        return <ThemePage dispatch={dispatch} />
      case RunebarPage.PROFILE:
        return <ProfilePage />
      case RunebarPage.ASYNC:
        return <AsyncPage loading={loading} asyncItems={asyncItems} dispatch={dispatch} />
      case RunebarPage.SUBITEMS:
        return <SubItemsPage />
      default:
        return <MainPage pages={pages} dispatch={dispatch} onSelect={handleSelect} />
    }
  }

  // 渲染命令面板内容
  const renderCommandContent = () => (
    <Command onKeyDown={handleKeyDown}>
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={(value) => dispatch({ type: "SET_SEARCH", payload: value })}
        autoFocus={autoFocus}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {renderPageContent()}
      </CommandList>
    </Command>
  )

  return (
    <>
      {!autoFocus && (
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>{" "}
          to open Runebar Command
        </p>
      )}

      {autoFocus ? (
        // 在独立窗口中直接使用Command组件
        <div className="w-full">{renderCommandContent()}</div>
      ) : (
        // 在主窗口中使用CommandDialog
        <CommandDialog
          open={open}
          onOpenChange={(open) => dispatch({ type: open ? "OPEN" : "CLOSE" })}
        >
          {renderCommandContent()}
        </CommandDialog>
      )}
    </>
  )
}
