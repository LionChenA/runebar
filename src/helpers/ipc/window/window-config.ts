/**
 * 窗口配置常量
 * 集中管理所有窗口相关的配置参数
 */

// Runebar窗口配置
export const RUNEBAR_WINDOW_CONFIG = {
  WIDTH: 600,
  HEIGHT: 400,
  POSITION_Y: 100, // 距离屏幕顶部的距离
  MEMORY_SAVE_DELAY: 60000, // 60秒后销毁窗口以节省内存
  TRANSPARENT_BG: "#00000000", // 完全透明背景
}

// 主窗口配置可以在这里添加
export const MAIN_WINDOW_CONFIG = {
  MIN_WIDTH: 800,
  MIN_HEIGHT: 600,
}

// 窗口类型
export enum WindowType {
  MAIN = "main",
  RUNEBAR = "runebar",
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
