import {
  WIN_CLOSE_CHANNEL,
  WIN_MAXIMIZE_CHANNEL,
  WIN_MINIMIZE_CHANNEL,
  WIN_RUNEBAR_TOGGLE_CHANNEL,
} from "./window-channels"

export function exposeWindowContext() {
  const { contextBridge, ipcRenderer } = window.require("electron")
  contextBridge.exposeInMainWorld("electronWindow", {
    minimize: () => ipcRenderer.invoke(WIN_MINIMIZE_CHANNEL),
    maximize: () => ipcRenderer.invoke(WIN_MAXIMIZE_CHANNEL),
    close: () => ipcRenderer.invoke(WIN_CLOSE_CHANNEL),
    toggleRunebar: () => ipcRenderer.invoke(WIN_RUNEBAR_TOGGLE_CHANNEL),
  })
}
