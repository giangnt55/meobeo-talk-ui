export type NotificationType = 'comment' | 'like' | 'mention' | 'system';

export interface Notification {
    id: string;
    type: NotificationType;
    actor: {
        name: string;
        avatar?: string;
        initials?: string;
    };
    content: {
        text?: string;
        highlight?: string;
        target?: string;
    };
    timestamp: string;
    isRead: boolean;
}
