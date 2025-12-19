import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';

// Post types
export interface Post {
    id: string;
    author_id: string;
    title?: string;
    content: string;
    content_preview?: string;
    mood?: string;
    emotion_intensity?: number;
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

export interface TrendingTopic {
    hashtag: string;
    post_count: number;
    category?: string;
}

export interface FeedResponse {
    posts: Post[];
    meta: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}

export const postApi = {
    /**
     * Get personalized feed for authenticated user
     */
    getFeed: async (page: number = 1, limit: number = 20): Promise<FeedResponse> => {
        const response = await api.get('posts/feed', {
            searchParams: {
                page: page.toString(),
                limit: limit.toString(),
            },
        }).json<ApiResponse<Post[]> & { meta: FeedResponse['meta'] }>();

        if (response.success && response.data) {
            return {
                posts: response.data,
                meta: response.meta!,
            };
        }

        throw new Error(response.message || 'Failed to fetch feed');
    },

    /**
     * Get trending topics
     */
    getTrending: async (limit: number = 10): Promise<TrendingTopic[]> => {
        const response = await api.get('posts/trending', {
            searchParams: {
                limit: limit.toString(),
            },
        }).json<ApiResponse<TrendingTopic[]>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to fetch trending topics');
    },

    /**
     * Get all public posts
     */
    getPosts: async (page: number = 1, limit: number = 20): Promise<FeedResponse> => {
        const response = await api.get('posts', {
            searchParams: {
                page: page.toString(),
                limit: limit.toString(),
            },
        }).json<ApiResponse<Post[]> & { meta: FeedResponse['meta'] }>();

        if (response.success && response.data) {
            return {
                posts: response.data,
                meta: response.meta!,
            };
        }

        throw new Error(response.message || 'Failed to fetch posts');
    },
};
