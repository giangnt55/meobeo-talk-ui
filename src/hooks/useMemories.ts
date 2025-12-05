import { useState, useEffect } from 'react';
import type { Memory, MemoryFilter } from '../types/memory';
import type { PaginationParams, PaginationMeta } from '../types/api';
import { memoryApi } from '../api/services/memoryApi';
import { useApi } from './useApi';

export function useMemories(filter?: MemoryFilter & PaginationParams) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const {
    data,
    error,
    isLoading,
    execute: fetchMemories,
  } = useApi(memoryApi.getMemories);

  useEffect(() => {
    loadMemories();
  }, [filter]);

  const loadMemories = async () => {
    try {
      const response = await fetchMemories(filter);
      if (response.data) {
        setMemories(response.data);
        setMeta(response.meta || null);
      }
    } catch (err) {
      // Error handled by useApi
    }
  };

  const refresh = () => {
    loadMemories();
  };

  return {
    memories,
    meta,
    isLoading,
    error,
    refresh,
  };
}