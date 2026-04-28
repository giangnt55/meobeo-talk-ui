import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';

export interface User {
    id: string;
    username: string;
    email: string;
    display_name?: string;
    avatar_url?: string;
    bio?: string;
    is_active: boolean;
    email_verified: boolean;
    post_count: number;
    follower_count: number;
    following_count: number;
    created_at: string;
    updated_at: string;
    last_seen_at?: string;
}

export interface CommunityStats {
    total_users: number;
    recent_avatars: string[];
}

export const userApi = {
    /**
     * Get current user's profile
     */
    getProfile: async (): Promise<User> => {
        const response = await api.get('users/me').json<ApiResponse<User>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to fetch profile');
    },

    /**
     * Get user by ID
     */
    getUserById: async (userId: string): Promise<User> => {
        const response = await api.get(`users/${userId}`).json<ApiResponse<User>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to fetch user');
    },

    /**
     * Get community stats for landing page (public, no auth)
     */
    getCommunityStats: async (): Promise<CommunityStats> => {
        const response = await api.get('stats/community').json<ApiResponse<CommunityStats>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to fetch community stats');
    },
};
