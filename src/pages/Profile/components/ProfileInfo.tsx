import React from 'react';
import '@/pages/Profile/Profile.css';

interface ProfileInfoProps {
    displayName: string;
    username: string;
    bio: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    };
    isOwnProfile: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
    displayName,
    username,
    bio,
    stats,
    isOwnProfile,
}) => {
    return (
        <div className="profile-info">
            <div className="profile-header">
                <h1 className="profile-name">{displayName}</h1>
                <p className="profile-username">@{username}</p>
            </div>

            <p className="profile-bio">{bio}</p>

            {/* Stats */}
            <div className="profile-stats">
                <div className="stat-item">
                    <span className="stat-value">{stats.posts}</span>
                    <span className="stat-label">Posts</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-value">{stats.followers.toLocaleString()}</span>
                    <span className="stat-label">Followers</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-value">{stats.following}</span>
                    <span className="stat-label">Following</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-actions">
                {isOwnProfile ? (
                    <button className="btn-edit-profile">Edit Profile</button>
                ) : (
                    <>
                        <button className="btn-follow">Follow</button>
                        <button className="btn-message">Message</button>
                    </>
                )}
            </div>
        </div>
    );
};
