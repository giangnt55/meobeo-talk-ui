import React, { useEffect } from 'react';
import './Toast.css';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastIcons = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div className={`toast toast-${type}`} role="alert">
      <div className="toast-content">
        <div className="toast-icon">
          <span className="toast-icon-symbol">{toastIcons[type]}</span>
        </div>
        <div className="toast-body">
          <p className="toast-title">{title}</p>
          <p className="toast-message">{message}</p>
        </div>
        <button className="toast-close" onClick={() => onClose(id)}>
          ×
        </button>
      </div>
      <div className={`toast-progress toast-progress-${type}`}>
        <div
          className="toast-progress-bar"
          style={{ animation: `progress ${duration}ms linear` }}
        />
      </div>
    </div>
  );
};