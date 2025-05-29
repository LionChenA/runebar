import DragWindowRegion from "@/components/DragWindowRegion"
import NavigationMenu from "@/components/template/NavigationMenu"
import type React from "react"

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DragWindowRegion title="electron-shadcn" />
      <NavigationMenu />
      <main className="h-screen pb-20 p-2">{children}</main>
    </>
  )
}
