import { apiGet, apiPost, apiDelete } from '@/lib/ky-client';
import type {
    Interest,
    InterestsResponse,
    CategoriesResponse,
    AddUserInterests,
} from '@/schemas/onboarding.schema';

export const interestsApi = {
    /**
     * Get all interests with optional filtering
     */
    getInterests: async (params?: { category?: string; search?: string }): Promise<Interest[]> => {
        const searchParams = new URLSearchParams();
        if (params?.category) searchParams.append('category', params.category);
        if (params?.search) searchParams.append('search', params.search);

        const query = searchParams.toString();
        const url = query ? `interests?${query}` : 'interests';

        const response = await apiGet<InterestsResponse>(url);
        return response.data || [];
    },

    /**
     * Get all interest categories
     */
    getCategories: async (): Promise<string[]> => {
        const response = await apiGet<CategoriesResponse>('interests/categories');
        return response.data || [];
    },

    /**
     * Get user's selected interests
     */
    getUserInterests: async (): Promise<Interest[]> => {
        const response = await apiGet<InterestsResponse>('users/me/interests');
        return response.data || [];
    },

    /**
     * Add interests for user
     */
    addUserInterests: async (interestIds: string[]): Promise<void> => {
        const payload: AddUserInterests = { interest_ids: interestIds };
        await apiPost('users/me/interests', payload);
    },

    /**
     * Remove an interest from user
     */
    removeUserInterest: async (interestId: string): Promise<void> => {
        await apiDelete(`users/me/interests/${interestId}`);
    },
};
