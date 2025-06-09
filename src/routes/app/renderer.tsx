import { AppProviders } from "@/providers"
import React from "react"
import { createRoot } from "react-dom/client"
import "@/styles/global.css"
import App from "@/routes/app/App"

// 渲染应用
createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)
