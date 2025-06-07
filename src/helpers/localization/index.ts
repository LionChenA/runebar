/**
 * Set the application language
 */
export function setLanguage(lang: string): void {
  localStorage.setItem("language", lang)
  document.documentElement.lang = lang
}

/**
 * Get the current application language
 */
export function getLanguage(): string {
  return localStorage.getItem("language") || "en"
}

/**
 * Initialize language
 * This should be called when the application starts
 */
export function initializeLanguage(): void {
  const lang = getLanguage()
  document.documentElement.lang = lang
}
