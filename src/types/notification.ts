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
        link?: string;  // URL to navigate to when clicked
    };
    timestamp: string;
    isRead: boolean;
}
