import React from 'react';
import '@/pages/Profile/Profile.css';

interface ProfileCoverProps {
    coverImage?: string;
    avatar?: string;
    isOwnProfile: boolean;
    onAvatarClick?: () => void;
    onCoverClick?: () => void;
}

const DEFAULT_COVER_GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
const DEFAULT_AVATAR = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%239ca3af'/%3E%3Cellipse cx='50' cy='100' rx='35' ry='28' fill='%239ca3af'/%3E%3C/svg%3E`;

export const ProfileCover: React.FC<ProfileCoverProps> = ({
    coverImage,
    avatar,
    isOwnProfile,
    onAvatarClick,
    onCoverClick,
}) => {
    const coverStyle = coverImage
        ? { backgroundImage: `url(${coverImage})` }
        : { background: DEFAULT_COVER_GRADIENT };

    const avatarStyle = avatar
        ? { backgroundImage: `url(${avatar})` }
        : { backgroundImage: `url("${DEFAULT_AVATAR}")` };

    return (
        <div className="profile-cover-wrapper">
            <div className="profile-cover" style={coverStyle}>
                <div className="cover-overlay" />
                {isOwnProfile && (
                    <button
                        className="edit-cover-btn"
                        onClick={onCoverClick}
                        aria-label="Chỉnh sửa ảnh bìa"
                    >
                        <span className="material-symbols-outlined">photo_camera</span>
                        <span className="edit-cover-btn__text">Đổi ảnh bìa</span>
                    </button>
                )}
            </div>

            <div className="profile-avatar-wrapper">
                <div className="profile-avatar-container">
                    <div
                        className="profile-avatar"
                        style={avatarStyle}
                    />
                    {isOwnProfile && (
                        <button
                            className="edit-avatar-btn"
                            onClick={onAvatarClick}
                            aria-label="Chỉnh sửa ảnh đại diện"
                        >
                            <span className="material-symbols-outlined">photo_camera</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};