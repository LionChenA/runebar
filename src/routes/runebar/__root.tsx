import { Outlet, createRootRoute } from "@tanstack/react-router"
import React from "react"

// 创建独立的Runebar根路由，而不是继承共享的RootRoute
export const RunebarRootRoute = createRootRoute({
  component: RunebarRoot,
})

function RunebarRoot() {
  return (
    <div className="runebar-root">
      <Outlet />
    </div>
  )
}
