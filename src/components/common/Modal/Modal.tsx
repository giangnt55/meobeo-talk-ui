import React, { useEffect } from 'react';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdropClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdropClick = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width before hiding it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Add padding to prevent layout shift
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.removeProperty('--scrollbar-width');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.removeProperty('--scrollbar-width');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`modal modal-${size}`}>
        {title && (
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};