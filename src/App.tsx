import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { subscribeToThemeChanges, syncThemeWithLocal } from "./helpers/theme_helpers"
import "./localization/i18n"
import { RouterProvider } from "@tanstack/react-router"
import { updateAppLanguage } from "./helpers/language_helpers"
import { router } from "./routes/app/router"

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // 初始化主题和语言
    syncThemeWithLocal()
    updateAppLanguage(i18n)

    // 监听主题变化
    const unsubscribe = subscribeToThemeChanges(() => {
      // 主题变化时的额外处理，目前不需要做什么
    })

    // 清理函数
    return () => {
      unsubscribe()
    }
  }, [i18n])

  return <RouterProvider router={router} />
}
