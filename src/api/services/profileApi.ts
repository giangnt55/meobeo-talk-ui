import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    full_name: string;
    display_name?: string;
    avatar_url?: string;
    bio?: string;
    post_count: number;
    follower_count: number;
    following_count: number;
    is_active: boolean;
    created_at: string;
}

export interface UpdateProfile {
    display_name?: string;
    bio?: string;
}

export const profileApi = {
    /**
     * Get the current authenticated user's profile
     */
    getMyProfile: async (): Promise<UserProfile> => {
        const response = await api
            .get('users/me')
            .json<ApiResponse<UserProfile>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to fetch profile');
    },

    /**
     * Get a user profile by username (public endpoint)
     */
    getProfileByUsername: async (username: string): Promise<UserProfile> => {
        const response = await api
            .get(`users/by-username/${username}`)
            .json<ApiResponse<UserProfile>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'User not found');
    },

    /**
     * Update the current user's profile
     */
    updateProfile: async (data: UpdateProfile): Promise<UserProfile> => {
        const response = await api
            .put('users/me', { json: data })
            .json<ApiResponse<UserProfile>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to update profile');
    },

    /**
     * Upload a new avatar image
     */
    uploadAvatar: async (file: File): Promise<{ avatar_url: string }> => {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await api
            .put('users/me/avatar', { body: formData })
            .json<ApiResponse<{ avatar_url: string }>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to upload avatar');
    },
};
