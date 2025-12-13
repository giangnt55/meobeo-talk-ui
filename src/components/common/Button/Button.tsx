import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  loadingText,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    `btn-rounded-${rounded}`,
    fullWidth && 'btn-full',
    isLoading && 'btn-loading',
    (isLoading && loadingText) && 'btn-loading-text',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="btn-spinner"></span>}
      {!isLoading && leftIcon && <span className="btn-left-icon">{leftIcon}</span>}
      <span className="btn-content">{loadingText && isLoading ? loadingText : children}</span>
      {!isLoading && rightIcon && <span className="btn-right-icon">{rightIcon}</span>}
    </button>
  );
};