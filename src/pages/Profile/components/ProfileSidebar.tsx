import React from 'react';
import { ProfileInfo } from './ProfileInfo';
import { SocialLinks } from './SocialLinks';
import '@/pages/Profile/Profile.css';

interface ProfileSidebarProps {
    userData: {
        displayName: string;
        username: string;
        bio: string;
        stats: {
            posts: number;
            followers: number;
            following: number;
        };
        socialLinks: Array<{
            name: string;
            icon: string;
            url: string;
        }>;
    };
    isOwnProfile: boolean;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
    userData,
    isOwnProfile,
}) => {
    return (
        <aside className="profile-sidebar">
            <ProfileInfo
                displayName={userData.displayName}
                username={userData.username}
                bio={userData.bio}
                stats={userData.stats}
                isOwnProfile={isOwnProfile}
            />

            <SocialLinks links={userData.socialLinks} />
        </aside>
    );
};