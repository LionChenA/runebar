import BaseLayout from "@/layouts/BaseLayout"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import React from "react"

export const RootRoute = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
