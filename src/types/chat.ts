// ─── Chat Types ───────────────────────────────────────────────────────────────
// Mirrors the backend spec in docs/CHAT_UI_INTEGRATION.md

export interface UserSummary {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

export interface ConversationParticipant {
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_at: string | null;
  user?: UserSummary;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  created_at: string; // ISO 8601
  updated_at: string;
  deleted_at: string | null;
  sender?: UserSummary;
}

export interface Conversation {
  id: string;
  type: 'dm' | 'group';
  name: string | null; // null for DM, has value for group
  created_by: string;
  created_at: string; // ISO 8601
  updated_at: string;
  participants?: ConversationParticipant[];
  last_message?: Message | null;
}

export interface MessagesResponse {
  messages: Message[];
  total: number;
  limit: number;
  offset: number;
}

// WebSocket payloads
export interface WSSendPayload {
  type: 'chat_message';
  conversation_id: string;
  content: string;
}

export type WSReceivePayload =
  | { type: 'chat_message'; data: Message }
  | { type: 'new_follow' | 'new_like' | 'new_comment'; data: unknown; timestamp: string };

// Per-conversation messages state
export interface ConvMessagesState {
  items: Message[];
  total: number;
  offset: number;
  loading: boolean;
  hasMore: boolean;
}
