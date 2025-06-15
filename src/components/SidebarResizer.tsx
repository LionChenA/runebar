import { SIDEBAR_WIDTHS } from "@/store/settings"
import { useSettingsStore } from "@/store/settings"
import { useCallback, useEffect, useRef, useState } from "react"
import type React from "react"

interface SidebarResizerProps {
  className?: string
}

export default function SidebarResizer({ className = "" }: SidebarResizerProps) {
  const setSidebarWidth = useSettingsStore((state) => state.setSidebarWidth)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startWidth, setStartWidth] = useState(0)
  const resizerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setStartX(e.clientX)

    // Get current sidebar width from DOM
    const sidebar = document.querySelector('[data-sidebar="sidebar"]') as HTMLElement
    if (sidebar) {
      setStartWidth(sidebar.offsetWidth)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      // Cancel previous animation frame if it exists
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Use requestAnimationFrame for smooth updates
      animationFrameRef.current = requestAnimationFrame(() => {
        const deltaX = e.clientX - startX
        const newWidth = Math.max(
          SIDEBAR_WIDTHS.ICON_MODE,
          Math.min(SIDEBAR_WIDTHS.FULL_MAX, startWidth + deltaX),
        )

        // Update CSS custom property for immediate visual feedback
        document.documentElement.style.setProperty("--sidebar-width", `${newWidth}px`)
      })
    },
    [isDragging, startX, startWidth],
  )

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)

    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    // Get final width and update store
    const currentWidth = Number.parseInt(
      document.documentElement.style.getPropertyValue("--sidebar-width").replace("px", ""),
      10,
    )

    if (currentWidth) {
      setSidebarWidth(currentWidth)
    }
  }, [isDragging, setSidebarWidth])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div
      ref={resizerRef}
      className={`absolute right-0 top-0 bottom-0 w-2 cursor-col-resize transition-all duration-200 ${
        isDragging ? "bg-sidebar-accent/30 w-3" : "hover:bg-sidebar-accent/20"
      } ${className}`}
      onMouseDown={handleMouseDown}
      style={{
        zIndex: 10,
      }}
    >
      {/* Visual indicator */}
      <div
        className={`absolute right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-12 bg-sidebar-border rounded-full transition-all duration-200 ${
          isDragging ? "opacity-100 h-16 bg-sidebar-accent" : "opacity-0 hover:opacity-60"
        }`}
      />
      {/* Drag hint */}
      <div
        className={`absolute right-1 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-sidebar-border/40 rounded-full transition-all duration-200 ${
          isDragging ? "opacity-0" : "opacity-0 hover:opacity-40"
        }`}
      />
    </div>
  )
}
