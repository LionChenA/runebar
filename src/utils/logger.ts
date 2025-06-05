/**
 * 日志模块
 * 提供统一的日志记录接口，支持不同级别的日志和自定义标签
 */

type LogLevel = "debug" | "info" | "warn" | "error"

interface LogOptions {
  showTimestamp?: boolean
}

const defaultOptions: LogOptions = {
  showTimestamp: true,
}

/**
 * 格式化日志消息
 * @param level 日志级别
 * @param tag 日志标签
 * @param message 日志消息
 * @param options 日志选项
 * @returns 格式化后的日志消息
 */
function formatLogMessage(
  level: LogLevel,
  tag: string,
  message: string,
  options: LogOptions = defaultOptions,
): string {
  const timestamp = options.showTimestamp ? `[${new Date().toISOString()}]` : ""
  return `${timestamp}[${level.toUpperCase()}][${tag}] ${message}`
}

/**
 * 日志类
 */
export class Logger {
  private tag: string
  private options: LogOptions

  /**
   * 创建Logger实例
   * @param tag 日志标签
   * @param options 日志选项
   */
  constructor(tag: string, options: LogOptions = defaultOptions) {
    this.tag = tag
    this.options = { ...defaultOptions, ...options }
  }

  /**
   * 记录调试级别日志
   * @param message 日志消息
   */
  debug(message: string): void {
    if (process.env.NODE_ENV === "development") {
      console.debug(formatLogMessage("debug", this.tag, message, this.options))
    }
  }

  /**
   * 记录信息级别日志
   * @param message 日志消息
   */
  info(message: string): void {
    console.info(formatLogMessage("info", this.tag, message, this.options))
  }

  /**
   * 记录警告级别日志
   * @param message 日志消息
   */
  warn(message: string): void {
    console.warn(formatLogMessage("warn", this.tag, message, this.options))
  }

  /**
   * 记录错误级别日志
   * @param message 日志消息
   * @param error 错误对象（可选）
   */
  error(message: string, error?: unknown): void {
    console.error(formatLogMessage("error", this.tag, message, this.options))
    if (error) {
      console.error(error)
    }
  }
}

/**
 * 创建Logger实例
 * @param tag 日志标签
 * @param options 日志选项
 * @returns Logger实例
 */
export function createLogger(tag: string, options?: LogOptions): Logger {
  return new Logger(tag, options)
}
