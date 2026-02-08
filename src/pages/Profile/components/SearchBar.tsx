import React from 'react';
import '@/pages/Profile/Profile.css';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    searchQuery,
    setSearchQuery,
}) => {
    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button className="filter-btn">
                <span className="material-symbols-outlined">tune</span>
            </button>
        </div>
    );
};