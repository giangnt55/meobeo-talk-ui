import React from 'react';
import type { Conversation, Message } from '@/types/chat';
import { ConversationItem } from './ConversationItem';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  currentUserId: string;
  unreadCount: Record<string, number>;
  onSelect: (convId: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  currentUserId,
  unreadCount,
  onSelect,
}) => {
  if (conversations.length === 0) {
    return (
      <div className="conv-list-empty">
        <span className="material-symbols-outlined conv-list-empty-icon">chat_bubble_outline</span>
        <p>Chưa có cuộc trò chuyện nào</p>
        <span>Nhắn tin cho ai đó để bắt đầu!</span>
      </div>
    );
  }

  return (
    <ul className="conv-list" role="listbox" aria-label="Conversations">
      {conversations.map((conv) => {
        const lastMsg = conv.last_message as Message | null | undefined;
        // For DM: find the other participant's name
        const otherParticipant = conv.type === 'dm'
          ? conv.participants?.find((p) => p.user_id !== currentUserId)?.user
          : null;

        const displayName =
          conv.type === 'group'
            ? (conv.name ?? 'Nhóm không tên')
            : (otherParticipant?.display_name || otherParticipant?.username || 'Người dùng');

        const avatarUrl =
          conv.type === 'dm' ? (otherParticipant?.avatar_url ?? null) : null;

        return (
          <ConversationItem
            key={conv.id}
            conversationId={conv.id}
            type={conv.type}
            displayName={displayName}
            avatarUrl={avatarUrl}
            lastMessage={lastMsg ?? null}
            unread={unreadCount[conv.id] ?? 0}
            isActive={conv.id === activeConversationId}
            currentUserId={currentUserId}
            onSelect={onSelect}
          />
        );
      })}
    </ul>
  );
};
