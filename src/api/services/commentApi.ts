import { ApiClient } from '../apiClient';
import type { ApiResponse, PaginationParams } from '../../types/api';

export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  memoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentDto {
  content: string;
  memoryId: string;
}

export const commentApi = {
  /**
   * Get comments for a memory
   */
  getComments: async (
    memoryId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<Comment[]>> => {
    return ApiClient.getPaginated<Comment[]>(
      `/memories/${memoryId}/comments`,
      params
    );
  },

  /**
   * Create comment
   */
  createComment: async (
    data: CreateCommentDto
  ): Promise<ApiResponse<Comment>> => {
    return ApiClient.post<Comment>('/comments', data);
  },

  /**
   * Update comment
   */
  updateComment: async (
    id: string,
    content: string
  ): Promise<ApiResponse<Comment>> => {
    return ApiClient.patch<Comment>(`/comments/${id}`, { content });
  },

  /**
   * Delete comment
   */
  deleteComment: async (id: string): Promise<ApiResponse<void>> => {
    return ApiClient.delete<void>(`/comments/${id}`);
  },
};