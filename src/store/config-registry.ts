import type { ConfigCategory, ConfigItem } from "@/types/settings"
/**
 * Config Registry - Centralized system for managing application configurations
 */
import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * Config Registry State
 */
type ConfigRegistryState = {
  // Configuration categories
  categories: Record<string, ConfigCategory>

  // Configuration items organized by category
  items: Record<string, Record<string, ConfigItem>>

  // Methods for managing categories
  registerCategory: (id: string, category: ConfigCategory) => void
  getCategory: (id: string) => ConfigCategory | undefined
  getAllCategories: () => Record<string, ConfigCategory>

  // Methods for managing configuration items
  registerItem: (categoryId: string, id: string, item: ConfigItem) => void
  getItem: (categoryId: string, id: string) => ConfigItem | undefined
  updateItemValue: (categoryId: string, id: string, value: unknown) => void
  getAllItems: (
    categoryId?: string,
  ) => Record<string, Record<string, ConfigItem>> | Record<string, ConfigItem>
  resetItem: (categoryId: string, id: string) => void

  // Import/Export methods
  exportConfig: () => Record<string, unknown>
  importConfig: (config: Record<string, unknown>) => void
}

/**
 * Config Registry Store - Manages configuration categories and items
 */
export const useConfigRegistry = create<ConfigRegistryState>()(
  persist(
    (set, get) => ({
      // Initial state
      categories: {},
      items: {},

      // Category management methods
      registerCategory: (id, category) =>
        set((state) => ({
          categories: { ...state.categories, [id]: category },
        })),

      getCategory: (id) => {
        const state = get()
        return state.categories[id]
      },

      getAllCategories: () => {
        const state = get()
        return state.categories
      },

      // Item management methods
      registerItem: (categoryId, id, item) =>
        set((state) => {
          // Create category if it doesn't exist
          if (!state.items[categoryId]) {
            return {
              items: {
                ...state.items,
                [categoryId]: {
                  [id]: item,
                },
              },
            }
          }

          // Add or update item in existing category
          return {
            items: {
              ...state.items,
              [categoryId]: {
                ...state.items[categoryId],
                [id]: item,
              },
            },
          }
        }),

      getItem: (categoryId, id) => {
        const state = get()
        return state.items[categoryId]?.[id]
      },

      updateItemValue: (categoryId, id, value) =>
        set((state) => {
          const item = state.items[categoryId]?.[id]
          if (!item) return state

          return {
            items: {
              ...state.items,
              [categoryId]: {
                ...state.items[categoryId],
                [id]: { ...item, value },
              },
            },
          }
        }),

      getAllItems: (categoryId) => {
        const state = get()
        if (categoryId) {
          return state.items[categoryId] || {}
        }
        return state.items
      },

      resetItem: (categoryId, id) =>
        set((state) => {
          const item = state.items[categoryId]?.[id]
          if (!item) return state

          return {
            items: {
              ...state.items,
              [categoryId]: {
                ...state.items[categoryId],
                [id]: { ...item, value: item.defaultValue },
              },
            },
          }
        }),

      exportConfig: () => {
        const state = get()
        const config: Record<string, unknown> = {}

        for (const [categoryId, items] of Object.entries(state.items)) {
          config[categoryId] = {}
          for (const [itemId, item] of Object.entries(items)) {
            ;(config[categoryId] as Record<string, unknown>)[itemId] = item.value
          }
        }

        return config
      },

      importConfig: (config) =>
        set((state) => {
          const newItems = { ...state.items }

          for (const [categoryId, categoryConfig] of Object.entries(config)) {
            if (!newItems[categoryId]) continue

            for (const [itemId, value] of Object.entries(
              categoryConfig as Record<string, unknown>,
            )) {
              if (!newItems[categoryId][itemId]) continue

              newItems[categoryId] = {
                ...newItems[categoryId],
                [itemId]: {
                  ...newItems[categoryId][itemId],
                  value,
                },
              }
            }
          }

          return { items: newItems }
        }),
    }),
    {
      name: "runebar-config-registry",
    },
  ),
)
