import { cn } from "@/utils/tailwind"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type * as React from "react"

const runebarContainerVariants = cva(
  "w-full overflow-hidden transition-colors duration-300 ease-in-out",
  {
    variants: {
      size: {
        default: "max-w-xl",
        sm: "max-w-md",
        lg: "max-w-2xl",
        full: "max-w-full",
      },
      appearance: {
        default: "rounded-lg shadow-lg border border-border bg-background",
        minimal: "bg-transparent border-none shadow-none",
        outlined: "rounded-lg border border-border bg-transparent",
      },
    },
    defaultVariants: {
      size: "default",
      appearance: "default",
    },
  },
)

export interface RunebarContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof runebarContainerVariants> {}

export function RunebarContainer({
  className,
  size,
  appearance,
  children,
  ...props
}: RunebarContainerProps) {
  return (
    <div className={cn(runebarContainerVariants({ size, appearance, className }))} {...props}>
      {children}
    </div>
  )
}
