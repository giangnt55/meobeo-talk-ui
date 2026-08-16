import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';
import type { Conversation, Message, MessagesResponse } from '@/types/chat';

export const chatApi = {
  /**
   * Get or create a DM conversation with the target user.
   * Idempotent — returns the existing conversation if already exists.
   */
  getOrCreateDm: async (targetUserId: string): Promise<Conversation> => {
    const response = await api
      .post('chat/conversations/dm', { json: { target_user_id: targetUserId } })
      .json<ApiResponse<Conversation>>();

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to create DM conversation');
  },

  /**
   * Create a new group conversation.
   * Creator is automatically added by the server — do NOT include in member_ids.
   */
  createGroup: async (name: string, memberIds: string[]): Promise<Conversation> => {
    const response = await api
      .post('chat/conversations/group', { json: { name, member_ids: memberIds } })
      .json<ApiResponse<Conversation>>();

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to create group conversation');
  },

  /**
   * Get all conversations for the current user, sorted by latest message first.
   * Each item includes last_message for preview rendering.
   */
  getConversations: async (): Promise<Conversation[]> => {
    const response = await api
      .get('chat/conversations')
      .json<ApiResponse<Conversation[]>>();

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch conversations');
  },

  /**
   * Get paginated message history for a conversation.
   * Returns newest first — caller must reverse() before rendering.
   */
  getMessages: async (
    conversationId: string,
    limit = 20,
    offset = 0,
  ): Promise<MessagesResponse> => {
    const response = await api
      .get(`chat/conversations/${conversationId}/messages`, {
        searchParams: { limit, offset },
      })
      .json<ApiResponse<MessagesResponse>>();

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch messages');
  },

  /**
   * Mark all messages in a conversation as read.
   * Call when the user opens a conversation or scrolls to the latest message.
   */
  markAsRead: async (conversationId: string): Promise<void> => {
    await api.post(`chat/conversations/${conversationId}/read`).json<ApiResponse<null>>();
  },

  /**
   * Get a single message (utility, not in primary flow but useful for edge cases)
   */
  getMessage: async (conversationId: string, messageId: string): Promise<Message> => {
    const messages = await chatApi.getMessages(conversationId, 1, 0);
    const found = messages.messages.find((m) => m.id === messageId);
    if (!found) throw new Error('Message not found');
    return found;
  },
};
