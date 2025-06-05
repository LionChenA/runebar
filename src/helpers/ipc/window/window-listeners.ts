import { type BrowserWindow, ipcMain } from "electron"
import { RunebarWindowManager } from "./runebar-window-manager"
import {
  WIN_CLOSE_CHANNEL,
  WIN_MAXIMIZE_CHANNEL,
  WIN_MINIMIZE_CHANNEL,
  WIN_RUNEBAR_TOGGLE_CHANNEL,
} from "./window-channels"

export function addWindowEventListeners(mainWindow: BrowserWindow) {
  ipcMain.handle(WIN_MINIMIZE_CHANNEL, () => {
    mainWindow.minimize()
  })
  ipcMain.handle(WIN_MAXIMIZE_CHANNEL, () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })
  ipcMain.handle(WIN_CLOSE_CHANNEL, () => {
    mainWindow.close()
  })

  // 添加Runebar窗口控制
  ipcMain.handle(WIN_RUNEBAR_TOGGLE_CHANNEL, () => {
    const runebarManager = RunebarWindowManager.getInstance(mainWindow)
    runebarManager.toggleWindow()
  })
}
