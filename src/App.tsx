import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { syncThemeWithLocal } from "./helpers/theme_helpers"
import "./localization/i18n"
import { RouterProvider } from "@tanstack/react-router"
import { updateAppLanguage } from "./helpers/language_helpers"
import { router } from "./routes/main/router"

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    syncThemeWithLocal()
    updateAppLanguage(i18n)
  }, [i18n])

  return <RouterProvider router={router} />
}
