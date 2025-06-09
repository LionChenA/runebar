import DragWindowRegion from "@/components/DragWindowRegion"
import AppSidebar from "@/components/template/AppSidebar"
import type React from "react"

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <DragWindowRegion title="Runebar" />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
}
