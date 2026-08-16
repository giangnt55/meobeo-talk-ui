import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, ConvMessagesState, Message } from '@/types/chat';

interface ChatState {
  /** All conversations for sidebar, sorted newest-message-first */
  conversations: Conversation[];
  conversationsLoaded: boolean;

  /** ID of the currently open conversation */
  activeConversationId: string | null;

  /** Messages keyed by conversation ID */
  messagesByConv: Record<string, ConvMessagesState>;

  /** Unread badge counts keyed by conversation ID */
  unreadCount: Record<string, number>;
}

const initialState: ChatState = {
  conversations: [],
  conversationsLoaded: false,
  activeConversationId: null,
  messagesByConv: {},
  unreadCount: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // ── Conversations ────────────────────────────────────────────────────────

    setConversations(state, action: PayloadAction<Conversation[]>) {
      state.conversations = action.payload;
      state.conversationsLoaded = true;
    },

    /** Add or update a single conversation in the list */
    upsertConversation(state, action: PayloadAction<Conversation>) {
      const idx = state.conversations.findIndex((c) => c.id === action.payload.id);
      if (idx >= 0) {
        state.conversations[idx] = action.payload;
      } else {
        state.conversations.unshift(action.payload);
      }
    },

    setActiveConversation(state, action: PayloadAction<string | null>) {
      state.activeConversationId = action.payload;
    },

    // ── Messages ─────────────────────────────────────────────────────────────

    /** Initial load: set messages (already reversed by caller) */
    setMessages(
      state,
      action: PayloadAction<{
        convId: string;
        items: Message[];
        total: number;
        offset: number;
      }>,
    ) {
      const { convId, items, total, offset } = action.payload;
      state.messagesByConv[convId] = {
        items,
        total,
        offset,
        loading: false,
        hasMore: offset + items.length < total,
      };
    },

    setMessagesLoading(state, action: PayloadAction<{ convId: string; loading: boolean }>) {
      const entry = state.messagesByConv[action.payload.convId];
      if (entry) {
        entry.loading = action.payload.loading;
      }
    },

    /** Prepend older messages at the top (load-more / infinite scroll up) */
    prependMessages(
      state,
      action: PayloadAction<{
        convId: string;
        items: Message[];
        total: number;
        newOffset: number;
      }>,
    ) {
      const { convId, items, total, newOffset } = action.payload;
      const entry = state.messagesByConv[convId];
      if (!entry) return;
      // Avoid duplicates
      const existingIds = new Set(entry.items.map((m) => m.id));
      const fresh = items.filter((m) => !existingIds.has(m.id));
      entry.items = [...fresh, ...entry.items];
      entry.total = total;
      entry.offset = newOffset;
      entry.hasMore = newOffset + items.length < total;
      entry.loading = false;
    },

    /** Append a single real-time message at the bottom */
    appendMessage(state, action: PayloadAction<Message>) {
      const msg = action.payload;
      const entry = state.messagesByConv[msg.conversation_id];
      if (!entry) {
        // Conversation window not loaded yet — will be fetched on open
        return;
      }
      // Deduplicate (server may echo back our own send)
      if (entry.items.some((m) => m.id === msg.id)) return;
      entry.items.push(msg);
      entry.total += 1;
      entry.offset += 1;
    },

    // ── Conversation preview update ──────────────────────────────────────────

    /** Update last_message preview in sidebar and bubble conversation to top */
    updateLastMessage(state, action: PayloadAction<Message>) {
      const msg = action.payload;
      const idx = state.conversations.findIndex((c) => c.id === msg.conversation_id);
      if (idx < 0) return;
      const conv = { ...state.conversations[idx], last_message: msg };
      // Move to top (most recent activity first)
      state.conversations.splice(idx, 1);
      state.conversations.unshift(conv);
    },

    // ── Unread counts ────────────────────────────────────────────────────────

    incrementUnread(state, action: PayloadAction<string>) {
      const convId = action.payload;
      state.unreadCount[convId] = (state.unreadCount[convId] ?? 0) + 1;
    },

    clearUnread(state, action: PayloadAction<string>) {
      state.unreadCount[action.payload] = 0;
    },
  },
});

export const {
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
} = chatSlice.actions;

export default chatSlice.reducer;
