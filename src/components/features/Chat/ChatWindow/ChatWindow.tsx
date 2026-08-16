import React, { useEffect, useRef, useCallback } from 'react';
import type { Conversation, Message } from '@/types/chat';
import type { ConvMessagesState } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import './ChatWindow.css';

interface ChatWindowProps {
  conversation: Conversation;
  messagesState: ConvMessagesState | undefined;
  currentUserId: string;
  onSend: (convId: string, content: string) => void;
  onLoadMore: (convId: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  messagesState,
  currentUserId,
  onSend,
  onLoadMore,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const isAtBottomRef = useRef<boolean>(true);

  const messages = messagesState?.items ?? [];
  const isLoading = messagesState?.loading ?? false;
  const hasMore = messagesState?.hasMore ?? false;

  // Auto-scroll to bottom on new messages (only if already near bottom)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (isAtBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  // Preserve scroll position when loading older messages
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isLoading) return;

    const newScrollHeight = container.scrollHeight;
    const diff = newScrollHeight - prevScrollHeightRef.current;
    if (diff > 0 && prevScrollHeightRef.current > 0) {
      container.scrollTop += diff;
    }
    prevScrollHeightRef.current = newScrollHeight;
  }, [messages.length, isLoading]);

  // Initial scroll to bottom
  useEffect(() => {
    const t = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'instant' });
    }, 50);
    return () => clearTimeout(t);
  }, [conversation.id]);

  // Detect scroll position
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // User is near the bottom (within 120px)
    const distFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    isAtBottomRef.current = distFromBottom < 120;

    // Load more when near top
    if (container.scrollTop < 80 && hasMore && !isLoading) {
      prevScrollHeightRef.current = container.scrollHeight;
      onLoadMore(conversation.id);
    }
  }, [hasMore, isLoading, conversation.id, onLoadMore]);

  // Derive conversation header info
  const otherParticipant = conversation.type === 'dm'
    ? conversation.participants?.find((p) => p.user_id !== currentUserId)?.user
    : null;

  const headerName =
    conversation.type === 'group'
      ? (conversation.name ?? 'Nhóm không tên')
      : (otherParticipant?.display_name || otherParticipant?.username || 'Người dùng');

  const headerAvatar =
    conversation.type === 'dm' ? (otherParticipant?.avatar_url ?? null) : null;

  const headerInitials = headerName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-window__header">
        <div className="chat-window__header-avatar">
          {headerAvatar ? (
            <img src={headerAvatar} alt={headerName} className="chat-window__header-avatar-img" />
          ) : (
            <div className="chat-window__header-avatar-placeholder">
              {conversation.type === 'group' ? (
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>group</span>
              ) : (
                headerInitials
              )}
            </div>
          )}
        </div>
        <div className="chat-window__header-info">
          <h2 className="chat-window__header-name">{headerName}</h2>
          <span className="chat-window__header-type">
            {conversation.type === 'group' ? 'Nhóm' : 'Tin nhắn trực tiếp'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        className="chat-window__messages"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        role="log"
        aria-live="polite"
        aria-label="Messages"
      >
        {/* Load more indicator */}
        {isLoading && (
          <div className="chat-window__loading">
            <div className="chat-window__loading-dots">
              <span /><span /><span />
            </div>
          </div>
        )}

        {!hasMore && messages.length > 0 && (
          <div className="chat-window__start-label">Bắt đầu cuộc trò chuyện</div>
        )}

        {messages.length === 0 && !isLoading && (
          <div className="chat-window__empty-messages">
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', opacity: 0.3 }}>
              chat_bubble_outline
            </span>
            <p>Chưa có tin nhắn nào. Hãy nói xin chào!</p>
          </div>
        )}

        {messages.map((msg: Message, i: number) => {
          const prev = messages[i - 1];
          // Show avatar when it's the first message from this sender in a run
          const showAvatar = !prev || prev.sender_id !== msg.sender_id;
          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.sender_id === currentUserId}
              showAvatar={showAvatar}
            />
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput conversationId={conversation.id} onSend={onSend} />
    </div>
  );
};
