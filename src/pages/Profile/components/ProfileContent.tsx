import React from 'react';
import { ProfileTabs } from './ProfileTabs';
import { SearchBar } from './SearchBar';
import { BlogPostsGrid } from './BlogPostsGrid';
import { MemoryJournalGrid } from './MemoryJournalGrid';
import { MemoryJourneysList } from './MemoryJourneysList';
import '@/pages/Profile/Profile.css';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readTime: string;
    likes: number;
    comments: number;
}

interface JournalEntry {
    id: string;
    title: string;
    date: string;
    coverImage: string;
    tags: { icon: string; label: string }[];
}

interface Journey {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    category: string;
    categoryColor: string;
    entriesCount: number;
}

interface ProfileContentProps {
    activeTab: 'posts' | 'journal' | 'journeys';
    setActiveTab: (tab: 'posts' | 'journal' | 'journeys') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    blogPosts: BlogPost[];
    journalEntries: JournalEntry[];
    journeys: Journey[];
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    blogPosts,
    journalEntries,
    journeys,
}) => {
    return (
        <div className="profile-main">
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {activeTab === 'posts' && <BlogPostsGrid posts={blogPosts} />}

            {activeTab === 'journal' && <MemoryJournalGrid entries={journalEntries} />}

            {activeTab === 'journeys' && <MemoryJourneysList journeys={journeys} />}
        </div>
    );
};