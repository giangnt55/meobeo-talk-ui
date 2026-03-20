import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';

// ─── Blog types ──────────────────────────────────────────────────────────────

/**
 * Blog represents a full feed post returned by the backend.
 * Note: `content_preview` is NOT a backend field for the feed.
 * The frontend derives preview from `content_html` / `content_text`.
 */
export interface Blog {
    id: string;
    author_id: string;
    post_type: string;
    title: string;
    content_html: string;
    content_text?: string;
    /**
     * Plain-text preview ≤160 chars.
     * Populated by the backend at write-time from content_html.
     * Falls back to client-side getContentPreview(content_html) if missing.
     */
    content_preview?: string;
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
    /** Denormalized bookmark count — incremented/decremented in transaction */
    save_count: number;
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
    // User interaction state (populated when authenticated)
    is_liked: boolean;
    is_saved: boolean;
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

export interface SaveBlogResponse {
    saved: boolean;
    post_id: string;
}

// ─── API helpers ─────────────────────────────────────────────────────────────

/**
 * Derives a short content preview (≤150 chars) from raw HTML.
 * Strips all HTML tags and trims whitespace.
 */
export function getContentPreview(html?: string | null, maxLength = 160): string {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + '...';
}

// ─── blogApi ──────────────────────────────────────────────────────────────────

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
     * Get all blogs with optional filters.
     * Backend returns is_liked / is_saved if user is authenticated (cookie/token).
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
    getComments: async (blogId: string, page: number = 1, limit: number = 10): Promise<CommentListResponse> => {
        const response = await api.get(`posts/${blogId}/comments`, {
            searchParams: {
                page: page.toString(),
                limit: limit.toString(),
            },
        }).json<ApiResponse<Comment[]> & { meta: { page: number; page_size: number; total_items: number; total_pages: number } }>();

        if (response.success) {
            const commentsData = (response.data ?? []) as unknown[];

            const commentsResult = commentsData.map(comment => {
                const c = comment as Record<string, unknown>;
                const author = (c.author as Record<string, unknown> | undefined) ?? {};

                return {
                    id: String(c.id ?? ''),
                    content: String(c.content ?? ''),
                    user_id: String(author.id ?? ''),
                    blog_id: String(c.post_id ?? ''),
                    parent_id: c.parent_id ? String(c.parent_id) : undefined,
                    created_at: String(c.created_at ?? ''),
                    updated_at: String(c.updated_at ?? ''),
                    user: {
                        id: String(author.id ?? ''),
                        username: String(author.username ?? 'Unknown'),
                        display_name: author.display_name as string | undefined,
                        avatar_url: author.avatar_url as string | undefined,
                    },
                    reaction_count: Number(c.reaction_count ?? 0),
                    reply_count: Number(c.reply_count ?? 0),
                    is_liked: Boolean(c.is_liked),
                    replies: [] as Comment[],
                };
            });

            return {
                comments: commentsResult,
                meta: {
                    page: Number(response.meta.page),
                    limit: Number(response.meta.page_size),
                    total: Number(response.meta.total_items),
                    total_pages: Number(response.meta.total_pages),
                },
            };
        }

        throw new Error(response.message || 'Failed to fetch comments');
    },

    /**
     * Create a comment or reply
     */
    createComment: async (blogId: string, content: string, parentId?: string): Promise<Comment> => {
        const url = parentId ? 'interactions/comments/reply' : 'interactions/comments';
        const body: Record<string, unknown> = {
            post_id: blogId,
            content,
            ...(parentId ? { parent_id: parentId } : {}),
        };

        const response = await api.post(url, { json: body }).json<ApiResponse<Comment>>();

        if (response.success && response.data) {
            const c = response.data as any;
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
                replies: [],
            };
        }

        throw new Error(response.message || 'Failed to post comment');
    },

    /**
     * Toggle like on a blog post
     */
    toggleBlogLike: async (blogId: string): Promise<{ liked: boolean; count: number }> => {
        const response = await api.post('interactions/reactions', {
            json: { target_id: blogId, target_type: 'post', reaction: 'like' },
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
     * Toggle like on a comment
     */
    toggleCommentLike: async (commentId: string): Promise<{ liked: boolean; count: number }> => {
        const response = await api.post('interactions/reactions', {
            json: { target_id: commentId, target_type: 'comment', reaction: 'like' },
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
     * Toggle save (bookmark) on a blog post
     * POST /api/v1/blogs/:id/save
     */
    toggleSaveBlog: async (blogId: string): Promise<SaveBlogResponse> => {
        const response = await api
            .post(`blogs/${blogId}/save`)
            .json<ApiResponse<SaveBlogResponse>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to toggle save');
    },
};
