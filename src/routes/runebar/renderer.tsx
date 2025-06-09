import "@/styles/global.css"
import { RunebarApp } from "@/routes/runebar/RunebarApp"
import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"

// 确保 DOM 完全加载
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("runebar-root")
  if (!rootElement) {
    console.error("无法找到 runebar-root 元素")
    return
  }

  try {
    // 渲染应用
    const root = createRoot(rootElement)
    root.render(
      <StrictMode>
        <RunebarApp />
      </StrictMode>,
    )
  } catch (error) {
    console.error("Error rendering RunebarApp:", error)
  }
})
