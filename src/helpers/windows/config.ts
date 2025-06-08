/**
 * 窗口配置
 * 集中管理所有窗口相关的配置参数
 */
import type { RunebarWindowConfig, WindowConfig } from "./types"
import { WindowType } from "./types"

// Runebar窗口配置
export const RUNEBAR_WINDOW_CONFIG: RunebarWindowConfig = {
  width: 600,
  height: 400,
  position: {
    y: 100, // 距离屏幕顶部的距离
  },
  memorySaveDelay: 60000, // 60秒后销毁窗口以节省内存
  transparentBg: "#1A1A1A80", // 半透明深色背景（深色模式友好）
}

// 主窗口配置
export const MAIN_WINDOW_CONFIG: WindowConfig = {
  width: 800,
  height: 600,
  minWidth: 800,
  minHeight: 600,
}

// 获取窗口HTML页面名称
export function getWindowHtmlFilename(type: WindowType): string {
  switch (type) {
    case WindowType.MAIN:
      return "index.html"
    case WindowType.RUNEBAR:
      return "runebar.html"
    default:
      return "index.html"
  }
}
