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
    <div className={`input-wrapper ${fullWidth ? 'input-full' : ''}`}>
      {label && <label className="input-label">{label}</label>}
      <div className={`input-container ${hasError ? 'input-error' : ''}`}>
        {startIcon && <span className="input-icon input-icon-start">{startIcon}</span>}
        <input
          className={`input ${startIcon ? 'input-with-start-icon' : ''} ${endIcon ? 'input-with-end-icon' : ''} ${className}`}
          {...props}
        />
        {endIcon && <span className="input-icon input-icon-end">{endIcon}</span>}
      </div>
      {(error || helperText) && (
        <span className={`input-helper ${hasError ? 'input-helper-error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};