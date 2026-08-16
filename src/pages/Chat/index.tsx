import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { ConversationList } from '@/components/features/Chat/ConversationList/ConversationList';
import { ChatWindow } from '@/components/features/Chat/ChatWindow/ChatWindow';
import { EmptyChat } from '@/components/features/Chat/EmptyChat';
import './Chat.css';

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const {
    conversations,
    conversationsLoaded,
    activeConversationId,
    activeConversation,
    messagesByConv,
    unreadCount,
    loadConversations,
    openConversation,
    loadMoreMessages,
    sendMessage,
  } = useChat();

  // Load conversation list on mount
  useEffect(() => {
    if (!conversationsLoaded) {
      loadConversations();
    }
  }, [conversationsLoaded, loadConversations]);

  // Support direct navigation: /chat?convId=<id>
  useEffect(() => {
    const convId = searchParams.get('convId');
    if (convId && convId !== activeConversationId) {
      openConversation(convId);
    }
  }, [searchParams, activeConversationId, openConversation]);

  if (!user) return null;

  return (
    <div className="chat-page">
      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <aside className="chat-sidebar">
        <div className="chat-sidebar__header">
          <h1 className="chat-sidebar__title">Tin nhắn</h1>
        </div>

        {!conversationsLoaded ? (
          <div className="chat-sidebar__skeleton">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="conv-skeleton">
                <div className="conv-skeleton__avatar" />
                <div className="conv-skeleton__content">
                  <div className="conv-skeleton__line conv-skeleton__line--name" />
                  <div className="conv-skeleton__line conv-skeleton__line--preview" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            currentUserId={user.id}
            unreadCount={unreadCount}
            onSelect={openConversation}
          />
        )}
      </aside>

      {/* ── Main chat area ────────────────────────────────────────── */}
      <main className="chat-main">
        {activeConversation ? (
          <ChatWindow
            conversation={activeConversation}
            messagesState={activeConversationId ? messagesByConv[activeConversationId] : undefined}
            currentUserId={user.id}
            onSend={sendMessage}
            onLoadMore={loadMoreMessages}
          />
        ) : (
          <EmptyChat />
        )}
      </main>
    </div>
  );
};

export default ChatPage;
