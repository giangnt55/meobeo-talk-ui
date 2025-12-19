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
                    Blog Posts
                </button>
                <button
                    className={`tab-item ${activeTab === 'journal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('journal')}
                >
                    Memory Journal
                </button>
                <button
                    className={`tab-item ${activeTab === 'journeys' ? 'active' : ''}`}
                    onClick={() => setActiveTab('journeys')}
                >
                    Memory Journeys
                </button>
            </nav>
        </div>
    );
};