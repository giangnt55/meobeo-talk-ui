import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { chatApi } from '@/api/services/chatApi';
import { socketService } from '@/api/services/socketService';
import {
  setConversations,
  upsertConversation,
  setActiveConversation,
  setMessages,
  setMessagesLoading,
  prependMessages,
  appendMessage,
  updateLastMessage,
  incrementUnread,
  clearUnread,
} from '@/store/chatSlice';
import type { Message, WSSendPayload } from '@/types/chat';

const PAGE_SIZE = 20;

export function useChat() {
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, conversationsLoaded, activeConversationId, messagesByConv, unreadCount } =
    useSelector((s: RootState) => s.chat);

  // ── WS message handler ────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = socketService.onMessage((raw: unknown) => {
      const payload = raw as { type?: string; data?: Message };
      if (payload.type !== 'chat_message' || !payload.data) return;

      const msg = payload.data;

      dispatch(appendMessage(msg));
      dispatch(updateLastMessage(msg));

      // If the message is not in the active conversation, increment unread badge
      // (activeConversationId accessed via ref to avoid stale closure)
      const activeId = activeConvIdRef.current;
      if (msg.conversation_id !== activeId) {
        dispatch(incrementUnread(msg.conversation_id));
      } else {
        // Auto mark-read when message arrives for the active conversation
        chatApi.markAsRead(msg.conversation_id).catch(() => {/* silent */});
      }
    });

    return unsubscribe;
  }, [dispatch]);

  // Use ref for activeConversationId inside the WS closure to avoid re-registering on every change
  const activeConvIdRef = useRef(activeConversationId);
  useEffect(() => {
    activeConvIdRef.current = activeConversationId;
  }, [activeConversationId]);

  // ── Load conversations ────────────────────────────────────────────────────
  const loadConversations = useCallback(async () => {
    try {
      const convs = await chatApi.getConversations();
      dispatch(setConversations(convs));
    } catch (err) {
      console.error('Failed to load conversations', err);
    }
  }, [dispatch]);

  // ── Open a conversation ───────────────────────────────────────────────────
  const openConversation = useCallback(
    async (convId: string) => {
      dispatch(setActiveConversation(convId));
      dispatch(clearUnread(convId));

      // Only fetch messages if not already loaded
      if (!messagesByConv[convId]) {
        dispatch(setMessagesLoading({ convId, loading: true }));
        try {
          const res = await chatApi.getMessages(convId, PAGE_SIZE, 0);
          dispatch(
            setMessages({
              convId,
              // Backend returns newest-first; reverse for chronological display
              items: [...res.messages].reverse(),
              total: res.total,
              offset: res.messages.length,
            }),
          );
        } catch (err) {
          console.error('Failed to load messages', err);
          dispatch(setMessagesLoading({ convId, loading: false }));
        }
      }

      chatApi.markAsRead(convId).catch(() => {/* silent */});
    },
    [dispatch, messagesByConv],
  );

  // ── Load more (scroll up) ─────────────────────────────────────────────────
  const loadMoreMessages = useCallback(
    async (convId: string) => {
      const entry = messagesByConv[convId];
      if (!entry || entry.loading || !entry.hasMore) return;

      dispatch(setMessagesLoading({ convId, loading: true }));
      try {
        const res = await chatApi.getMessages(convId, PAGE_SIZE, entry.offset);
        dispatch(
          prependMessages({
            convId,
            // Reverse so oldest of this batch goes at the top
            items: [...res.messages].reverse(),
            total: res.total,
            newOffset: entry.offset + res.messages.length,
          }),
        );
      } catch (err) {
        console.error('Failed to load more messages', err);
        dispatch(setMessagesLoading({ convId, loading: false }));
      }
    },
    [dispatch, messagesByConv],
  );

  // ── Send message via WebSocket ────────────────────────────────────────────
  const sendMessage = useCallback((conversationId: string, content: string) => {
    const payload: WSSendPayload = {
      type: 'chat_message',
      conversation_id: conversationId,
      content,
    };
    socketService.send(JSON.stringify(payload));
  }, []);

  // ── Get or create DM, then navigate ──────────────────────────────────────
  const getOrCreateDm = useCallback(
    async (targetUserId: string) => {
      const conv = await chatApi.getOrCreateDm(targetUserId);
      dispatch(upsertConversation(conv));
      return conv;
    },
    [dispatch],
  );

  const activeMessages = activeConversationId
    ? (messagesByConv[activeConversationId]?.items ?? [])
    : [];

  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? null;

  return {
    conversations,
    conversationsLoaded,
    activeConversationId,
    activeConversation,
    activeMessages,
    messagesByConv,
    unreadCount,
    loadConversations,
    openConversation,
    loadMoreMessages,
    sendMessage,
    getOrCreateDm,
  };
}
