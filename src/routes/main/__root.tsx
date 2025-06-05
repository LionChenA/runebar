import BaseLayout from "@/layouts/BaseLayout"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import React from "react"

// 创建独立的主窗口根路由
export const MainRootRoute = createRootRoute({
  component: MainRoot,
})

function MainRoot() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
