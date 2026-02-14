import { api } from '@/lib/ky-client';
import { ApiResponse } from '@/types/api';

interface BackendNotification {
    id: string;
    type: string;
    actor_id: string;
    actor?: {
        display_name?: string;
        username?: string;
        avatar_url?: string;
        initials?: string;
    };
    payload: any;
    created_at: string;
    is_read: boolean;
}

interface GetNotificationsResponse {
    notifications: BackendNotification[];
    total: number;
    unread_count: number;
}

export const notificationApi = {
    getNotifications: async (page = 1, limit = 20): Promise<GetNotificationsResponse> => {
        const response = await api.get('notifications', { searchParams: { page, limit } }).json<ApiResponse<GetNotificationsResponse>>();
        if (response.success && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Failed to fetch notifications');
    },

    markAsRead: async (id: string): Promise<void> => {
        await api.post(`notifications/${id}/read`);
    },

    markAllAsRead: async (): Promise<void> => {
        await api.post('notifications/read-all');
    },
};
