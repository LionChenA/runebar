import { Runebar } from "@/components/runebar"
import { createRoute } from "@tanstack/react-router"
import React from "react"
import { RunebarRootRoute } from "./__root"

// Runebar 主页路由
export const RunebarHomeRoute = createRoute({
  getParentRoute: () => RunebarRootRoute,
  path: "/",
  component: RunebarHome,
})

// 构建路由树
export const runebarRouteTree = RunebarRootRoute.addChildren([RunebarHomeRoute])

// Runebar 主页组件
function RunebarHome() {
  return <Runebar autoFocus={true} />
}
