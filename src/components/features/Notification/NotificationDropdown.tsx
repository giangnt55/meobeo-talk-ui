import React, { useRef, useEffect } from 'react';
import './NotificationDropdown.css'; // We will create this CSS file
import { Notification } from '@/types/notification';
import { Tooltip } from '@/components/common/Tooltip';

interface NotificationDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: Notification[];
    onMarkAllRead: () => void;
    onNotificationClick: (notification: Notification) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose, notifications, onMarkAllRead, onNotificationClick }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getIcon = (type: string) => {
        switch (type) {
            case 'comment': return <span className="material-symbols-outlined notification-icon-symbol">chat_bubble</span>;
            case 'like': return <span className="material-symbols-outlined notification-icon-symbol">favorite</span>;
            case 'mention': return <span className="material-symbols-outlined notification-icon-symbol">alternate_email</span>;
            case 'system': return <span className="material-symbols-outlined notification-icon-symbol">celebration</span>;
            default: return <span className="material-symbols-outlined notification-icon-symbol">notifications</span>;
        }
    };

    const getActorAvatarColor = (type: string) => {
        switch (type) {
            case 'comment': return 'bg-purple-100 text-purple-600';
            case 'like': return 'bg-pink-100 text-pink-600';
            case 'mention': return 'bg-gray-100 text-gray-600'; // Defaulting for mention
            case 'system': return 'bg-primary/10 text-primary';
            default: return 'bg-gray-100 text-gray-600';
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'comment': return 'bg-blue-500';
            case 'like': return 'bg-pink-500';
            case 'mention': return 'bg-gray-500'; // Or transparent if no badge need
            case 'system': return 'bg-primary';
            default: return 'bg-gray-500';
        }
    }

    return (
        <div className="notification-dropdown" ref={dropdownRef}>
            <div className="notification-header">
                <h3 className="notification-title">Notifications</h3>
                <button className="mark-read-btn" onClick={onMarkAllRead}>Mark all as read</button>
            </div>
            <div className="notification-list">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                        onClick={() => onNotificationClick(notification)}
                        style={{ cursor: 'pointer' }}
                    >
                        {!notification.isRead && <div className="unread-indicator"></div>}
                        <div className="notification-avatar-container">
                            <div className={`notification-avatar ${getActorAvatarColor(notification.type)}`}>
                                {notification.actor.avatar ? (
                                    <img src={notification.actor.avatar} alt={notification.actor.name} />
                                ) : (
                                    <>
                                        {notification.type === 'system' && <span className="material-symbols-outlined text-xl icon-filled">celebration</span>}
                                        {notification.type === 'mention' && <span className="material-symbols-outlined text-xl">alternate_email</span>}
                                        {notification.type !== 'system' && notification.type !== 'mention' && (
                                            notification.actor.initials || notification.actor.name.charAt(0).toUpperCase()
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Badge for comment/like */}
                            {(notification.type === 'comment' || notification.type === 'like') && (
                                <div className={`notification-badge ${getTypeColor(notification.type)}`}>
                                    {getIcon(notification.type)}
                                </div>
                            )}
                        </div>

                        <div className="notification-content">
                            <Tooltip
                                content={`${notification.actor.name} ${notification.content.text}${notification.content.highlight ? ` ${notification.content.highlight}` : ''}${notification.content.target ? ` ${notification.content.target}` : ''}`}
                                position="top"
                            >
                                <p className="notification-text">
                                    <strong>{notification.actor.name}</strong>{' '}
                                    {notification.content.text}
                                    {notification.content.highlight && (
                                        <span className="notification-highlight"> {notification.content.highlight}</span>
                                    )}
                                    {notification.content.target && (
                                        <span className="notification-target"> {notification.content.target}</span>
                                    )}
                                </p>
                            </Tooltip>
                            <span className="notification-time">{notification.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
            <a href="#" className="view-all-notifications">
                View All Notifications
            </a>
        </div>
    );
};
