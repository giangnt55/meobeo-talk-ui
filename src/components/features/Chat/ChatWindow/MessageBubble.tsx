import React from 'react';
import type { Message } from '@/types/chat';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean; // show sender avatar for first message in a run
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn, showAvatar }) => {
  const isDeleted = !!message.deleted_at;
  const timeStr = format(new Date(message.created_at), 'HH:mm', { locale: vi });

  return (
    <div className={`msg-bubble-row ${isOwn ? 'msg-bubble-row--own' : 'msg-bubble-row--other'}`}>
      {/* Other user avatar */}
      {!isOwn && (
        <div className="msg-bubble-avatar">
          {showAvatar ? (
            message.sender?.avatar_url ? (
              <img
                src={message.sender.avatar_url}
                alt={message.sender.display_name || message.sender.username}
                className="msg-bubble-avatar__img"
              />
            ) : (
              <div className="msg-bubble-avatar__placeholder">
                {(message.sender?.display_name || message.sender?.username || '?')
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )
          ) : (
            <div className="msg-bubble-avatar__spacer" />
          )}
        </div>
      )}

      {/* Bubble + meta */}
      <div className="msg-bubble-body">
        {/* Sender name (for group) — only on first in run */}
        {!isOwn && showAvatar && message.sender?.display_name && (
          <span className="msg-bubble-sender">
            {message.sender.display_name || message.sender.username}
          </span>
        )}

        <div className={`msg-bubble ${isOwn ? 'msg-bubble--own' : 'msg-bubble--other'} ${isDeleted ? 'msg-bubble--deleted' : ''}`}>
          {isDeleted ? (
            <span className="msg-bubble__deleted">
              <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', verticalAlign: 'middle' }}>
                block
              </span>
              {' '}Tin nhắn đã bị xóa
            </span>
          ) : (
            <span className="msg-bubble__text">{message.content}</span>
          )}
        </div>

        <span className="msg-bubble-time">{timeStr}</span>
      </div>
    </div>
  );
};
