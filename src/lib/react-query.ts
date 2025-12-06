import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Configure React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
    mutations: {
      onError: (error: any) => {
        const message = error?.response?.data?.message || error.message;
        toast.error(message);
      },
    },
  },
});

// Query keys factory
export const queryKeys = {
  memories: {
    all: ['memories'] as const,
    lists: () => [...queryKeys.memories.all, 'list'] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.memories.lists(), filters] as const,
    details: () => [...queryKeys.memories.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.memories.details(), id] as const,
  },
  auth: {
    currentUser: ['auth', 'current-user'] as const,
  },
  comments: {
    all: ['comments'] as const,
    list: (memoryId: string) => [...queryKeys.comments.all, memoryId] as const,
  },
};