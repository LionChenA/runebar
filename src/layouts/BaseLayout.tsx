import DragWindowRegion from "@/components/DragWindowRegion"
import AppSidebar from "@/components/template/AppSidebar"
import PageLayout from "@/layouts/PageLayout"
import type React from "react"

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 添加调试信息
  console.log("BaseLayout rendering with children:", children)

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DragWindowRegion title="Runebar" />
        <PageLayout>{children}</PageLayout>
      </div>
    </div>
  )
}
