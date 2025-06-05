/**
 * 窗口类型枚举
 * 定义应用中所有窗口的类型
 */
export enum WindowType {
  MAIN = "main",
  RUNEBAR = "runebar",
}

/**
 * 窗口配置接口
 * 定义窗口通用的配置属性
 */
export interface WindowConfig {
  width: number
  height: number
  minWidth?: number
  minHeight?: number
  position?: {
    x?: number
    y?: number
  }
}

/**
 * Runebar窗口特定配置
 */
export interface RunebarWindowConfig extends WindowConfig {
  memorySaveDelay: number
  transparentBg: string
}
