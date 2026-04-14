import { useState, useEffect, useCallback } from 'react';
import type { Blog } from '@/api/services/blogApi';
import { exploreApi } from '@/api/services/exploreApi';

export type ExploreTab = 'Trending' | 'Recent' | "Editors' Choice";

interface UseExploreBlogsReturn {
    blogs: Blog[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    hasMore: boolean;
    activeTab: ExploreTab;
    tabs: ExploreTab[];
    setActiveTab: (tab: ExploreTab) => void;
    handleLoadMore: () => void;
    retry: () => void;
}

export const useExploreBlogs = (): UseExploreBlogsReturn => {
    const tabs: ExploreTab[] = ['Trending', 'Recent', "Editors' Choice"];
    const [activeTab, setActiveTab] = useState<ExploreTab>('Trending');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchBlogs = useCallback(async (pageNum: number, tab: ExploreTab) => {
        try {
            setError(null);
            
            const response = await exploreApi.getExploreFeed(tab, pageNum, 12);
            
            if (pageNum === 1) {
                setBlogs(response.posts);
            } else {
                setBlogs(prev => [...prev, ...response.posts]);
            }

            setHasMore(pageNum < response.meta.total_pages);
        } catch (err) {
            setError('Failed to load stories. Please try again later.');
            console.error('Error fetching explore blogs:', err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    // Initial load and refetch on tab change
    useEffect(() => {
        setBlogs([]);
        setPage(1);
        setHasMore(true);
        setLoading(true);
        fetchBlogs(1, activeTab);
    }, [activeTab, fetchBlogs]);

    const handleLoadMore = useCallback(() => {
        if (loadingMore || !hasMore) return;
        
        const nextPage = page + 1;
        setPage(nextPage);
        setLoadingMore(true);
        fetchBlogs(nextPage, activeTab);
    }, [page, activeTab, loadingMore, hasMore, fetchBlogs]);

    const retry = useCallback(() => {
        setLoading(true);
        fetchBlogs(1, activeTab);
    }, [activeTab, fetchBlogs]);

    return {
        blogs,
        loading,
        loadingMore,
        error,
        hasMore,
        activeTab,
        tabs,
        setActiveTab,
        handleLoadMore,
        retry,
    };
};
