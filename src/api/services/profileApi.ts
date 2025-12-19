import { apiGet, apiPut, apiPost } from '@/lib/ky-client';
import type {
    Profile,
    ProfileResponse,
    UpdateProfile,
} from '@/schemas/onboarding.schema';

export const profileApi = {
    /**
     * Get current user's profile
     */
    getProfile: async (): Promise<Profile> => {
        const response = await apiGet<ProfileResponse>('users/me/profile');
        if (!response.data) {
            throw new Error('No profile data received');
        }
        return response.data;
    },

    /**
     * Update user profile
     */
    updateProfile: async (data: UpdateProfile): Promise<Profile> => {
        const response = await apiPut<ProfileResponse>('users/me/profile', data);
        if (!response.data) {
            throw new Error('No profile data received');
        }
        return response.data;
    },

    /**
     * Upload avatar
     */
    uploadAvatar: async (file: File): Promise<{ avatar_url: string }> => {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await apiPost<{ success: boolean; data: { avatar_url: string } }>(
            'users/me/avatar',
            formData
        );

        if (!response.data) {
            throw new Error('No avatar URL received');
        }
        return response.data;
    },
};
