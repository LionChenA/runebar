/**
 * Runebar 组件类型定义文件
 *
 * 定义了 Runebar 组件的类型、状态和动作
 */

// 页面类型
export enum RunebarPage {
  // 主页面默认值为空字符串
  MAIN = "",
  CALCULATOR = "calculator",
  EMOJI = "emoji",
  THEME = "theme",
  PROFILE = "profile",
  ASYNC = "async",
  SUBITEMS = "subitems",
}

// Runebar 组件的 Props
export interface RunebarProps {
  autoFocus?: boolean
}

// Runebar 状态定义
export interface RunebarState {
  open: boolean
  loading: boolean
  asyncItems: string[]
  pages: string[]
  search: string
}

// Runebar 动作类型
export type RunebarAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "NAVIGATE_TO_PAGE"; payload: string }
  | { type: "NAVIGATE_BACK" }
  | { type: "RESET_PAGES" }
  | { type: "LOAD_ASYNC_START" }
  | { type: "LOAD_ASYNC_SUCCESS"; payload: string[] }
  | { type: "LOAD_ASYNC_ERROR" }

// 初始状态
export const initialRunebarState: RunebarState = {
  open: false,
  loading: false,
  asyncItems: [],
  pages: [],
  search: "",
}

// 命令组组件的 Props
export interface CommandGroupProps {
  pages: string[]
  setPages: (pages: string[]) => void
  onSelect?: (value: string) => void
}

// 页面组件的 Props
export interface RunebarPageProps {
  onSelect?: (value: string) => void
  dispatch: React.Dispatch<RunebarAction>
  loading?: boolean
  asyncItems?: string[]
}
