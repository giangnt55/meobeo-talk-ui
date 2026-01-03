import { apiGet, apiPost, apiPatch, apiDelete } from '../../lib/ky-client';
import {
  type Memory,
  type CreateMemoryInput,
  type UpdateMemoryInput,
  memorySchema,
  createMemorySchema,
  updateMemorySchema
} from '../../schemas/memory.schema';
import { z } from 'zod';

// Response types
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const memoryService = {
  /**
   * Get all memories with filters
   */
  async getMemories(params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    tags?: string[];
  }): Promise<ApiResponse<Memory[]>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.tags) searchParams.set('tags', params.tags.join(','));

    const response = await apiGet<ApiResponse<Memory[]>>(
      `memories?${searchParams.toString()}`
    );

    // Validate response data
    if (response.data) {
      response.data = z.array(memorySchema).parse(response.data);
    }

    return response;
  },

  /**
   * Get single memory by ID
   */
  async getMemory(id: string): Promise<ApiResponse<Memory>> {
    const response = await apiGet<ApiResponse<Memory>>(`memories/${id}`);

    // Validate response
    if (response.data) {
      response.data = memorySchema.parse(response.data);
    }

    return response;
  },

  /**
   * Create new memory
   */
  async createMemory(data: CreateMemoryInput): Promise<ApiResponse<Memory>> {
    // Validate input before sending
    const validatedData = createMemorySchema.parse(data);

    const response = await apiPost<ApiResponse<Memory>>('memories', validatedData);

    if (response.data) {
      response.data = memorySchema.parse(response.data);
    }

    return response;
  },

  /**
   * Update memory
   */
  async updateMemory(
    id: string,
    data: UpdateMemoryInput
  ): Promise<ApiResponse<Memory>> {
    const validatedData = updateMemorySchema.parse(data);

    const response = await apiPatch<ApiResponse<Memory>>(
      `memories/${id}`,
      validatedData
    );

    if (response.data) {
      response.data = memorySchema.parse(response.data);
    }

    return response;
  },

  /**
   * Delete memory
   */
  async deleteMemory(id: string): Promise<ApiResponse<void>> {
    return apiDelete<ApiResponse<void>>(`memories/${id}`);
  },

  /**
   * Like memory
   */
  async likeMemory(id: string): Promise<ApiResponse<Memory>> {
    const response = await apiPost<ApiResponse<Memory>>(`memories/${id}/like`);

    if (response.data) {
      response.data = memorySchema.parse(response.data);
    }

    return response;
  },

  /**
   * Upload image with progress
   */
  async uploadImage(
    file: File,
    // onProgress?: (progress: number) => void // Removed unused parameter
  ): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);

    // Note: Progress tracking would need custom implementation with ky
    const response = await apiPost<ApiResponse<{ url: string }>>(
      'memories/upload',
      formData
    );

    return response;
  },

  /**
   * Search memories
   */
  async searchMemories(
    query: string,
    params?: { page?: number; limit?: number }
  ): Promise<ApiResponse<Memory[]>> {
    const searchParams = new URLSearchParams({ query });
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const response = await apiGet<ApiResponse<Memory[]>>(
      `memories/search?${searchParams.toString()}`
    );

    if (response.data) {
      response.data = z.array(memorySchema).parse(response.data);
    }

    return response;
  },
};