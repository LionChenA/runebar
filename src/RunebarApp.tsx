import { RouterProvider } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { runebarRouter } from "./routes/runebar/router"
import "./localization/i18n"

export function RunebarApp() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark")
  const [routerReady, setRouterReady] = useState(false)
  const [routerError, setRouterError] = useState<string | null>(null)

  // 同步主题设置
  useEffect(() => {
    const initTheme = async () => {
      try {
        const currentTheme = await window.themeMode.current()
        setTheme(currentTheme)
      } catch (error) {
        console.error("Failed to get theme:", error)
      }
    }

    initTheme()
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
      <div className={`${themeClass} p-4`} style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <h2 className="text-red-500 font-bold">Router Error</h2>
        <pre className="text-white text-sm overflow-auto max-h-96">{routerError}</pre>
      </div>
    )
  }

  return (
    <div className={`${themeClass} h-full w-full`} style={{ backgroundColor: "transparent" }}>
      <div
        className="flex items-center justify-center w-full h-full p-4"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="w-full max-w-xl rounded-lg shadow-lg border border-border bg-background">
          {!routerReady ? (
            <div className="p-4 text-center">Loading Runebar...</div>
          ) : (
            <RouterProvider router={runebarRouter} />
          )}
        </div>
      </div>
    </div>
  )
}
