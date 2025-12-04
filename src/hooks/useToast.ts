import { useState, useCallback } from 'react';
import type { ToastProps } from '../components/common/Toast/Toast';

type ToastOptions = Omit<ToastProps, 'id' | 'onClose'>;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastProps = {
      ...options,
      id,
      onClose: (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      },
    };
    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message: string, duration?: number) => {
      return addToast({ type: 'success', title, message, duration });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, message: string, duration?: number) => {
      return addToast({ type: 'error', title, message, duration });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, message: string, duration?: number) => {
      return addToast({ type: 'info', title, message, duration });
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, message: string, duration?: number) => {
      return addToast({ type: 'warning', title, message, duration });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };
};