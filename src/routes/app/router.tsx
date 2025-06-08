import { createMemoryHistory, createRouter } from "@tanstack/react-router"
import { appRouteTree } from "./routes"

// 使用TypeScript声明合并，正确注册应用窗口路由器
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const appHistory = createMemoryHistory({
  initialEntries: ["/"],
})

// 直接使用appRouteTree，它已经基于独立的AppRootRoute构建
export const router = createRouter({
  routeTree: appRouteTree,
  history: appHistory,
})
