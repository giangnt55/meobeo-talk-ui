import React from 'react';

export const EmptyChat: React.FC = () => {
  return (
    <div className="empty-chat">
      <div className="empty-chat__illustration">
        <div className="empty-chat__bubble empty-chat__bubble--1">
          <span className="material-symbols-outlined">chat</span>
        </div>
        <div className="empty-chat__bubble empty-chat__bubble--2">
          <span className="material-symbols-outlined">favorite</span>
        </div>
        <div className="empty-chat__bubble empty-chat__bubble--3">
          <span className="material-symbols-outlined">emoji_emotions</span>
        </div>
      </div>
      <h2 className="empty-chat__title">Chào mừng đến với Tin nhắn</h2>
      <p className="empty-chat__subtitle">
        Chọn một cuộc trò chuyện bên trái để bắt đầu nhắn tin,
        <br />
        hoặc ghé thăm trang cá nhân của ai đó để gửi tin nhắn.
      </p>
    </div>
  );
};
