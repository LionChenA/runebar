import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLlm } from "@/hooks"
import { useAppStore, useDataStore, useSettingsStore } from "@/store"
import { useState } from "react"

/**
 * StateDemo - Demonstrates the state management capabilities
 * This component showcases the usage of all stores and hooks
 */
export function StateDemo() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">State Management Demo</h1>

      <Tabs defaultValue="app">
        <TabsList className="mb-4">
          <TabsTrigger value="app">App Store</TabsTrigger>
          <TabsTrigger value="settings">Settings Store</TabsTrigger>
          <TabsTrigger value="data">Data Store</TabsTrigger>
          <TabsTrigger value="llm">LLM API</TabsTrigger>
        </TabsList>

        <TabsContent value="app">
          <AppStoreDemo />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsStoreDemo />
        </TabsContent>

        <TabsContent value="data">
          <DataStoreDemo />
        </TabsContent>

        <TabsContent value="llm">
          <LlmDemo />
        </TabsContent>
      </Tabs>
    </div>
  )
}

/**
 * AppStoreDemo - Demonstrates the App Store
 */
function AppStoreDemo() {
  const {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    activeView,
    setActiveView,
    selectedListId,
    setSelectedListId,
  } = useAppStore()

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">App Store Demo</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="sidebar-toggle">Sidebar</Label>
          <Switch id="sidebar-toggle" checked={sidebarOpen} onCheckedChange={setSidebarOpen} />
          <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
        </div>

        <div className="space-y-2">
          <Label>Active View</Label>
          <div className="flex flex-wrap gap-2">
            {(["history", "prompts", "models", "tools", "playground", "settings"] as const).map(
              (view) => (
                <Button
                  key={view}
                  variant={activeView === view ? "default" : "outline"}
                  onClick={() => setActiveView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Button>
              ),
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="list-id">Selected List ID</Label>
          <div className="flex gap-2">
            <Input
              id="list-id"
              value={selectedListId || ""}
              onChange={(e) => setSelectedListId(e.target.value || null)}
              placeholder="Enter list ID"
            />
            <Button variant="outline" onClick={() => setSelectedListId(null)}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

/**
 * SettingsStoreDemo - Demonstrates the Settings Store
 */
function SettingsStoreDemo() {
  const { theme, setTheme, toggleTheme, language, setLanguage, autoSave, toggleAutoSave } =
    useSettingsStore()

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Settings Store Demo</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Theme</Label>
          <div className="flex flex-wrap gap-2">
            {(["light", "dark", "system"] as const).map((t) => (
              <Button
                key={t}
                variant={theme === t ? "default" : "outline"}
                onClick={() => setTheme(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Button>
            ))}
            <Button onClick={toggleTheme}>Toggle Light/Dark</Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <div className="flex gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Label htmlFor="auto-save">Auto Save</Label>
          <Switch id="auto-save" checked={autoSave} onCheckedChange={toggleAutoSave} />
        </div>
      </div>
    </Card>
  )
}

/**
 * DataStoreDemo - Demonstrates the Data Store
 */
function DataStoreDemo() {
  const { models, addModel, deleteModel, setDefaultModel, prompts, addPrompt, deletePrompt } =
    useDataStore()

  const [modelName, setModelName] = useState("")
  const [promptName, setPromptName] = useState("")
  const [promptContent, setPromptContent] = useState("")

  const handleAddModel = () => {
    if (!modelName) return

    addModel({
      name: modelName,
      provider: "openai",
      parameters: {
        temperature: 0.7,
        maxTokens: 2048,
      },
    })

    setModelName("")
  }

  const handleAddPrompt = () => {
    if (!promptName || !promptContent) return

    addPrompt({
      name: promptName,
      content: promptContent,
      tags: ["demo"],
    })

    setPromptName("")
    setPromptContent("")
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Data Store Demo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Models</h3>

          <div className="flex gap-2">
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Model name"
            />
            <Button onClick={handleAddModel}>Add</Button>
          </div>

          <div className="space-y-2">
            {models.length === 0 ? (
              <p className="text-muted-foreground">No models added yet</p>
            ) : (
              models.map((model) => (
                <div
                  key={model.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span>
                    {model.name}
                    {model.isDefault && " (Default)"}
                  </span>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setDefaultModel(model.id)}>
                      Set Default
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteModel(model.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Prompts</h3>

          <div className="space-y-2">
            <Input
              value={promptName}
              onChange={(e) => setPromptName(e.target.value)}
              placeholder="Prompt name"
            />
            <textarea
              value={promptContent}
              onChange={(e) => setPromptContent(e.target.value)}
              placeholder="Prompt content"
              className="w-full p-2 border rounded min-h-[100px]"
            />
            <Button onClick={handleAddPrompt}>Add Prompt</Button>
          </div>

          <div className="space-y-2">
            {prompts.length === 0 ? (
              <p className="text-muted-foreground">No prompts added yet</p>
            ) : (
              prompts.map((prompt) => (
                <div key={prompt.id} className="p-2 border rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{prompt.name}</span>
                    <Button size="sm" variant="destructive" onClick={() => deletePrompt(prompt.id)}>
                      Delete
                    </Button>
                  </div>
                  <p className="text-sm truncate">{prompt.content}</p>
                  <div className="mt-1 flex gap-1 flex-wrap">
                    {prompt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-primary-100 text-primary-800 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

/**
 * LlmDemo - Demonstrates the LLM API hook
 */
function LlmDemo() {
  const [inputText, setInputText] = useState("")

  // Get default model from data store
  const { getDefaultModel, models, addModel } = useDataStore()
  const defaultModel = getDefaultModel()

  // Add a demo model if none exists
  if (models.length === 0) {
    addModel({
      name: "Demo Model",
      provider: "openai",
      parameters: { temperature: 0.7 },
      isDefault: true,
    })
  }

  // Use the LLM hook
  const { sendMessage, messages, clearMessages, isLoading, error } = useLlm({
    systemPrompt: "You are a helpful assistant.",
  })

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return

    try {
      await sendMessage(inputText)
      setInputText("")
    } catch (err) {
      console.error("Failed to send message:", err)
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">LLM API Demo</h2>
        <Button variant="outline" onClick={clearMessages}>
          Clear Chat
        </Button>
      </div>

      {/* Display current model */}
      <div className="mb-4 p-2 border rounded">
        <Label>Using Model:</Label>
        <p>{defaultModel ? defaultModel.name : "No default model set"}</p>
      </div>

      {/* Messages */}
      <div className="border rounded p-4 h-[300px] overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Send a message to start the conversation
          </p>
        ) : (
          messages.map(
            (msg, index) =>
              msg.role !== "system" && (
                <div
                  key={`${msg.role}-${index}-${msg.content.substring(0, 10)}`}
                  className={`p-3 rounded ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground ml-12"
                      : "bg-muted mr-12"
                  }`}
                >
                  {msg.content}
                </div>
              ),
          )
        )}

        {isLoading && <div className="p-3 rounded bg-muted mr-12 animate-pulse">Thinking...</div>}

        {error && (
          <div className="p-3 rounded bg-destructive text-destructive-foreground">
            Error: {error.message}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading || !inputText.trim()}>
          Send
        </Button>
      </div>
    </Card>
  )
}
