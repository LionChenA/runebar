/**
 * 检测当前平台
 * @returns 当前平台类型：'mac', 'windows', 或 'linux'
 */
export function detectPlatform(): "mac" | "windows" | "linux" {
  const platform = navigator.platform.toLowerCase()

  if (platform.includes("mac")) {
    return "mac"
  }

  if (platform.includes("win")) {
    return "windows"
  }

  return "linux"
}

/**
 * 检查当前是否为Mac平台
 */
export function isMacPlatform(): boolean {
  return detectPlatform() === "mac"
}

/**
 * 检查当前是否为Windows平台
 */
export function isWindowsPlatform(): boolean {
  return detectPlatform() === "windows"
}

/**
 * 检查当前是否为Linux平台
 */
export function isLinuxPlatform(): boolean {
  return detectPlatform() === "linux"
}
