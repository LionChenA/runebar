import { Input } from "@/components/ui/input"
/**
 * ConfigItemRenderer component - Renders different types of configuration items
 */
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
import type { ConfigItem } from "@/types/settings"
import * as React from "react"

interface ConfigItemRendererProps {
  item: ConfigItem
  onChange: (value: unknown) => void
}

export default function ConfigItemRenderer({ item, onChange }: ConfigItemRendererProps) {
  if (item.hidden) {
    return null
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor={item.id}>{item.label}</Label>
          {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
        </div>
        {renderControl(item, onChange)}
      </div>
    </div>
  )
}

function renderControl(item: ConfigItem, onChange: (value: unknown) => void) {
  switch (item.type) {
    case "boolean":
      return (
        <Switch
          id={item.id}
          checked={Boolean(item.value)}
          onCheckedChange={onChange}
          disabled={item.disabled}
        />
      )

    case "string":
      return (
        <Input
          id={item.id}
          value={String(item.value)}
          onChange={(e) => onChange(e.target.value)}
          disabled={item.disabled}
          className="max-w-xs"
        />
      )

    case "number":
      return (
        <Input
          id={item.id}
          type="number"
          value={Number(item.value)}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={item.disabled}
          className="w-24"
        />
      )

    case "select":
      return (
        <Select value={String(item.value)} onValueChange={onChange} disabled={item.disabled}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {item.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "slider": {
      const valueNum = Number(item.value)
      return (
        <div className="flex items-center space-x-2 w-60">
          <Slider
            id={item.id}
            value={[valueNum]}
            onValueChange={(values) => onChange(values[0])}
            disabled={item.disabled}
            max={100}
            step={1}
          />
          <span className="w-12 text-center">{valueNum}</span>
        </div>
      )
    }

    default:
      return <div className="text-sm text-muted-foreground">Unsupported type: {item.type}</div>
  }
}
