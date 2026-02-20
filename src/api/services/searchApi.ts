import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';

export interface SearchResult {
    users: {
        id: string;
        username: string;
        display_name?: string;
        avatar?: string;
    }[];
    posts: {
        id: string;
        title?: string;
        contentPreview: string;
    }[];
}

export const searchApi = {
    /**
     * Search for users and posts
     */
    searchGlobally: async (query: string): Promise<SearchResult> => {
        // Calling a generic /search endpoint
        const response = await api.get('search', {
            searchParams: { q: query },
        }).json<ApiResponse<SearchResult>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Search failed');
    },
};
