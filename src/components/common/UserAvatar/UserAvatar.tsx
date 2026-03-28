import React from 'react';
import './UserAvatar.css';

interface UserAvatarProps {
    avatarUrl?: string | null;
    name?: string | null;
    size?: number;
    className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
    avatarUrl,
    name,
    size = 2,
    className = '',
}) => {
    const initial = (name || 'U').trim().charAt(0).toUpperCase();
    const style: React.CSSProperties = {
        width: `${size}rem`,
        height: `${size}rem`,
        fontSize: `${size * 0.45}rem`,
        flexShrink: 0,
    };

    return (
        <div className={`user-avatar-root ${className}`} style={style}>
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={name || 'avatar'}
                    className="user-avatar-img"
                    onError={(e) => {
                        // Gracefully fall back to initials if image fails to load
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
                        if (sibling) sibling.style.display = 'flex';
                    }}
                />
            ) : null}
            <div
                className="user-avatar-initials"
                style={{ display: avatarUrl ? 'none' : 'flex', fontSize: `${size * 0.45}rem` }}
            >
                {initial}
            </div>
        </div>
    );
};
