import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * App state - Manages UI related state like sidebar, active view, etc.
 */
type AppState = {
  // Core state
  sidebarOpen: boolean
  activeView: "history" | "prompts" | "models" | "tools" | "playground" | "settings"
  selectedListId: string | null

  // Actions
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setActiveView: (view: AppState["activeView"]) => void
  setSelectedListId: (id: string | null) => void
}

/**
 * App store - Manages UI state
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      sidebarOpen: true,
      activeView: "history",
      selectedListId: null,

      // Actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setActiveView: (view) => set({ activeView: view }),
      setSelectedListId: (id) => set({ selectedListId: id }),
    }),
    {
      name: "runebar-app-state",
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        activeView: state.activeView,
        // Don't persist selectedListId
      }),
    },
  ),
)
