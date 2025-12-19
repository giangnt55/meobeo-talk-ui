import { apiGet, apiPost, apiDelete } from '@/lib/ky-client';
import type {
    SuggestedUser,
    SuggestedUsersResponse,
    FollowResponse,
} from '@/schemas/onboarding.schema';

export const followApi = {
    /**
     * Follow a user
     */
    followUser: async (userId: string): Promise<void> => {
        await apiPost<FollowResponse>(`users/${userId}/follow`);
    },

    /**
     * Unfollow a user
     */
    unfollowUser: async (userId: string): Promise<void> => {
        await apiDelete(`users/${userId}/follow`);
    },

    /**
     * Get list of users that current user is following
     */
    getFollowing: async (params?: { page?: number; page_size?: number }): Promise<SuggestedUser[]> => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.page_size) searchParams.append('page_size', params.page_size.toString());

        const query = searchParams.toString();
        const url = query ? `users/me/following?${query}` : 'users/me/following';

        const response = await apiGet<SuggestedUsersResponse>(url);
        return response.data || [];
    },

    /**
     * Get suggested users to follow
     */
    getSuggestedUsers: async (limit?: number): Promise<SuggestedUser[]> => {
        const url = limit ? `users/suggested?limit=${limit}` : 'users/suggested';
        const response = await apiGet<SuggestedUsersResponse>(url);
        return response.data || [];
    },
};
