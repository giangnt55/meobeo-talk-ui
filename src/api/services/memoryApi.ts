import { ApiClient } from '../apiClient';
import  type { ApiResponse, PaginationParams } from '../../types/api';
import type { Memory, MemoryFilter } from '../../types/memory';

export interface CreateMemoryDto {
  title: string;
  content: string;
  date: string;
  mood?: string;
  tags: string[];
  images?: string[];
  visibility: 'public' | 'friends' | 'private';
}

export interface UpdateMemoryDto extends Partial<CreateMemoryDto> {}

export const memoryApi = {
  /**
   * Get all memories with filters and pagination
   */
  getMemories: async (
    filter?: MemoryFilter & PaginationParams
  ): Promise<ApiResponse<Memory[]>> => {
    return ApiClient.getPaginated<Memory[]>('/memories', filter);
  },

  /**
   * Get single memory by ID
   */
  getMemory: async (id: string): Promise<ApiResponse<Memory>> => {
    return ApiClient.get<Memory>(`/memories/${id}`);
  },

  /**
   * Create new memory
   */
  createMemory: async (data: CreateMemoryDto): Promise<ApiResponse<Memory>> => {
    return ApiClient.post<Memory>('/memories', data);
  },

  /**
   * Update memory
   */
  updateMemory: async (
    id: string,
    data: UpdateMemoryDto
  ): Promise<ApiResponse<Memory>> => {
    return ApiClient.patch<Memory>(`/memories/${id}`, data);
  },

  /**
   * Delete memory
   */
  deleteMemory: async (id: string): Promise<ApiResponse<void>> => {
    return ApiClient.delete<void>(`/memories/${id}`);
  },

  /**
   * Like memory
   */
  likeMemory: async (id: string): Promise<ApiResponse<Memory>> => {
    return ApiClient.post<Memory>(`/memories/${id}/like`);
  },

  /**
   * Unlike memory
   */
  unlikeMemory: async (id: string): Promise<ApiResponse<Memory>> => {
    return ApiClient.delete<Memory>(`/memories/${id}/like`);
  },

  /**
   * Upload memory image
   */
  uploadImage: async (
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ url: string }>> => {
    return ApiClient.upload<{ url: string }>('/memories/upload', file, onProgress);
  },

  /**
   * Get user's memories
   */
  getUserMemories: async (
    userId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<Memory[]>> => {
    return ApiClient.getPaginated<Memory[]>(`/users/${userId}/memories`, params);
  },

  /**
   * Search memories
   */
  searchMemories: async (
    query: string,
    params?: PaginationParams
  ): Promise<ApiResponse<Memory[]>> => {
    return ApiClient.get<Memory[]>('/memories/search', { query, ...params });
  },
};