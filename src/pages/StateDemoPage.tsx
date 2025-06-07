import Footer from "@/components/template/Footer"
import { StateDemo } from "@/components/template/StateDemo"
import React from "react"
import { useTranslation } from "react-i18next"

export default function StateDemoPage() {
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col">
        <h1 className="text-3xl font-bold mb-4 text-center">{t("titleStateDemoPage")}</h1>
        <StateDemo />
      </div>
      <Footer />
    </div>
  )
}
