import BaseLayout from "@/layouts/BaseLayout"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import React from "react"

// 创建独立的应用窗口根路由
export const AppRootRoute = createRootRoute({
  component: AppRoot,
})

function AppRoot() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
