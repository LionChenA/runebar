import { Button } from "@/components/ui/button"
import { toggleTheme } from "@/helpers/theme_helpers"
import { Moon } from "lucide-react"
import React from "react"

export default function ToggleTheme() {
  return (
    <Button onClick={toggleTheme} size="icon">
      <Moon size={16} />
    </Button>
  )
}
