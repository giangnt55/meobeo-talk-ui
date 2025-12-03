import React from 'react';
import './Tag.css';

export interface TagProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  onRemove?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  icon,
  variant = 'default',
  size = 'md',
  onRemove,
  className = '',
}) => {
  return (
    <span className={`tag tag-${variant} tag-${size} ${className}`}>
      {icon && <span className="tag-icon">{icon}</span>}
      <span className="tag-content">{children}</span>
      {onRemove && (
        <button className="tag-remove" onClick={onRemove} type="button">
          ×
        </button>
      )}
    </span>
  );
};