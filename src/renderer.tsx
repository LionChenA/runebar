import "./styles/global.css"
import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

// 渲染应用
const root = createRoot(document.getElementById("root")!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
