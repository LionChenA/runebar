import { setAppLanguage } from "@/helpers/language_helpers"
import langs from "@/localization/langs"
import React from "react"
import { useTranslation } from "react-i18next"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

export default function LangToggle() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  function onValueChange(value: string) {
    setAppLanguage(value, i18n)
  }

  return (
    <ToggleGroup type="single" onValueChange={onValueChange} value={currentLang}>
      {langs.map((lang) => (
        <ToggleGroupItem key={lang.key} value={lang.key}>
          {`${lang.prefix} ${lang.nativeName}`}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
