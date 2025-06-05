import { createMemoryHistory, createRouter } from "@tanstack/react-router"
import { mainRouteTree } from "./routes"

// 使用TypeScript声明合并，正确注册主窗口路由器
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const mainHistory = createMemoryHistory({
  initialEntries: ["/"],
})

// 直接使用mainRouteTree，它已经基于独立的MainRootRoute构建
export const router = createRouter({
  routeTree: mainRouteTree,
  history: mainHistory,
})
