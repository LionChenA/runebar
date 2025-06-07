import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default configuration
      staleTime: 1000 * 60 * 5, // 5 minutes stale time
      gcTime: 1000 * 60 * 30, // 30 minutes cache time
      retry: 1, // Retry once on failure
      refetchOnWindowFocus: false, // Don't refetch on window focus
    },
  },
})

interface QueryProviderProps {
  children: ReactNode
}

/**
 * QueryProvider - Sets up TanStack Query for the application
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Enable React Query Devtools in development */}
      {/* Uncomment when @tanstack/react-query-devtools is installed */}
      {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />} */}
    </QueryClientProvider>
  )
}

export { queryClient }
