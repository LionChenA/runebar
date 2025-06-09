/**
 * Runebar 状态管理 reducer 文件
 *
 * 使用 useReducer 集中管理 Runebar 组件的状态
 */

import type { RunebarAction, RunebarState } from "./types"

/**
 * Runebar reducer 函数
 * 根据不同的动作类型更新状态
 */
export function runebarReducer(state: RunebarState, action: RunebarAction): RunebarState {
  switch (action.type) {
    case "OPEN":
      return { ...state, open: true }

    case "CLOSE":
      return { ...state, open: false }

    case "TOGGLE":
      return { ...state, open: !state.open }

    case "SET_SEARCH":
      return { ...state, search: action.payload }

    case "NAVIGATE_TO_PAGE":
      return {
        ...state,
        pages: [...state.pages, action.payload],
        // 当导航到新页面时，重置搜索
        search: "",
      }

    case "NAVIGATE_BACK":
      if (state.pages.length === 0) return state
      return {
        ...state,
        pages: state.pages.slice(0, -1),
        // 当返回上一页时，重置搜索
        search: "",
      }

    case "RESET_PAGES":
      return { ...state, pages: [] }

    case "LOAD_ASYNC_START":
      return { ...state, loading: true, asyncItems: [] }

    case "LOAD_ASYNC_SUCCESS":
      return {
        ...state,
        loading: false,
        asyncItems: action.payload,
      }

    case "LOAD_ASYNC_ERROR":
      return { ...state, loading: false }

    default:
      return state
  }
}
