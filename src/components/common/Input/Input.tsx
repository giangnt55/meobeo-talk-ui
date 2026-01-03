import React from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const hasError = !!error;

  return (
    <div className={`custom-input-wrapper ${fullWidth ? 'custom-input-full' : ''}`}>
      {label && <label className="custom-input-label">{label}</label>}
      <div className={`custom-input-container ${hasError ? 'custom-input-error' : ''}`}>
        {startIcon && <span className="custom-input-icon custom-input-icon-start">{startIcon}</span>}
        <input
          className={`custom-input ${startIcon ? 'custom-input-with-start-icon' : ''} ${endIcon ? 'custom-input-with-end-icon' : ''} ${className}`}
          {...props}
        />
        {endIcon && <span className="custom-input-icon custom-input-icon-end">{endIcon}</span>}
      </div>
      {(error || helperText) && (
        <span className={`custom-input-helper ${hasError ? 'custom-input-helper-error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};