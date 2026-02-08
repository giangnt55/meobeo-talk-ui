import React from 'react';
import '@/pages/Profile/Profile.css';

interface ProfileTabsProps {
    activeTab: 'posts' | 'journal' | 'journeys';
    setActiveTab: (tab: 'posts' | 'journal' | 'journeys') => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
    activeTab,
    setActiveTab,
}) => {
    return (
        <div className="profile-tabs">
            <nav className="tabs-nav">
                <button
                    className={`tab-item ${activeTab === 'posts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('posts')}
                >
                    Bài Viết
                </button>
                <button
                    className={`tab-item ${activeTab === 'journal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('journal')}
                >
                    Nhật Ký Ký Ức
                </button>
                <button
                    className={`tab-item ${activeTab === 'journeys' ? 'active' : ''}`}
                    onClick={() => setActiveTab('journeys')}
                >
                    Hành Trình Ký Ức
                </button>
            </nav>
        </div>
    );
};