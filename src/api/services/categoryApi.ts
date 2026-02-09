import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';

export interface Category {
    id: string;
    name: string;
    name_en: string;
    description?: string;
    icon?: string;
}

export const categoryApi = {
    /**
     * Get all active blog categories
     */
    getCategories: async (): Promise<Category[]> => {
        const response = await api.get('blog-categories').json<ApiResponse<Category[]>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to fetch categories');
    },
};
