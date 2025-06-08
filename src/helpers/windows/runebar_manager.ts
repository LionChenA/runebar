import path from "node:path"
import { createLogger } from "@/utils/logger"
import { BrowserWindow, app, screen } from "electron"
import { RUNEBAR_WINDOW_CONFIG, getWindowHtmlFilename } from "./config"
import { WindowType } from "./types"

// 声明在全局环境下可用的变量，由Electron Forge注入
declare const RUNEBAR_WINDOW_VITE_DEV_SERVER_URL: string | undefined
declare const RUNEBAR_WINDOW_VITE_NAME: string | undefined

/**
 * Runebar窗口管理器
 * 负责创建、显示、隐藏和销毁Runebar窗口
 */
export class RunebarWindowManager {
  private static instance: RunebarWindowManager | null = null
  private runebarWindow: BrowserWindow | null = null
  private mainWindow: BrowserWindow | null = null
  private inDevelopment: boolean
  private readonly MEMORY_SAVE_DELAY = RUNEBAR_WINDOW_CONFIG.memorySaveDelay
  private memorySaveTimer: NodeJS.Timeout | null = null
  private logger = createLogger("RunebarWindowManager")

  private constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
    this.inDevelopment = process.env.NODE_ENV === "development"
    this.logger.info(`Initialized with development mode: ${this.inDevelopment}`)

    app.on("before-quit", () => {
      this.destroyWindow()
    })
  }

  /**
   * 获取RunebarWindowManager实例
   * @param mainWindow 主窗口实例
   */
  public static getInstance(mainWindow?: BrowserWindow): RunebarWindowManager {
    if (!RunebarWindowManager.instance && mainWindow) {
      RunebarWindowManager.instance = new RunebarWindowManager(mainWindow)
    }
    return RunebarWindowManager.instance!
  }

  /**
   * 获取Runebar窗口的URL
   * 在开发模式下，返回指向runebar.html的URL
   * 在生产模式下，返回文件路径
   */
  private getRunebarUrl(): { isFile: boolean; url: string } {
    if (RUNEBAR_WINDOW_VITE_DEV_SERVER_URL) {
      // 开发模式：修改URL以指向runebar.html
      const runebarUrl = new URL(RUNEBAR_WINDOW_VITE_DEV_SERVER_URL)
      runebarUrl.pathname = `/${getWindowHtmlFilename(WindowType.RUNEBAR)}`
      return { isFile: false, url: runebarUrl.toString() }
    }

    // 生产模式：使用文件路径
    const htmlPath = path.join(
      __dirname,
      `../renderer/${RUNEBAR_WINDOW_VITE_NAME}/${getWindowHtmlFilename(WindowType.RUNEBAR)}`,
    )
    return { isFile: true, url: htmlPath }
  }

  /**
   * 创建Runebar窗口
   */
  public createWindow(): void {
    if (this.runebarWindow) {
      this.logger.info("Window already exists, skipping creation")
      return
    }

    this.logger.info("Creating Runebar window")

    // 获取屏幕尺寸
    const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize

    // 窗口配置
    this.runebarWindow = new BrowserWindow({
      width: RUNEBAR_WINDOW_CONFIG.width,
      height: RUNEBAR_WINDOW_CONFIG.height,
      show: false,
      frame: false,
      resizable: false,
      movable: true,
      transparent: true,
      backgroundColor: RUNEBAR_WINDOW_CONFIG.transparentBg,
      opacity: 1.0, // 完全不透明
      alwaysOnTop: true,
      skipTaskbar: true,
      webPreferences: {
        devTools: this.inDevelopment,
        contextIsolation: true,
        nodeIntegration: true,
        nodeIntegrationInSubFrames: false,
        preload: path.join(__dirname, "preload.js"),
      },
    })

    this.logger.info(`Created window with background color: ${RUNEBAR_WINDOW_CONFIG.transparentBg}`)

    // 窗口定位 - 居中
    this.runebarWindow.setPosition(
      Math.floor(screenWidth / 2 - RUNEBAR_WINDOW_CONFIG.width / 2),
      RUNEBAR_WINDOW_CONFIG.position?.y || 100,
    )

    // 加载窗口内容
    const { isFile, url } = this.getRunebarUrl()
    this.logger.info(`Loading ${isFile ? "from file" : "from URL"}: ${url}`)

    if (isFile) {
      this.runebarWindow.loadFile(url)
    } else {
      this.runebarWindow.loadURL(url)
    }

    // 窗口事件监听
    this.runebarWindow.on("blur", () => {
      this.hideWindow()
    })

    this.runebarWindow.on("closed", () => {
      this.logger.info("Window closed")
      this.runebarWindow = null
    })

    // 默认不显示开发者工具
    // if (this.inDevelopment) {
    //   this.logger.debug("Opening DevTools for debugging")
    //   this.runebarWindow.webContents.openDevTools({ mode: "detach" })
    // }

    // 监听窗口加载完成事件
    this.runebarWindow.webContents.on("did-finish-load", () => {
      this.logger.info("Window content loaded successfully")
      this.logger.debug(`Current URL: ${this.runebarWindow?.webContents.getURL()}`)
    })

    // 监听加载失败事件
    this.runebarWindow.webContents.on("did-fail-load", (_event, errorCode, errorDescription) => {
      this.logger.error(`Failed to load: ${errorDescription} (${errorCode})`)
    })
  }

  /**
   * 显示Runebar窗口
   */
  public showWindow(): void {
    if (!this.runebarWindow) {
      this.logger.info("Window does not exist, creating new window")
      this.createWindow()
    }

    // 清除可能存在的内存节省计时器
    if (this.memorySaveTimer) {
      clearTimeout(this.memorySaveTimer)
      this.memorySaveTimer = null
    }

    // 确保窗口位于前面
    this.logger.info("Showing window")
    this.runebarWindow!.show()
    this.runebarWindow!.focus()
  }

  /**
   * 隐藏Runebar窗口
   */
  public hideWindow(): void {
    if (this.runebarWindow) {
      this.logger.info("Hiding window")
      this.runebarWindow.hide()

      // 设置计时器，一段时间不用后销毁窗口以节省内存
      if (!this.memorySaveTimer) {
        this.logger.debug("Setting memory save timer")
        this.memorySaveTimer = setTimeout(() => {
          this.logger.info("Memory save timer triggered, destroying window")
          this.destroyWindow()
          this.memorySaveTimer = null
        }, this.MEMORY_SAVE_DELAY)
      }
    }
  }

  /**
   * 切换Runebar窗口的显示状态
   */
  public toggleWindow(): void {
    if (!this.runebarWindow) {
      this.logger.info("Toggle: Window does not exist, creating and showing")
      this.createWindow()
      this.showWindow()
      return
    }

    if (this.runebarWindow.isVisible()) {
      this.logger.info("Toggle: Window is visible, hiding")
      this.hideWindow()
    } else {
      this.logger.info("Toggle: Window is hidden, showing")
      this.showWindow()
    }
  }

  /**
   * 销毁Runebar窗口
   */
  public destroyWindow(): void {
    if (this.runebarWindow) {
      this.logger.info("Destroying window")
      this.runebarWindow.destroy()
      this.runebarWindow = null
    }
  }

  /**
   * 获取Runebar窗口实例
   */
  public getWindow(): BrowserWindow | null {
    return this.runebarWindow
  }
}
