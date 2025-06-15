import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  updateAutoSave,
  updateFontFamily,
  updateFontSize,
  updateLanguage,
  updateTheme,
} from "@/helpers/settings"
import type { ThemeMode } from "@/helpers/theme"
import { useConfigRegistry } from "@/store/config-registry"
import { ConfigDomain, type ConfigItem, type SelectOption } from "@/types/settings"
import { useCallback } from "react"

// Helper type for UI rendering
interface SettingItemWithOptions extends Omit<ConfigItem, "description"> {
  options?: SelectOption[]
  description?: string
  value: string | number | boolean
}

/**
 * Settings Page - Component for managing application settings
 */
export function SettingsPage() {
  // Get configuration categories and items
  const generalItems = useConfigRegistry((state) =>
    state.getAllItems(ConfigDomain.GENERAL),
  ) as Record<string, Record<string, SettingItemWithOptions>>

  // Handlers for updating settings
  const handleThemeChange = useCallback((value: string) => {
    updateTheme(value as ThemeMode)
  }, [])

  const handleFontFamilyChange = useCallback((value: string) => {
    updateFontFamily(value)
  }, [])

  const handleFontSizeChange = useCallback((value: number[]) => {
    updateFontSize(value[0])
  }, [])

  const handleLanguageChange = useCallback((value: string) => {
    updateLanguage(value)
  }, [])

  const handleAutoSaveChange = useCallback((checked: boolean) => {
    updateAutoSave(checked)
  }, [])

  // Get appearance settings
  const appearanceItems = generalItems?.appearance || {}
  const themeItem = appearanceItems?.theme
  const fontFamilyItem = appearanceItems?.fontFamily
  const fontSizeItem = appearanceItems?.fontSize

  // Get language settings
  const languageItems = generalItems?.language || {}
  const languageItem = languageItems?.language

  // Get behavior settings
  const behaviorItems = generalItems?.behavior || {}
  const autoSaveItem = behaviorItems?.autoSave

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Setting */}
              {themeItem && (
                <div className="space-y-2">
                  <Label htmlFor="theme">{themeItem.label}</Label>
                  <Select
                    defaultValue={themeItem.value as string}
                    onValueChange={handleThemeChange}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themeItem.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {themeItem.description && (
                    <p className="text-sm text-muted-foreground">{String(themeItem.description)}</p>
                  )}
                </div>
              )}

              {/* Font Family Setting */}
              {fontFamilyItem && (
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">{fontFamilyItem.label}</Label>
                  <Select
                    defaultValue={fontFamilyItem.value as string}
                    onValueChange={handleFontFamilyChange}
                  >
                    <SelectTrigger id="fontFamily">
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilyItem.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fontFamilyItem.description && (
                    <p className="text-sm text-muted-foreground">
                      {String(fontFamilyItem.description)}
                    </p>
                  )}
                </div>
              )}

              {/* Font Size Setting */}
              {fontSizeItem && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="fontSize">{fontSizeItem.label}</Label>
                    <span className="text-sm">{fontSizeItem.value}px</span>
                  </div>
                  <Slider
                    id="fontSize"
                    defaultValue={[fontSizeItem.value as number]}
                    min={10}
                    max={24}
                    step={1}
                    onValueChange={handleFontSizeChange}
                  />
                  {fontSizeItem.description && (
                    <p className="text-sm text-muted-foreground">
                      {String(fontSizeItem.description)}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Settings */}
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
              <CardDescription>Configure language and localization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Setting */}
              {languageItem && (
                <div className="space-y-2">
                  <Label htmlFor="language">{languageItem.label}</Label>
                  <Select
                    defaultValue={languageItem.value as string}
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageItem.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {languageItem.description && (
                    <p className="text-sm text-muted-foreground">
                      {String(languageItem.description)}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Behavior Settings */}
        <TabsContent value="behavior">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Settings</CardTitle>
              <CardDescription>Configure application behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Auto Save Setting */}
              {autoSaveItem && (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSave">{autoSaveItem.label}</Label>
                    {autoSaveItem.description && (
                      <p className="text-sm text-muted-foreground">
                        {String(autoSaveItem.description)}
                      </p>
                    )}
                  </div>
                  <Switch
                    id="autoSave"
                    checked={autoSaveItem.value as boolean}
                    onCheckedChange={handleAutoSaveChange}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
