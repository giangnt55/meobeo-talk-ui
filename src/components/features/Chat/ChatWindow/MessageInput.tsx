import React, { useState, useRef, useCallback } from 'react';
import { socketService } from '@/api/services/socketService';

interface MessageInputProps {
  conversationId: string;
  onSend: (convId: string, content: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ conversationId, onSend }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (!socketService.isConnected()) {
      // TODO: could queue for later
      console.warn('WS not connected — message not sent');
      return;
    }

    onSend(conversationId, trimmed);
    setValue('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, conversationId, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // Auto-resize textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  };

  const isConnected = socketService.isConnected();

  return (
    <div className="msg-input-bar">
      <textarea
        ref={textareaRef}
        className="msg-input-textarea"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={isConnected ? 'Nhắn tin… (Enter để gửi)' : 'Đang kết nối lại…'}
        rows={1}
        disabled={!isConnected}
        aria-label="Message input"
        id="chat-message-input"
      />
      <button
        className="msg-input-send-btn"
        onClick={handleSend}
        disabled={!value.trim() || !isConnected}
        aria-label="Gửi tin nhắn"
      >
        <span className="material-symbols-outlined">send</span>
      </button>
    </div>
  );
};
