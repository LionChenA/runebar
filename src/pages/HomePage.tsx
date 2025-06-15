import LangToggle from "@/components/LangToggle"
import ToggleTheme from "@/components/ToggleTheme"
import Footer from "@/components/template/Footer"
import InitialIcons from "@/components/template/InitialIcons"
import { Button } from "@/components/ui/button"
import { toggleRunebarWindow } from "@/helpers/window_helpers"
import React from "react"
import { useTranslation } from "react-i18next"

export default function HomePage() {
  const { t } = useTranslation()

  // 处理Runebar窗口切换
  const handleRunebarToggle = async () => {
    await toggleRunebarWindow()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-full">
      <InitialIcons />
      <div className="text-center">
        <h1 className="font-mono text-4xl font-bold">{t("appName")}</h1>
        <p className="text-sm text-muted-foreground" data-testid="pageTitle">
          {t("titleHomePage")}
        </p>
      </div>

      <div className="my-4 text-sm text-muted-foreground">
        <p className="font-medium mb-2">{t("shortcutHelp.title")}</p>
        <ul className="list-disc pl-5">
          <li>{t("shortcutHelp.toggleTheme", { key: "Ctrl+D" })}</li>
          <li>{t("shortcutHelp.toggleLanguage", { key: "Ctrl+L" })}</li>
          <li>Open Runebar with Alt+Space</li>
        </ul>
      </div>

      <div className="flex gap-2">
        <LangToggle />
        <ToggleTheme />
        <Button variant="outline" onClick={handleRunebarToggle}>
          Toggle Runebar
        </Button>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
