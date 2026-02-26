import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';
import type { Blog } from './blogApi';

export interface ExploreFeedResponse {
    posts: Blog[];
    meta: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
    tab?: string;
}

export const exploreApi = {
    /**
     * Gets a combined feed of Blogs and Memories from the backend Explore endpoint.
     */
    getExploreFeed: async (
        tab: 'Trending' | 'Recent' | 'Editors’ Choice',
        page: number,
        limit: number
    ): Promise<ExploreFeedResponse> => {
        try {
            const response = await api.get('explore', {
                searchParams: {
                    tab,
                    page: page.toString(),
                    limit: limit.toString()
                }
            }).json<ApiResponse<Blog[]> & { meta: ExploreFeedResponse['meta'], tab: string }>();

            if (response.success && response.data) {
                return {
                    posts: response.data,
                    meta: response.meta,
                    tab: response.tab
                };
            }
            
            throw new Error(response.message || 'Failed to fetch explore feed');
        } catch (error) {
            console.error(`Error fetching explore feed for tab ${tab}:`, error);
            throw error;
        }
    }
};
