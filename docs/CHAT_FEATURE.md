# 💬 Chat Feature — Tổng quan kỹ thuật

> **meobeo-talk-ui** — Last updated: 2026-08-16

---

## Mục lục

- [Kiến trúc tổng quan](#kiến-trúc-tổng-quan)
- [Cấu trúc file](#cấu-trúc-file)
- [Luồng dữ liệu](#luồng-dữ-liệu)
- [Types](#types)
- [API (REST)](#api-rest)
- [WebSocket](#websocket)
- [Redux Store](#redux-store)
- [Hook: useChat](#hook-usechat)
- [Components](#components)
- [Cách tạo cuộc trò chuyện](#cách-tạo-cuộc-trò-chuyện)
- [Điều hướng trực tiếp đến cuộc trò chuyện](#điều-hướng-trực-tiếp-đến-cuộc-trò-chuyện)
- [Những thứ chưa có / TODO](#những-thứ-chưa-có--todo)

---

## Kiến trúc tổng quan

```
User Action
    │
    ▼
useChat (hook)          ←── WebSocket (socketService)
    │                              │
    ├── chatApi (REST)             │  real-time messages
    │       │                     │
    │       ▼                     ▼
    └── Redux (chatSlice)  ←─────────────────
              │
              ▼
         Components (React)
              │
    ┌─────────┴──────────┐
    │                    │
ConversationList     ChatWindow
(sidebar)            (main area)
    │                    │
ConversationItem    MessageBubble
                    MessageInput
```

**Luồng đơn giản:**
1. Vào `/chat` → `loadConversations()` → REST API → Redux store
2. Click vào conversation → `openConversation()` → load messages → render
3. Gửi tin → WebSocket → server echo → Redux → re-render
4. Tin đến từ người khác → WebSocket event → Redux → unread badge tăng

---

## Cấu trúc file

```
src/
├── types/
│   └── chat.ts                          # Toàn bộ TypeScript types
│
├── api/services/
│   └── chatApi.ts                       # REST API calls
│
├── store/
│   └── chatSlice.ts                     # Redux state + reducers
│
├── hooks/
│   └── useChat.ts                       # Facade hook — dùng trong components
│
├── pages/Chat/
│   ├── index.tsx                        # Chat page (layout chính)
│   └── Chat.css                         # Styles của page
│
└── components/features/Chat/
    ├── EmptyChat.tsx                    # Placeholder khi chưa chọn conv
    ├── ConversationList/
    │   ├── ConversationList.tsx         # Danh sách conversations (sidebar)
    │   └── ConversationItem.tsx         # Từng conversation item
    └── ChatWindow/
        ├── ChatWindow.tsx               # Khung chat chính + scroll logic
        ├── ChatWindow.css
        ├── MessageBubble.tsx            # Từng tin nhắn
        └── MessageInput.tsx             # Ô nhập tin nhắn
```

---

## Luồng dữ liệu

### Khi load trang `/chat`

```
ChatPage mount
  └─ useEffect → conversationsLoaded === false
       └─ loadConversations()
            └─ chatApi.getConversations()        GET /chat/conversations
                 └─ dispatch(setConversations([...]))
                      └─ ConversationList re-render
```

### Khi mở một conversation

```
User click ConversationItem
  └─ onSelect(convId) → openConversation(convId)
       ├─ dispatch(setActiveConversation(convId))
       ├─ dispatch(clearUnread(convId))
       └─ messagesByConv[convId] chưa có?
            └─ chatApi.getMessages(convId, 20, 0)  GET /chat/conversations/:id/messages
                 └─ dispatch(setMessages({ items: [...].reverse(), ... }))
                      └─ ChatWindow render messages
```

### Khi gửi tin nhắn

```
User type + Enter (hoặc click Send)
  └─ onSend(convId, content) → sendMessage(convId, content)
       └─ socketService.send(JSON.stringify({ type: 'chat_message', ... }))
            └─ Server nhận → broadcast lại
                 └─ WS onMessage handler:
                      ├─ dispatch(appendMessage(msg))      → thêm vào cuối messages
                      └─ dispatch(updateLastMessage(msg))  → cập nhật preview sidebar
```

### Khi nhận tin nhắn real-time từ người khác

```
WS onMessage event
  └─ payload.type === 'chat_message'
       ├─ dispatch(appendMessage(msg))
       ├─ dispatch(updateLastMessage(msg))       → bubble conv lên đầu sidebar
       └─ msg.conversation_id !== activeConvId?
            ├─ YES → dispatch(incrementUnread(convId))  → badge đỏ tăng
            └─ NO  → chatApi.markAsRead(convId)         → tự động đánh dấu đã đọc
```

---

## Types

File: `src/types/chat.ts`

| Type | Mô tả |
|------|-------|
| `UserSummary` | Thông tin cơ bản user (id, username, display_name, avatar_url) |
| `ConversationParticipant` | Thành viên của cuộc trò chuyện, kèm `user?: UserSummary` |
| `Message` | Một tin nhắn (id, content, sender_id, message_type, timestamps, deleted_at) |
| `Conversation` | Cuộc trò chuyện (id, type: `'dm'/'group'`, name, participants, last_message) |
| `MessagesResponse` | Kết quả phân trang tin nhắn (`messages[]`, total, limit, offset) |
| `WSSendPayload` | Payload gửi qua WebSocket |
| `WSReceivePayload` | Payload nhận từ WebSocket |
| `ConvMessagesState` | State Redux cho messages của 1 conversation (items, total, offset, loading, hasMore) |

---

## API (REST)

File: `src/api/services/chatApi.ts`

| Function | Method | Endpoint | Mô tả |
|----------|--------|----------|-------|
| `getConversations()` | GET | `/chat/conversations` | Lấy tất cả conversations, sorted by latest message |
| `getOrCreateDm(targetUserId)` | POST | `/chat/conversations/dm` | Tạo hoặc lấy DM với user khác (idempotent) |
| `createGroup(name, memberIds)` | POST | `/chat/conversations/group` | Tạo group chat mới |
| `getMessages(convId, limit, offset)` | GET | `/chat/conversations/:id/messages` | Lấy tin nhắn phân trang (newest-first từ server) |
| `markAsRead(convId)` | POST | `/chat/conversations/:id/read` | Đánh dấu đã đọc |

> **Lưu ý:** `getMessages` trả về **newest-first** (mới nhất trước).
> Hook `useChat` tự động `.reverse()` trước khi đưa vào store để render đúng thứ tự.

---

## WebSocket

File: `src/api/services/socketService.ts`

- **Gửi tin:** `socketService.send(JSON.stringify(payload))` với `WSSendPayload`
- **Nhận tin:** `socketService.onMessage(callback)` — trả về unsubscribe function
- Được đăng ký trong `useChat` qua `useEffect` khi hook mount

**Payload gửi:**
```json
{
  "type": "chat_message",
  "conversation_id": "uuid",
  "content": "Nội dung tin nhắn"
}
```

**Payload nhận:**
```json
{
  "type": "chat_message",
  "data": { "...": "Message object" }
}
```

---

## Redux Store

File: `src/store/chatSlice.ts`

### State shape

```typescript
{
  conversations: Conversation[];       // Danh sách sidebar
  conversationsLoaded: boolean;        // Đã load lần đầu chưa
  activeConversationId: string | null; // ID conv đang mở
  messagesByConv: Record<string, ConvMessagesState>; // Messages theo convId
  unreadCount: Record<string, number>; // Badge đỏ theo convId
}
```

### Reducers

| Action | Tác dụng |
|--------|---------|
| `setConversations(convs[])` | Thay toàn bộ danh sách conversations |
| `upsertConversation(conv)` | Thêm hoặc cập nhật 1 conversation |
| `setActiveConversation(id)` | Chọn conversation đang mở |
| `setMessages({ convId, items, total, offset })` | Load lần đầu messages |
| `setMessagesLoading({ convId, loading })` | Bật/tắt loading state |
| `prependMessages({ convId, items, ... })` | Load thêm tin cũ hơn (scroll lên) |
| `appendMessage(msg)` | Thêm tin mới real-time vào cuối |
| `updateLastMessage(msg)` | Cập nhật preview sidebar + bubble conv lên đầu |
| `incrementUnread(convId)` | Tăng badge đỏ |
| `clearUnread(convId)` | Xóa badge đỏ (khi mở conversation) |

---

## Hook: useChat

File: `src/hooks/useChat.ts`

Đây là **facade** duy nhất — toàn bộ component chỉ cần dùng hook này, không gọi API hay dispatch trực tiếp.

### Trả về

```typescript
const {
  // State
  conversations,           // Conversation[] — dùng cho sidebar
  conversationsLoaded,     // boolean — tránh load lại
  activeConversationId,    // string | null
  activeConversation,      // Conversation | null — conv đang mở
  activeMessages,          // Message[] — messages của conv đang mở
  messagesByConv,          // Record<string, ConvMessagesState>
  unreadCount,             // Record<string, number>

  // Actions
  loadConversations,       // () => Promise<void>
  openConversation,        // (convId: string) => Promise<void>
  loadMoreMessages,        // (convId: string) => Promise<void>
  sendMessage,             // (convId: string, content: string) => void
  getOrCreateDm,           // (targetUserId: string) => Promise<Conversation>
} = useChat();
```

---

## Components

### `ChatPage` — `src/pages/Chat/index.tsx`

Layout chính gồm 2 cột:
- **Sidebar** (`<aside>`): `ConversationList` + skeleton loading
- **Main** (`<main>`): `ChatWindow` hoặc `EmptyChat`

Hỗ trợ deep link: `/chat?convId=<id>` → tự động mở conversation đó.

---

### `ConversationList` — `src/components/features/Chat/ConversationList/ConversationList.tsx`

Nhận `conversations[]` và render danh sách `ConversationItem`.

Props:
- `conversations: Conversation[]`
- `activeConversationId: string | null`
- `currentUserId: string`
- `unreadCount: Record<string, number>`
- `onSelect: (convId: string) => void`

---

### `ConversationItem` — `src/components/features/Chat/ConversationList/ConversationItem.tsx`

Render từng dòng trong sidebar. Hiển thị:
- Avatar (ảnh hoặc initials / icon group)
- Tên conversation
- Preview tin nhắn cuối
- Thời gian relative (dùng `date-fns` + locale `vi`)
- Badge đỏ unread

---

### `ChatWindow` — `src/components/features/Chat/ChatWindow/ChatWindow.tsx`

Component chính của vùng chat. Xử lý:
- **Auto-scroll** xuống đáy khi có tin mới (chỉ khi đang ở gần đáy)
- **Preserve scroll** khi load thêm tin cũ (tránh nhảy màn hình)
- **Infinite scroll up**: phát hiện scroll đến gần đầu → gọi `onLoadMore`
- Hiển thị header (tên + avatar)
- Render `MessageBubble` list + `MessageInput`

---

### `MessageBubble` — `src/components/features/Chat/ChatWindow/MessageBubble.tsx`

Render từng tin nhắn. Phân biệt:
- Tin của mình (`isOwn: true`): align phải, màu accent
- Tin của người khác: align trái, hiển thị avatar
- `showAvatar`: chỉ show avatar ở tin đầu tiên trong chuỗi cùng sender

---

### `MessageInput` — `src/components/features/Chat/ChatWindow/MessageInput.tsx`

Ô nhập tin nhắn. Hỗ trợ:
- Gửi bằng `Enter` (không xuống dòng)
- `Shift+Enter` để xuống dòng
- Tự resize theo nội dung

---

## Cách tạo cuộc trò chuyện

### 1. DM với một user khác

Gọi `getOrCreateDm` từ `useChat`. API này **idempotent** — nếu DM đã tồn tại, server trả về conversation cũ.

```tsx
const { getOrCreateDm, openConversation } = useChat();

const handleMessageUser = async (targetUserId: string) => {
  const conv = await getOrCreateDm(targetUserId);
  // Conversation tự động được upsert vào Redux store
  // Điều hướng sang trang chat và mở conversation
  navigate('/chat');
  openConversation(conv.id);
};
```

> **Use case điển hình:** Từ trang Profile, bấm nút "Nhắn tin" → gọi hàm này.

---

### 2. Tạo Group Chat

Hiện tại `chatApi.createGroup` đã sẵn sàng nhưng **chưa có UI**. Cần tự gọi:

```tsx
import { chatApi } from '@/api/services/chatApi';
import { upsertConversation, setActiveConversation } from '@/store/chatSlice';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();

const handleCreateGroup = async (name: string, memberIds: string[]) => {
  // memberIds: KHÔNG include bản thân — server tự thêm creator
  const conv = await chatApi.createGroup(name, memberIds);
  dispatch(upsertConversation(conv));
  dispatch(setActiveConversation(conv.id));
  navigate('/chat');
};
```

---

### 3. Điều hướng đến conversation có sẵn

Dùng query param, trang Chat tự xử lý:

```tsx
navigate('/chat?convId=<conversation-id>');
```

---

## Điều hướng trực tiếp đến cuộc trò chuyện

Trang Chat hỗ trợ deep link qua URL:

```
/chat?convId=<uuid>
```

Khi `searchParams.get('convId')` có giá trị, `openConversation` được gọi tự động.

---

## Những thứ chưa có / TODO

| Tính năng | Trạng thái | Ghi chú |
|-----------|-----------|---------|
| Tạo group chat (UI) | ❌ Chưa có | API `createGroup` đã ready |
| Tìm kiếm conversations | ❌ Chưa có | |
| Tìm kiếm user để DM | ❌ Chưa có | Cần kết hợp với user search API |
| Nút "New Message" trong sidebar | ❌ Chưa có | Entry point tạo DM từ Chat page |
| Xóa / thu hồi tin nhắn | ❌ Chưa có | Field `deleted_at` đã có trong type |
| Upload ảnh / file | ❌ Chưa có | `message_type: 'image' \| 'file'` đã có trong type |
| Typing indicator | ❌ Chưa có | Cần thêm WS event type |
| Online/offline status | ❌ Chưa có | |
| Notification khi ở tab khác | ❌ Chưa có | |
| Group: thêm/xóa thành viên | ❌ Chưa có | |
