import React from 'react';
import { Modal } from './Modal';
import './ModalVariants.css';

// Confirmation Modal
export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'primary';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'primary',
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" closeOnBackdropClick={false}>
            <div className="modal-content-center">
                <h3 className="confirm-modal-title">{title}</h3>
                <p className="confirm-modal-message">{message}</p>
                <div className="confirm-modal-actions">
                    <button className={`confirm-btn confirm-btn-${variant}`} onClick={onConfirm}>
                        {confirmText}
                    </button>
                    <button className="confirm-btn confirm-btn-secondary" onClick={onClose}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

// Success Modal
export interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttonText?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
    buttonText = 'Close',
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" closeOnBackdropClick={false}>
            <div className="modal-content-center">
                <div className="success-icon">
                    <span className="material-symbols-outlined">check</span>
                </div>
                <h3 className="success-title">{title}</h3>
                <p className="success-message">{message}</p>
                <button className="success-btn" onClick={onClose}>
                    {buttonText}
                </button>
            </div>
        </Modal>
    );
};

// Info Modal
export interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon?: string;
    iconColor?: 'blue' | 'amber' | 'green' | 'red';
    children: React.ReactNode;
    buttonText?: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({
    isOpen,
    onClose,
    title,
    icon = 'info',
    iconColor = 'blue',
    children,
    buttonText = 'Understood',
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <div className="info-modal-content">
                <div className="info-modal-header">
                    <div className={`info-icon info-icon-${iconColor}`}>
                        <span className="material-symbols-outlined icon-filled">{icon}</span>
                    </div>
                    <h3 className="info-title">{title}</h3>
                </div>
                <div className="info-modal-body">{children}</div>
                <div className="info-modal-footer">
                    <button className="info-btn" onClick={onClose}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
