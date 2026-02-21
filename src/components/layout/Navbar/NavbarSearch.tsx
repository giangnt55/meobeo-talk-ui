import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { feedApi, type SearchPost } from '@/api/services/feedApi';
import { getContentPreview } from '@/api/services/blogApi';
import './NavbarSearch.css';

export const NavbarSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<SearchPost[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const navigate = useNavigate();
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setIsMobileSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults(null);
            setIsSearching(false);
            return;
        }

        const performSearch = async () => {
            setIsSearching(true);
            setError(null);
            try {
                const data = await feedApi.searchPosts(debouncedQuery, { limit: 6 });
                setResults(data.posts || []);
                setIsDropdownOpen(true);
            } catch (err: any) {
                setError(err.message || 'Có lỗi xảy ra khi tìm kiếm');
                setResults(null);
                setIsDropdownOpen(true);
            } finally {
                setIsSearching(false);
            }
        };

        performSearch();
    }, [debouncedQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (!isDropdownOpen && e.target.value.trim().length > 0) {
            setIsDropdownOpen(true);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults(null);
        setIsDropdownOpen(false);
    };

    const handleResultClick = (path: string) => {
        navigate(path);
        setIsDropdownOpen(false);
        setIsMobileSearchOpen(false);
        setQuery('');
    };

    const hasNoResults = results && results.length === 0;

    return (
        <div className={`navbar-search-container ${isMobileSearchOpen ? 'mobile-open' : ''}`} ref={searchContainerRef}>
            {/* Mobile Toggle Button */}
            <button
                className="mobile-search-toggle"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                aria-label="Toggle search"
            >
                <span className="material-symbols-outlined">search</span>
            </button>

            <div className="search-input-wrapper flex items-center relative">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm..."
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => query.trim() && setIsDropdownOpen(true)}
                    aria-label="Search"
                />
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-1 top-1 bottom-1 
                            flex items-center justify-center
                            w-8 rounded-full
                            text-slate-400 hover:text-red-500
                            hover:bg-red-100
                            transition-colors"
                    >
                        <span className="material-symbols-outlined text-[16px] leading-none block">close</span>
                    </button>
                )}
            </div>

            {isDropdownOpen && query.trim() && (
                <div className="search-dropdown">
                    {isSearching ? (
                        <div className="search-status">
                            <span className="search-loader"></span>
                            Đang tìm kiếm...
                        </div>
                    ) : error ? (
                        <div className="search-status error">{error}</div>
                    ) : hasNoResults ? (
                        <div className="search-status empty">Không tìm thấy kết quả nào cho "{query}"</div>
                    ) : (
                        <div className="search-results-content">
                            {results && results.length > 0 && (
                                <div className="search-section">
                                    <h4 className="search-section-title">Bài viết</h4>
                                    {results.map(post => (
                                        <div
                                            key={post.id}
                                            className="search-result-item"
                                            onClick={() => handleResultClick(`/blog/${post.id}`)}
                                        >
                                            <div className="result-icon">
                                                <span className="material-symbols-outlined">article</span>
                                            </div>
                                            <div className="result-info">
                                                <span className="result-title">
                                                    {post.title || post.content_preview || getContentPreview(post.content_html, 40) || 'Không có tiêu đề'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
