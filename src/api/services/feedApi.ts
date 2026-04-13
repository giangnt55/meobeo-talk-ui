/**
 * feedApi.ts — Homepage feed tab API service
 *
 * Endpoint design:
 *   GET /api/v1/feed/following   → posts from followed users (auth required)
 *   GET /api/v1/feed/trending    → HN-score ranked posts (optional auth)
 *   GET /api/v1/feed/collections → user collections (optional auth, scaffold)
 *
 * NOT a single endpoint with a tab= filter.
 * Each tab hits a different backend route with a different response shape.
 */

import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';
import type { FeedResponse, Blog } from './blogApi';

// ─── Trending-specific types ──────────────────────────────────────────────────

export interface TrendingPost extends Blog {
    trending_score: number;
}

export interface TrendingFeedResponse {
    posts: TrendingPost[];
    meta: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
    window: 'day' | 'week' | 'month' | 'all';
}

// ─── Collections-specific types ───────────────────────────────────────────────

export interface CollectionPreviewPost {
    id: string;
    title?: string;
    banner_url?: string;
    post_type: string;
}

export interface Collection {
    id: string;
    name: string;
    description?: string;
    cover_url?: string;
    post_count: number;
    preview_posts: CollectionPreviewPost[];
    author: {
        id: string;
        username: string;
        display_name?: string;
        avatar_url?: string;
    };
    created_at: string;
    updated_at: string;
}

export interface CollectionsFeedResponse {
    collections: Collection[];
    meta: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}

// ─── Shared param types ───────────────────────────────────────────────────────

export interface FeedPaginationParams {
    page?: number;
    limit?: number;
}

export type TrendingWindow = 'day' | 'week' | 'month' | 'all';

// ─── Search-specific types ────────────────────────────────────────────────────

export interface SearchPost extends Blog {
    similarity: number;
}

export interface SearchResponse {
    posts: SearchPost[];
    meta: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
    query: string;
}

// ─── feedApi ──────────────────────────────────────────────────────────────────

export const feedApi = {
    /**
     * Tab 1: Đang theo dõi (Following)
     * GET /api/v1/feed/following
     *
     * Returns posts from users the current user follows, newest-first.
     * Requires authentication (cookie/token must be present).
     */
    getFollowingFeed: async (params: FeedPaginationParams = {}): Promise<FeedResponse> => {
        const searchParams: Record<string, string> = {};
        if (params.page) searchParams.page = String(params.page);
        if (params.limit) searchParams.limit = String(params.limit);

        const res = await api
            .get('feed/following', { searchParams })
            .json<ApiResponse<Blog[]> & { meta: FeedResponse['meta'] }>();

        if (res.success) {
            return { posts: res.data || [], meta: res.meta! };
        }
        throw new Error(res.message || 'Failed to load following feed');
    },

    /**
     * Tab 2: Thịnh hành (Trending)
     * GET /api/v1/feed/trending?window=week
     *
     * Posts ranked by score = (likes*2 + comments*3 + saves*4) / time_decay.
     * Optional auth — is_liked / is_saved populated when logged in.
     *
     * window: "day" | "week" (default) | "month" | "all"
     */
    getTrendingFeed: async (
        params: FeedPaginationParams & { window?: TrendingWindow } = {}
    ): Promise<TrendingFeedResponse> => {
        const searchParams: Record<string, string> = {};
        if (params.page) searchParams.page = String(params.page);
        if (params.limit) searchParams.limit = String(params.limit);
        if (params.window) searchParams.window = params.window;

        const res = await api
            .get('feed/trending', { searchParams })
            .json<ApiResponse<TrendingPost[]> & { meta: TrendingFeedResponse['meta']; window: TrendingWindow }>();

        if (res.success) {
            return { posts: res.data || [], meta: res.meta!, window: res.window ?? 'week' };
        }
        throw new Error(res.message || 'Failed to load trending feed');
    },

    /**
     * Tab 3: Bộ sưu tập (Collections)
     * GET /api/v1/feed/collections
     *
     * Returns user-curated collections with preview posts.
     * Currently returns empty (backend scaffold — feature coming soon).
     */
    getCollectionsFeed: async (params: FeedPaginationParams = {}): Promise<CollectionsFeedResponse> => {
        const searchParams: Record<string, string> = {};
        if (params.page) searchParams.page = String(params.page);
        if (params.limit) searchParams.limit = String(params.limit);

        const res = await api
            .get('feed/collections', { searchParams })
            .json<ApiResponse<Collection[]> & { meta: CollectionsFeedResponse['meta'] }>();

        if (res.success) {
            return { collections: res.data || [], meta: res.meta! };
        }
        throw new Error(res.message || 'Failed to load collections');
    },

    /**
     * Search Posts
     * GET /api/v1/search?q=...
     *
     * Returns posts fuzzy-matched by prompt (title + preview text).
     */
    searchPosts: async (query: string, params: FeedPaginationParams = {}): Promise<SearchResponse> => {
        const searchParams: Record<string, string> = { q: query };
        if (params.page) searchParams.page = String(params.page);
        if (params.limit) searchParams.limit = String(params.limit);

        const res = await api
            .get('search', { searchParams })
            .json<ApiResponse<SearchPost[]> & { meta: SearchResponse['meta']; query: string }>();

        if (res.success) {
            return { posts: res.data || [], meta: res.meta!, query: res.query };
        }
        throw new Error(res.message || 'Failed to search posts');
    },
};
