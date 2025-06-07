import { type Model, useDataStore } from "@/store"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

/**
 * Message type for LLM chat
 */
export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

/**
 * Options for the useLlm hook
 */
interface UseLlmOptions {
  modelId?: string
  systemPrompt?: string
}

/**
 * Hook for interacting with LLMs
 * Provides methods to send messages, and manages loading and error states
 */
export function useLlm({ modelId, systemPrompt }: UseLlmOptions = {}) {
  // Initialize messages with system prompt if provided
  const [messages, setMessages] = useState<ChatMessage[]>(
    systemPrompt ? [{ role: "system", content: systemPrompt }] : [],
  )

  // Get model configuration from data store
  const { getModelById, getDefaultModel } = useDataStore()
  const model = modelId ? getModelById(modelId) : getDefaultModel()

  // Throw error if no model is available
  if (!model) {
    throw new Error("No model available. Please add a model in settings.")
  }

  // Mutation for sending messages to LLM
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (userMessage: string) => {
      // Add user message to history
      const userMsg: ChatMessage = { role: "user", content: userMessage }
      setMessages((prev) => [...prev, userMsg])

      // Call LLM API (this is a simulated response for example)
      const response = await simulateLlmResponse(model, [...messages, userMsg])

      // Add assistant response to history
      const assistantMsg: ChatMessage = { role: "assistant", content: response }
      setMessages((prev) => [...prev, assistantMsg])

      return response
    },
  })

  // Clear chat history
  const clearMessages = () => {
    setMessages(systemPrompt ? [{ role: "system", content: systemPrompt }] : [])
  }

  return {
    sendMessage: mutateAsync,
    messages,
    clearMessages,
    isLoading: isPending,
    error,
  }
}

/**
 * Simulate LLM response (only for demonstration)
 * In a real implementation, this would call the appropriate API
 */
async function simulateLlmResponse(model: Model, messages: ChatMessage[]): Promise<string> {
  // In a real implementation, this would call the appropriate API
  // based on model.provider (OpenAI, Anthropic, Google, etc.)

  // Simulate 1-second delay and return a mock response
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const lastMessage = messages[messages.length - 1]
  return `This is a simulated response from ${model.name} to: "${lastMessage.content}"`
}
