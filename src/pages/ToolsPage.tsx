import React from "react"

export default function ToolsPage() {
  console.log("ToolsPage rendering")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tools</h1>
      <p className="text-muted-foreground">
        Tools management page. Here you can configure and manage your tools.
      </p>
      <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 rounded">
        <p className="text-sm">Debug: ToolsPage is rendering correctly</p>
      </div>
    </div>
  )
}
