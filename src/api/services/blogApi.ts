import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';

// Blog types
export interface Blog {
    id: string;
    author_id: string;
    post_type: string;
    title: string;
    content_html: string;
    content_text: string;
    content_preview: string;
    category?: string;
    read_time_minutes: number;
    banner_url?: string;
    thumbnail_url?: string;
    tags: string[];
    visibility: string;
    status: string;
    allow_comments: boolean;
    is_sensitive: boolean;
    comment_count: number;
    reaction_count: number;
    view_count: number;
    created_at: string;
    updated_at: string;
    author: {
        id: string;
        username: string;
        display_name?: string;
        avatar_url?: string;
        bio?: string;
    };
}

export interface CreateBlogRequest {
    title: string;
    content_html: string;
    category?: string;
    banner_url?: string;
    tags?: string[];
    visibility: 'public' | 'private' | 'followers';
    status: 'draft' | 'published';
}

export interface UpdateBlogRequest {
    title?: string;
    content_html?: string;
    category?: string;
    banner_url?: string;
    tags?: string[];
    visibility?: 'public' | 'private' | 'followers';
    status?: 'draft' | 'published';
}

export interface BlogListParams {
    category?: string;
    page?: number;
    limit?: number;
}

export interface FeedResponse {
    posts: Blog[];
    meta: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}

export const blogApi = {
    /**
     * Create a new blog post
     */
    createBlog: async (data: CreateBlogRequest): Promise<Blog> => {
        const response = await api.post('blogs', {
            json: data,
        }).json<ApiResponse<Blog>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to create blog');
    },

    /**
     * Update an existing blog post
     */
    updateBlog: async (id: string, data: UpdateBlogRequest): Promise<Blog> => {
        const response = await api.put(`blogs/${id}`, {
            json: data,
        }).json<ApiResponse<Blog>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to update blog');
    },

    /**
     * Delete a blog post
     */
    deleteBlog: async (id: string): Promise<void> => {
        const response = await api.delete(`blogs/${id}`).json<ApiResponse<null>>();

        if (!response.success) {
            throw new Error(response.message || 'Failed to delete blog');
        }
    },

    /**
     * Get a single blog by ID
     */
    getBlogById: async (id: string): Promise<Blog> => {
        const response = await api.get(`blogs/${id}`).json<ApiResponse<Blog>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to fetch blog');
    },

    /**
     * Get all blogs with optional filters
     */
    getBlogs: async (params: BlogListParams = {}): Promise<FeedResponse> => {
        const searchParams: Record<string, string> = {};
        
        if (params.category) searchParams.category = params.category;
        if (params.page) searchParams.page = params.page.toString();
        if (params.limit) searchParams.limit = params.limit.toString();

        const response = await api.get('blogs', {
            searchParams,
        }).json<ApiResponse<Blog[]> & { meta: FeedResponse['meta'] }>();

        if (response.success && response.data) {
            return {
                posts: response.data,
                meta: response.meta!,
            };
        }

        throw new Error(response.message || 'Failed to fetch blogs');
    },

    /**
     * Get blogs by a specific user
     */
    getUserBlogs: async (userId: string, page: number = 1, limit: number = 20): Promise<FeedResponse> => {
        const response = await api.get(`users/${userId}/blogs`, {
            searchParams: {
                page: page.toString(),
                limit: limit.toString(),
            },
        }).json<ApiResponse<Blog[]> & { meta: FeedResponse['meta'] }>();

        if (response.success && response.data) {
            return {
                posts: response.data,
                meta: response.meta!,
            };
        }

        throw new Error(response.message || 'Failed to fetch user blogs');
    },
};
