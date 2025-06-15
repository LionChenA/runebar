import { exposeSettingsContext } from "./settings/settings-context"
import { exposeShortcutContext } from "./shortcut/shortcut-context"
import { exposeThemeContext } from "./theme/theme-context"
import { exposeWindowContext } from "./window/window-context"

export default function exposeContexts() {
  exposeWindowContext()
  exposeThemeContext()
  exposeShortcutContext()
  exposeSettingsContext()
}
