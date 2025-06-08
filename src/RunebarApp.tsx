import { RouterProvider } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { runebarRouter } from "./routes/runebar/router"
import "./localization/i18n"
import { RunebarContainer } from "@/components/ui/runebar-container"
import { cn } from "@/utils/tailwind"
import type { ThemeMode } from "./helpers/theme"
import { subscribeToThemeChanges } from "./helpers/theme_helpers"

export function RunebarApp() {
  const [theme, setTheme] = useState<ThemeMode>("dark")
  const [routerReady, setRouterReady] = useState(false)
  const [routerError, setRouterError] = useState<string | null>(null)

  // 同步主题设置
  useEffect(() => {
    const initTheme = async () => {
      try {
        const themePrefs = await window.themeMode.current()
        setTheme(themePrefs.local || themePrefs.system)
      } catch (error) {
        console.error("Failed to get theme:", error)
      }
    }

    initTheme()

    // 监听主题变化
    const unsubscribe = subscribeToThemeChanges((event) => {
      setTheme(event.themeMode)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // 初始化路由器
  useEffect(() => {
    const initRouter = async () => {
      try {
        await runebarRouter.load()
        setRouterReady(true)
      } catch (error) {
        console.error("Router failed to load:", error)
        const errorMessage = error instanceof Error ? error.message : String(error)
        setRouterError(errorMessage)
      }
    }

    initRouter()

    // 添加全局错误处理
    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error)
      setRouterError(`Global error: ${event.error?.message || "Unknown error"}`)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  // 主题相关的类名
  const themeClass = theme === "dark" ? "dark" : "light"

  // 如果路由器加载失败，显示错误信息
  if (routerError) {
    return (
      <div className={cn(themeClass, "w-full h-screen m-0 p-0 overflow-hidden bg-black/80")}>
        <div className="p-4">
          <h2 className="text-red-500 font-bold">Router Error</h2>
          <pre className="text-white text-sm overflow-auto max-h-96">{routerError}</pre>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(themeClass, "w-full h-screen m-0 p-0 overflow-hidden")}>
      <div className="flex items-center justify-center w-full h-full p-4">
        <RunebarContainer>
          {!routerReady ? (
            <div className="p-4 text-center">Loading Runebar...</div>
          ) : (
            <RouterProvider router={runebarRouter} />
          )}
        </RunebarContainer>
      </div>
    </div>
  )
}
