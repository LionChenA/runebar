import { builtinModules } from "node:module"
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  define: {
    // 定义Node.js全局变量以避免在浏览器环境中出现未定义错误
    __dirname: "undefined",
    __filename: "undefined",
    global: "globalThis",
  },
  // 配置多页应用，为每个窗口提供单独的入口点
  build: {
    rollupOptions: {
      input: {
        // Multi-entry configuration for Electron app:
        // - Defines separate entry points for different windows/pages
        // - Each entry generates its own JS bundle for optimized loading
        // - In development, these become accessible routes (e.g., /app, /runebar)
        // - In production, creates separate HTML files for each window
        // - Enables MPA architecture instead of SPA for better separation of concerns
        app: path.resolve(__dirname, "index.html"),
        runebar: path.resolve(__dirname, "runebar.html"),
      },
      external: [
        "electron",
        ...builtinModules,
        // 确保Node.js内置模块被外部化
        ...builtinModules.map((m) => `node:${m}`),
      ],
    },
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
