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
  // 配置多页应用，为每个窗口提供单独的入口点
  build: {
    rollupOptions: {
      input: {
        // Multi-entry configuration for Electron app:
        // - Defines separate entry points for different windows/pages
        // - Each entry generates its own JS bundle for optimized loading
        // - In development, these become accessible routes (e.g., /main, /runebar)
        // - In production, creates separate HTML files for each window
        // - Enables MPA architecture instead of SPA for better separation of concerns
        main: path.resolve(__dirname, "index.html"),
        runebar: path.resolve(__dirname, "runebar.html"),
      },
    },
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
