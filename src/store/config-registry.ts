import { ConfigDomain } from "@/types/settings"
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

  // Configuration items organized by domain and category
  items: Record<ConfigDomain, Record<string, Record<string, ConfigItem>>>

  // Methods for managing categories
  registerCategory: (id: string, category: ConfigCategory) => void
  getCategory: (id: string) => ConfigCategory | undefined
  getAllCategories: () => Record<string, ConfigCategory>
  getCategoriesByDomain: (domain: ConfigDomain) => Record<string, ConfigCategory>

  // Methods for managing configuration items
  registerItem: (domain: ConfigDomain, categoryId: string, id: string, item: ConfigItem) => void
  getItem: (domain: ConfigDomain, categoryId: string, id: string) => ConfigItem | undefined
  updateItemValue: (domain: ConfigDomain, categoryId: string, id: string, value: unknown) => void
  getAllItems: (
    domain?: ConfigDomain,
    categoryId?: string,
  ) =>
    | Record<ConfigDomain, Record<string, Record<string, ConfigItem>>>
    | Record<string, Record<string, ConfigItem>>
    | Record<string, ConfigItem>
  resetItem: (domain: ConfigDomain, categoryId: string, id: string) => void

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
      items: {
        [ConfigDomain.GENERAL]: {},
        [ConfigDomain.MODELS]: {},
        [ConfigDomain.PROMPTS]: {},
        [ConfigDomain.TOOLS]: {},
      },

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

      getCategoriesByDomain: (domain) => {
        const state = get()
        const domainCategories: Record<string, ConfigCategory> = {}

        for (const [id, category] of Object.entries(state.categories)) {
          if (category.domain === domain) {
            domainCategories[id] = category
          }
        }

        return domainCategories
      },

      // Item management methods
      registerItem: (domain, categoryId, id, item) =>
        set((state) => {
          // Create domain if it doesn't exist (should never happen with our enum)
          if (!state.items[domain]) {
            return {
              items: {
                ...state.items,
                [domain]: {
                  [categoryId]: {
                    [id]: item,
                  },
                },
              },
            }
          }

          // Create category if it doesn't exist
          if (!state.items[domain][categoryId]) {
            return {
              items: {
                ...state.items,
                [domain]: {
                  ...state.items[domain],
                  [categoryId]: {
                    [id]: item,
                  },
                },
              },
            }
          }

          // Add or update item in existing category
          return {
            items: {
              ...state.items,
              [domain]: {
                ...state.items[domain],
                [categoryId]: {
                  ...state.items[domain][categoryId],
                  [id]: item,
                },
              },
            },
          }
        }),

      getItem: (domain, categoryId, id) => {
        const state = get()
        return state.items[domain]?.[categoryId]?.[id]
      },

      updateItemValue: (domain, categoryId, id, value) =>
        set((state) => {
          const item = state.items[domain]?.[categoryId]?.[id]
          if (!item) return state

          return {
            items: {
              ...state.items,
              [domain]: {
                ...state.items[domain],
                [categoryId]: {
                  ...state.items[domain][categoryId],
                  [id]: { ...item, value },
                },
              },
            },
          }
        }),

      getAllItems: (domain, categoryId) => {
        const state = get()

        if (domain && categoryId) {
          return state.items[domain][categoryId] || {}
        }

        if (domain) {
          return state.items[domain] || {}
        }

        return state.items
      },

      resetItem: (domain, categoryId, id) =>
        set((state) => {
          const item = state.items[domain]?.[categoryId]?.[id]
          if (!item) return state

          return {
            items: {
              ...state.items,
              [domain]: {
                ...state.items[domain],
                [categoryId]: {
                  ...state.items[domain][categoryId],
                  [id]: { ...item, value: item.defaultValue },
                },
              },
            },
          }
        }),

      exportConfig: () => {
        const state = get()
        const config: Record<string, unknown> = {}

        for (const [domain, domainItems] of Object.entries(state.items)) {
          config[domain] = {}

          for (const [categoryId, categoryItems] of Object.entries(domainItems)) {
            ;(config[domain] as Record<string, unknown>)[categoryId] = {}

            for (const [itemId, item] of Object.entries(categoryItems)) {
              ;((config[domain] as Record<string, unknown>)[categoryId] as Record<string, unknown>)[
                itemId
              ] = item.value
            }
          }
        }

        return config
      },

      importConfig: (config) =>
        set((state) => {
          const newItems = { ...state.items }

          for (const [domain, domainConfig] of Object.entries(config)) {
            if (!newItems[domain as ConfigDomain]) continue

            for (const [categoryId, categoryConfig] of Object.entries(
              domainConfig as Record<string, unknown>,
            )) {
              if (!newItems[domain as ConfigDomain][categoryId]) continue

              for (const [itemId, value] of Object.entries(
                categoryConfig as Record<string, unknown>,
              )) {
                if (!newItems[domain as ConfigDomain][categoryId][itemId]) continue

                newItems[domain as ConfigDomain] = {
                  ...newItems[domain as ConfigDomain],
                  [categoryId]: {
                    ...newItems[domain as ConfigDomain][categoryId],
                    [itemId]: {
                      ...newItems[domain as ConfigDomain][categoryId][itemId],
                      value,
                    },
                  },
                }
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
