// "electron-squirrel-startup" seems broken when packaging with vite
//import started from "electron-squirrel-startup";
import path from "node:path"
import { BrowserWindow, app } from "electron"
import { REACT_DEVELOPER_TOOLS, installExtension } from "electron-devtools-installer"
import registerListeners from "./helpers/ipc/listeners-register"
import { ShortcutManager } from "./helpers/ipc/shortcut/shortcut-manager"
import { RunebarWindowManager } from "./helpers/ipc/window/runebar-window-manager"

// 声明在全局环境下可用的变量，由Electron Forge注入
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined
declare const MAIN_WINDOW_VITE_NAME: string | undefined

const inDevelopment = process.env.NODE_ENV === "development"

function createWindow() {
  const preload = path.join(__dirname, "preload.js")
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: inDevelopment,
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,
      preload: preload,
    },
    titleBarStyle: "hidden",
  })
  registerListeners(mainWindow)
  ShortcutManager.getInstance().init(mainWindow)

  // 初始化RunebarWindowManager
  const runebarManager = RunebarWindowManager.getInstance(mainWindow)
  // 预创建窗口但不显示
  runebarManager.createWindow()

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }
}

async function installExtensions() {
  try {
    const result = await installExtension(REACT_DEVELOPER_TOOLS)
    console.log(`Extensions installed successfully: ${result.name}`)
  } catch {
    console.error("Failed to install extensions")
  }
}

app.whenReady().then(createWindow).then(installExtensions)

//osX only
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
//osX only ends
