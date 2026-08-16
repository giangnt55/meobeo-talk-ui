import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { Message } from '@/types/chat';

interface ConversationItemProps {
  conversationId: string;
  type: 'dm' | 'group';
  displayName: string;
  avatarUrl: string | null;
  lastMessage: Message | null;
  unread: number;
  isActive: boolean;
  currentUserId: string;
  onSelect: (id: string) => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversationId,
  type,
  displayName,
  avatarUrl,
  lastMessage,
  unread,
  isActive,
  currentUserId,
  onSelect,
}) => {
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const lastMsgPreview = lastMessage
    ? lastMessage.deleted_at
      ? 'Tin nhắn đã bị xóa'
      : lastMessage.sender_id === currentUserId
        ? `Bạn: ${lastMessage.content}`
        : lastMessage.content
    : null;

  const timeAgo = lastMessage
    ? formatDistanceToNow(new Date(lastMessage.created_at), { addSuffix: true, locale: vi })
    : null;

  return (
    <li
      className={`conv-item ${isActive ? 'conv-item--active' : ''} ${unread > 0 ? 'conv-item--unread' : ''}`}
      role="option"
      aria-selected={isActive}
      onClick={() => onSelect(conversationId)}
    >
      {/* Avatar */}
      <div className="conv-item__avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt={displayName} className="conv-item__avatar-img" />
        ) : (
          <div
            className={`conv-item__avatar-placeholder ${type === 'group' ? 'conv-item__avatar-placeholder--group' : ''}`}
          >
            {type === 'group' ? (
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>group</span>
            ) : (
              initials
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="conv-item__content">
        <div className="conv-item__top">
          <span className="conv-item__name">{displayName}</span>
          {timeAgo && <span className="conv-item__time">{timeAgo}</span>}
        </div>
        {lastMsgPreview && (
          <p className="conv-item__preview">{lastMsgPreview}</p>
        )}
      </div>

      {/* Unread badge */}
      {unread > 0 && (
        <div className="conv-item__badge" aria-label={`${unread} tin nhắn chưa đọc`}>
          {unread > 99 ? '99+' : unread}
        </div>
      )}
    </li>
  );
};
