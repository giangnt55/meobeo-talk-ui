import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { memoryService } from '../../api/services/memory.service';
import { queryKeys } from '../../lib/react-query';
import type { CreateMemoryInput, UpdateMemoryInput } from '../../schemas/memory.schema';
import { toast } from 'react-hot-toast';

/**
 * Get all memories
 */
export function useMemories(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  tags?: string[];
}) {
  return useQuery({
    queryKey: queryKeys.memories.list(params || {}),
    queryFn: () => memoryService.getMemories(params),
    select: (response) => ({
      memories: response.data || [],
      meta: response.meta,
    }),
  });
}

/**
 * Get single memory
 */
export function useMemory(id: string) {
  return useQuery({
    queryKey: queryKeys.memories.detail(id),
    queryFn: () => memoryService.getMemory(id),
    select: (response) => response.data,
    enabled: !!id,
  });
}

/**
 * Create memory mutation
 */
export function useCreateMemory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMemoryInput) => memoryService.createMemory(data),
    onSuccess: (response) => {
      // Invalidate and refetch memories list
      queryClient.invalidateQueries({ queryKey: queryKeys.memories.lists() });

      toast.success(response.message || 'Memory created successfully!');
    },
  });
}

/**
 * Update memory mutation
 */
export function useUpdateMemory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMemoryInput }) =>
      memoryService.updateMemory(id, data),
    onSuccess: (response, variables) => {
      // Update the cache
      queryClient.setQueryData(
        queryKeys.memories.detail(variables.id),
        response
      );

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.memories.lists() });

      toast.success(response.message || 'Memory updated successfully!');
    },
  });
}

/**
 * Delete memory mutation
 */
export function useDeleteMemory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => memoryService.deleteMemory(id),
    onSuccess: (response, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.memories.detail(id) });

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.memories.lists() });

      toast.success(response.message || 'Memory deleted successfully!');
    },
  });
}

/**
 * Like memory mutation with optimistic update
 */
export function useLikeMemory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => memoryService.likeMemory(id),
    // Optimistic update
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.memories.detail(id) });

      // Snapshot previous value
      const previousMemory = queryClient.getQueryData(
        queryKeys.memories.detail(id)
      );

      // Optimistically update
      queryClient.setQueryData(queryKeys.memories.detail(id), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: { ...old.data, likes: old.data.likes + 1 },
        };
      });

      return { previousMemory };
    },
    // Rollback on error
    onError: (err, id, context) => {
      if (context?.previousMemory) {
        queryClient.setQueryData(
          queryKeys.memories.detail(id),
          context.previousMemory
        );
      }
    },
    // Refetch after success or error
    onSettled: (data, error, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.memories.detail(id) });
    },
  });
}

/**
 * Upload image mutation
 */
export function useUploadImage() {
  return useMutation({
    mutationFn: (file: File) => memoryService.uploadImage(file),
    onSuccess: (response) => {
      toast.success('Image uploaded successfully!');
    },
  });
}

/**
 * Search memories
 */
export function useSearchMemories(query: string, params?: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: [...queryKeys.memories.all, 'search', query, params],
    queryFn: () => memoryService.searchMemories(query, params),
    select: (response) => ({
      results: response.data || [],
      meta: response.meta,
    }),
    enabled: query.length > 0,
  });
}