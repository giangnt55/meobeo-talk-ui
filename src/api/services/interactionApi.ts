import { api } from '@/lib/ky-client';
import type { ApiResponse, Pagination, PaginationParams } from '@/types/api';

// DTOs
export interface UserSummary {
    id: string;
    username: string;
    display_name?: string;
    avatar_url?: string;
}

export interface Comment {
    id: string;
    post_id: string;
    content: string;
    author: UserSummary;
    parent_id?: string;
    reaction_count: number;
    reply_count: number;
    created_at: string;
    updated_at: string;
    replies?: Comment[];
    is_liked: boolean; // Computed on frontend or backend if implemented
}

export interface PaginatedCommentsResponse {
    data: Comment[];
    pagination: Pagination;
}

export interface CreateCommentRequest {
    post_id: string;
    content: string;
}

export interface ReplyCommentRequest {
    post_id: string;
    parent_id: string;
    content: string;
}

export interface CreateReactionRequest {
    target_id: string;
    target_type: 'post' | 'comment';
    reaction: string;
}

export interface ReactionResponse {
    success: boolean;
    is_added: boolean;
}

export const interactionApi = {
    // Comments
    getPostComments: async (postId: string, params?: PaginationParams): Promise<PaginatedCommentsResponse> => {
        const response = await api
            .get(`posts/${postId}/comments`, { searchParams: params as any })
            .json<ApiResponse<Comment[]>>();
        
        // Transform standard API response to paginated format if needed or assume backend returns paginated shape directly
        // Based on backend implementation:
        /*
        c.JSON(http.StatusOK, gin.H{
            "success": true,
            "data":    response.Data,
            "meta":    response.Pagination,
        })
        */
        
        if (response.success && response.data) {
             return {
                 data: response.data,
                 pagination: (response as any).meta
             };
        }
        
        throw new Error(response.message || 'Failed to get comments');
    },

    createComment: async (data: CreateCommentRequest): Promise<Comment> => {
        const response = await api
            .post('interactions/comments', { json: data })
            .json<ApiResponse<Comment>>();

        if (response.success && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Failed to create comment');
    },

    replyComment: async (data: ReplyCommentRequest): Promise<Comment> => {
        const response = await api
            .post('interactions/comments/reply', { json: data })
            .json<ApiResponse<Comment>>();

        if (response.success && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Failed to reply comment');
    },

    deleteComment: async (commentId: string): Promise<void> => {
        const response = await api
            .delete(`interactions/comments/${commentId}`)
            .json<ApiResponse<null>>();

        if (!response.success) {
            throw new Error(response.message || 'Failed to delete comment');
        }
    },

    // Reactions
    toggleReaction: async (data: CreateReactionRequest): Promise<ReactionResponse> => {
        const response = await api
            .post('interactions/reactions', { json: data })
            .json<ApiResponse<ReactionResponse>>();

        if (response.success && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Failed to toggle reaction');
    },

    // Share
    sharePost: async (postId: string): Promise<{ share_url: string }> => {
        const response = await api
            .post(`interactions/share/${postId}`)
            .json<ApiResponse<{ share_url: string }>>();

        if (response.success && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Failed to share post');
    }
};
