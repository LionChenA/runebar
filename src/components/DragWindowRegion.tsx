import { closeWindow, maximizeWindow, minimizeWindow } from "@/helpers/window_helpers"
import React, { type ReactNode } from "react"

interface DragWindowRegionProps {
  title?: ReactNode
}

export default function DragWindowRegion({ title }: DragWindowRegionProps) {
  return (
    <div className="flex w-full items-stretch justify-between h-8 shrink-0">
      <div className="draglayer flex-1">
        {title && (
          <div className="flex flex-1 select-none whitespace-nowrap p-2 text-xs text-gray-400">
            {title}
          </div>
        )}
      </div>
      <WindowButtons />
    </div>
  )
}

function WindowButtons() {
  return (
    <div className="flex no-drag">
      <button
        title="Minimize"
        type="button"
        className="p-3 hover:bg-slate-300 no-drag transition-colors"
        onClick={minimizeWindow}
      >
        <svg aria-hidden="true" role="img" width="14" height="14" viewBox="0 0 12 12">
          <rect fill="currentColor" width="10" height="1.5" x="1" y="5.25" />
        </svg>
      </button>
      <button
        title="Maximize"
        type="button"
        className="p-3 hover:bg-slate-300 no-drag transition-colors"
        onClick={maximizeWindow}
      >
        <svg aria-hidden="true" role="img" width="14" height="14" viewBox="0 0 12 12">
          <rect
            width="8.5"
            height="8.5"
            x="1.75"
            y="1.75"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
      <button
        type="button"
        title="Close"
        className="p-3 hover:bg-red-300 no-drag transition-colors"
        onClick={closeWindow}
      >
        <svg aria-hidden="true" role="img" width="14" height="14" viewBox="0 0 12 12">
          <polygon
            fill="currentColor"
            fillRule="evenodd"
            points="10.5 2.076 6.583 6 10.5 9.924 9.924 10.5 6 6.583 2.076 10.5 1.5 9.924 5.417 6 1.5 2.076 2.076 1.5 6 5.417 9.924 1.5"
            strokeWidth="0.5"
          />
        </svg>
      </button>
    </div>
  )
}
