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
    category_name?: string;
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
    is_liked?: boolean;
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

export interface Comment {
    id: string;
    content: string;
    user_id: string;
    blog_id: string;
    parent_id?: string;
    created_at: string;
    updated_at: string;
    user: {
        id: string;
        username: string;
        display_name?: string;
        avatar_url?: string;
    };
    reaction_count: number;
    reply_count: number;
    is_liked?: boolean;
    replies?: Comment[];
}

export interface CommentListResponse {
    comments: Comment[];
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

    /**
     * Get comments for a blog
     */
    /**
     * Get comments for a blog
     */
    getComments: async (blogId: string, page: number = 1, limit: number = 10): Promise<CommentListResponse> => {
        const response = await api.get(`posts/${blogId}/comments`, {
            searchParams: {
                page: page.toString(),
                limit: limit.toString(),
            },
        }).json<ApiResponse<any[]> & { meta: any }>();

        if (response.success) {
            // Transform new API response to match existing frontend structure
            const commentsData = response.data || [];
            
            // Return flat comments to let frontend handle reconstruction with pagination
            const commentsResult = commentsData.map((c: any) => ({
                id: c.id,
                content: c.content,
                user_id: c.author?.id || '',
                blog_id: c.post_id,
                parent_id: c.parent_id,
                created_at: c.created_at,
                updated_at: c.updated_at,
                user: {
                    id: c.author?.id || '',
                    username: c.author?.username || 'Unknown',
                    display_name: c.author?.display_name,
                    avatar_url: c.author?.avatar_url,
                },
                reaction_count: c.reaction_count,
                reply_count: c.reply_count,
                is_liked: c.is_liked,
                replies: []
            }));

            return {
                comments: commentsResult,
                meta: {
                    page: response.meta.page,
                    limit: response.meta.page_size,
                    total: response.meta.total_items,
                    total_pages: response.meta.total_pages,
                },
            };
        }

        throw new Error(response.message || 'Failed to fetch comments');
    },

    /**
     * Create a comment
     */
    /**
     * Create a comment
     */
    createComment: async (blogId: string, content: string, parentId?: string): Promise<Comment> => {
        let url = 'interactions/comments';
        let body: any = { post_id: blogId, content };

        if (parentId) {
            url = 'interactions/comments/reply';
            body = { post_id: blogId, parent_id: parentId, content };
        }

        const response = await api.post(url, { json: body }).json<ApiResponse<any>>();

        if (response.success && response.data) {
            const c = response.data;
            return {
                id: c.id,
                content: c.content,
                user_id: c.author?.id || '',
                blog_id: c.post_id,
                parent_id: c.parent_id,
                created_at: c.created_at,
                updated_at: c.updated_at,
                user: {
                    id: c.author?.id || '',
                    username: c.author?.username || 'Unknown',
                    display_name: c.author?.display_name,
                    avatar_url: c.author?.avatar_url,
                },
                reaction_count: c.reaction_count,
                reply_count: c.reply_count,
                is_liked: c.is_liked,
                replies: []
            };
        }

        throw new Error(response.message || 'Failed to post comment');
    },

    /**
     * Like/Unlike a blog
     */
    /**
     * Like/Unlike a blog
     */
    toggleBlogLike: async (blogId: string): Promise<{ liked: boolean; count: number }> => {
        const response = await api.post('interactions/reactions', {
            json: { target_id: blogId, target_type: 'post', reaction: 'like' }
        }).json<ApiResponse<{ success: boolean; is_added: boolean; reaction_count: number }>>();

        if (response.success && response.data) {
            return {
                liked: response.data.is_added,
                count: response.data.reaction_count,
            };
        }

        throw new Error(response.message || 'Failed to toggle like');
    },

    /**
     * Like/Unlike a comment
     */
    toggleCommentLike: async (commentId: string): Promise<{ liked: boolean; count: number }> => {
        const response = await api.post('interactions/reactions', {
            json: { target_id: commentId, target_type: 'comment', reaction: 'like' }
        }).json<ApiResponse<{ success: boolean; is_added: boolean; reaction_count: number }>>();

        if (response.success && response.data) {
            return {
                liked: response.data.is_added,
                count: response.data.reaction_count,
            };
        }

        throw new Error(response.message || 'Failed to toggle like');
    },
};
