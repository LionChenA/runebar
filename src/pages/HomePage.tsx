import LangToggle from "@/components/LangToggle"
import ToggleTheme from "@/components/ToggleTheme"
import Footer from "@/components/template/Footer"
import InitialIcons from "@/components/template/InitialIcons"
import { Button } from "@/components/ui/button"
import { toggleRunebarWindow } from "@/helpers/window_helpers"
import { useGlobalShortcut, useHotkeys } from "@/hooks/useHotkeys"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const [shortcutMessage, setShortcutMessage] = useState<string>("")

  // Example of local shortcuts with debug mode enabled
  useHotkeys(
    {
      // Toggle theme with "Ctrl+D"
      "ctrl+d": async () => {
        console.log("快捷键触发: 切换主题 (Ctrl+D)")
        // 获取当前主题并切换
        const currentTheme = await window.themeMode.current()
        if (currentTheme === "dark") {
          await window.themeMode.light()
        } else {
          await window.themeMode.dark()
        }
        setShortcutMessage(t("shortcutMessages.toggleTheme"))
      },

      // Toggle language with "Ctrl+L"
      "ctrl+l": () => {
        console.log("快捷键触发: 切换语言 (Ctrl+L)")
        const currentLang = i18n.language
        i18n.changeLanguage(currentLang === "en" ? "zh" : "en")
        setShortcutMessage(t("shortcutMessages.toggleLanguage"))
      },

      // Clear shortcut message with "Escape"
      escape: () => {
        console.log("快捷键触发: 清除消息 (Escape)")
        setShortcutMessage("")
      },
    },
    [i18n, t],
    {
      debug: true, // Enable debug mode
      platform: "auto", // 自动检测平台
    },
  )

  // Listen for global shortcuts from main process
  useGlobalShortcut((event) => {
    console.log(`全局快捷键触发: ${event.type} (${new Date(event.timestamp).toLocaleTimeString()})`)
    setShortcutMessage(
      `Global shortcut: ${event.type} at ${new Date(event.timestamp).toLocaleTimeString()}`,
    )

    // Auto-clear message after 3 seconds
    setTimeout(() => {
      setShortcutMessage("")
    }, 3000)
  })

  // 处理Runebar窗口切换
  const handleRunebarToggle = async () => {
    await toggleRunebarWindow()
    setShortcutMessage("Toggled Runebar window")

    // Auto-clear message after 3 seconds
    setTimeout(() => {
      setShortcutMessage("")
    }, 3000)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <InitialIcons />
        <span>
          <h1 className="font-mono text-4xl font-bold">{t("appName")}</h1>
          <p className="text-end text-sm uppercase text-muted-foreground" data-testid="pageTitle">
            {t("titleHomePage")}
          </p>
        </span>

        {/* Display shortcut message if present */}
        {shortcutMessage && (
          <div className="my-2 rounded-md bg-secondary p-2 text-sm">{shortcutMessage}</div>
        )}

        <div className="my-2 text-sm text-muted-foreground">
          <p>{t("shortcutHelp.title")}</p>
          <ul className="list-disc pl-5">
            <li>{t("shortcutHelp.toggleTheme", { key: "Ctrl+D" })}</li>
            <li>{t("shortcutHelp.toggleLanguage", { key: "Ctrl+L" })}</li>
            <li>{t("shortcutHelp.globalToggleApp", { key: "Ctrl+Shift+Space" })}</li>
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
      </div>
      <Footer />
    </div>
  )
}
