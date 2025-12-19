import React from 'react';
import '@/pages/Profile/Profile.css';

interface ProfileCoverProps {
    coverImage: string;
    avatar: string;
    isOwnProfile: boolean;
}

export const ProfileCover: React.FC<ProfileCoverProps> = ({
    coverImage,
    avatar,
    isOwnProfile,
}) => {
    return (
        <div className="profile-cover-wrapper">
            <div
                className="profile-cover"
                style={{ backgroundImage: `url(${coverImage})` }}
            >
                <div className="cover-overlay"></div>
                {isOwnProfile && (
                    <button className="edit-cover-btn">
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                )}
            </div>

            <div className="profile-avatar-wrapper">
                <div className="profile-avatar-container">
                    <div
                        className="profile-avatar"
                        style={{ backgroundImage: `url(${avatar})` }}
                    />
                    {isOwnProfile && (
                        <button className="edit-avatar-btn">
                            <span className="material-symbols-outlined">photo_camera</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};