import { createMemoryHistory, createRouter } from "@tanstack/react-router"
import { runebarRouteTree } from "./routes"

// 使用TypeScript声明合并，正确注册runebarRouter
declare module "@tanstack/react-router" {
  interface Register {
    runebarRouter: typeof runebarRouter
  }
}

// 添加调试日志，帮助诊断问题
console.log("[RunebarRouter] Creating memory history")
const runebarHistory = createMemoryHistory({
  initialEntries: ["/"],
})

// 添加调试日志，查看路由树结构
console.log("[RunebarRouter] Route tree:", runebarRouteTree)

// 直接使用runebarRouteTree，它已经基于独立的RunebarRootRoute构建
// 不再从共享的RootRoute派生
console.log("[RunebarRouter] Creating router")
export const runebarRouter = createRouter({
  routeTree: runebarRouteTree,
  history: runebarHistory,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
})

// 设置全局错误处理
window.addEventListener("unhandledrejection", (event) => {
  console.error("[RunebarRouter] Unhandled promise rejection:", event.reason)
})
