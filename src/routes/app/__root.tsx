import SidebarLayout from "@/layouts/SidebarLayout"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import React from "react"

// 创建独立的应用窗口根路由
export const AppRootRoute = createRootRoute({
  component: AppRoot,
})

function AppRoot() {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  )
}
