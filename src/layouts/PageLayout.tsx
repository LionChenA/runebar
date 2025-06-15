import type React from "react"

interface PageLayoutProps {
  children: React.ReactNode
  variant?: "default" | "full-width" | "contained"
  className?: string
}

export default function PageLayout({
  children,
  variant = "default",
  className = "",
}: PageLayoutProps) {
  const getContainerClasses = () => {
    switch (variant) {
      case "full-width":
        return "w-full p-6"
      case "contained":
        return "container mx-auto max-w-4xl p-6"
      default:
        return "container mx-auto max-w-6xl p-6"
    }
  }

  return (
    <main className="flex-1 overflow-auto bg-background">
      <div className={`${getContainerClasses()} ${className} min-h-full`}>{children}</div>
    </main>
  )
}
