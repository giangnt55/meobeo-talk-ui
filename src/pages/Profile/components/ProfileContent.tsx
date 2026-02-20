import React from 'react';
import { ProfileTabs } from './ProfileTabs';
import { SearchBar } from './SearchBar';
import { BlogPostsGrid } from './BlogPostsGrid';
import { MemoryJournalGrid } from './MemoryJournalGrid';
import { MemoryJourneysList } from './MemoryJourneysList';
import type { Blog } from '@/api/services/blogApi';
import type { Post } from '@/types/post';
import '@/pages/Profile/Profile.css';

interface ProfileContentProps {
    activeTab: 'posts' | 'journal' | 'journeys';
    setActiveTab: (tab: 'posts' | 'journal' | 'journeys') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    blogPosts: Blog[];
    blogsLoading?: boolean;
    journeys: Post[];
    journeysLoading?: boolean;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    blogPosts,
    blogsLoading,
    journeys,
    journeysLoading,
}) => {
    // Filter blogs by search query
    const filteredBlogPosts = searchQuery
        ? blogPosts.filter(
            (p) =>
                p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.content_preview?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : blogPosts;

    // Filter journeys by search query
    const filteredJourneys = searchQuery
        ? journeys.filter(
            (j) =>
                j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                j.content_preview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                j.journey_location?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : journeys;

    return (
        <div className="profile-main">
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {activeTab === 'posts' && (
                <BlogPostsGrid posts={filteredBlogPosts} loading={blogsLoading} />
            )}

            {activeTab === 'journal' && <MemoryJournalGrid entries={[]} />}

            {activeTab === 'journeys' && (
                <MemoryJourneysList journeys={filteredJourneys} loading={journeysLoading} />
            )}
        </div>
    );
};