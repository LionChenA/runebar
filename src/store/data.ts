import { v4 as uuidv4 } from "uuid"
import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * Model definition - Represents an LLM model configuration
 */
export interface Model {
  id: string
  name: string
  provider: string // 'openai', 'anthropic', 'google', etc.
  apiKey?: string // Sensitive information that won't be persisted
  parameters: Record<string, unknown> // Different parameters for different models
  isDefault?: boolean
}

/**
 * Prompt definition - Represents a saved prompt template
 */
export interface Prompt {
  id: string
  name: string
  content: string
  tags: string[]
  createdAt: number
  updatedAt: number
}

/**
 * Data state - Manages application data like models, prompts, etc.
 */
type DataState = {
  // State data
  models: Model[]
  prompts: Prompt[]

  // Model operations
  addModel: (model: Omit<Model, "id">) => string
  updateModel: (id: string, model: Partial<Omit<Model, "id">>) => void
  deleteModel: (id: string) => void
  getModelById: (id: string) => Model | undefined
  getDefaultModel: () => Model | undefined
  setDefaultModel: (id: string) => void

  // Prompt operations
  addPrompt: (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt">) => string
  updatePrompt: (
    id: string,
    prompt: Partial<Omit<Prompt, "id" | "createdAt" | "updatedAt">>,
  ) => void
  deletePrompt: (id: string) => void
  getPromptById: (id: string) => Prompt | undefined
}

/**
 * Data store - Manages application data
 */
export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      // Initial state
      models: [],
      prompts: [],

      // Model operations
      addModel: (model) => {
        const id = uuidv4()
        set((state) => ({
          models: [...state.models, { ...model, id }],
        }))
        return id
      },

      updateModel: (id, model) => {
        set((state) => ({
          models: state.models.map((m) => (m.id === id ? { ...m, ...model } : m)),
        }))
      },

      deleteModel: (id) => {
        set((state) => ({
          models: state.models.filter((m) => m.id !== id),
        }))
      },

      getModelById: (id) => {
        return get().models.find((m) => m.id === id)
      },

      getDefaultModel: () => {
        return get().models.find((m) => m.isDefault)
      },

      setDefaultModel: (id) => {
        set((state) => ({
          models: state.models.map((m) => ({
            ...m,
            isDefault: m.id === id,
          })),
        }))
      },

      // Prompt operations
      addPrompt: (prompt) => {
        const id = uuidv4()
        const now = Date.now()
        set((state) => ({
          prompts: [
            ...state.prompts,
            {
              ...prompt,
              id,
              createdAt: now,
              updatedAt: now,
            },
          ],
        }))
        return id
      },

      updatePrompt: (id, prompt) => {
        set((state) => ({
          prompts: state.prompts.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...prompt,
                  updatedAt: Date.now(),
                }
              : p,
          ),
        }))
      },

      deletePrompt: (id) => {
        set((state) => ({
          prompts: state.prompts.filter((p) => p.id !== id),
        }))
      },

      getPromptById: (id) => {
        return get().prompts.find((p) => p.id === id)
      },
    }),
    {
      name: "runebar-data",
      partialize: (state) => ({
        // Filter out sensitive information, don't persist API keys to localStorage
        models: state.models.map(({ apiKey, ...rest }) => rest),
        prompts: state.prompts,
      }),
    },
  ),
)
