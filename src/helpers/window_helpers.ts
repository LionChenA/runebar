/**
 * 最小化当前窗口
 */
export async function minimizeWindow() {
  await window.electronWindow.minimize()
}

/**
 * 最大化当前窗口
 */
export async function maximizeWindow() {
  await window.electronWindow.maximize()
}

/**
 * 关闭当前窗口
 */
export async function closeWindow() {
  await window.electronWindow.close()
}

/**
 * 切换Runebar窗口的显示状态
 */
export async function toggleRunebarWindow() {
  await window.electronWindow.toggleRunebar()
}
