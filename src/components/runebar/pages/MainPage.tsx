/**
 * Runebar 主页面组件
 *
 * 显示所有命令组
 */

import { CommandSeparator } from "@/components/ui/command"
import { CommandItem } from "@/components/ui/command"
import { useCommandState } from "cmdk"
import { Terminal } from "lucide-react"
import { Fragment } from "react"
import { ExamplesGroup } from "../groups/Examples"
import { NavigationGroup } from "../groups/Navigation"
import { SettingsGroup } from "../groups/Settings"
import { ToolsGroup } from "../groups/Tools"
import type { RunebarAction } from "../types"

interface MainPageProps {
  pages: string[]
  dispatch: React.Dispatch<RunebarAction>
  onSelect?: (value: string) => void
}

// 隐藏的子项组件，只在搜索时显示
const SubItem = (props: React.ComponentPropsWithoutRef<typeof CommandItem>) => {
  const searchQuery = useCommandState((state) => state.search)
  if (!searchQuery) return null
  return <CommandItem {...props} />
}

export function MainPage({ pages, dispatch, onSelect }: MainPageProps) {
  return (
    <Fragment>
      <NavigationGroup
        onSelect={onSelect}
        pages={pages}
        setPages={(pages) =>
          dispatch({ type: "NAVIGATE_TO_PAGE", payload: pages[pages.length - 1] })
        }
      />

      <CommandSeparator />

      <ToolsGroup
        pages={pages}
        setPages={(pages) =>
          dispatch({ type: "NAVIGATE_TO_PAGE", payload: pages[pages.length - 1] })
        }
      />

      <CommandSeparator />

      <SettingsGroup
        pages={pages}
        setPages={(pages) =>
          dispatch({ type: "NAVIGATE_TO_PAGE", payload: pages[pages.length - 1] })
        }
      />

      <CommandSeparator />

      <ExamplesGroup
        pages={pages}
        setPages={(pages) =>
          dispatch({ type: "NAVIGATE_TO_PAGE", payload: pages[pages.length - 1] })
        }
      />

      {/* 搜索时显示的子项 */}
      <SubItem onSelect={() => console.log("Hidden item selected")}>
        <Terminal className="mr-2 h-4 w-4" />
        <span>Hidden item (only visible when searching)</span>
      </SubItem>
    </Fragment>
  )
}
