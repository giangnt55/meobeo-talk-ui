import { useState, useEffect, useCallback } from 'react';
import { blogApi } from '@/api/services/blogApi';
import { feedApi, type TrendingPost, type Collection } from '@/api/services/feedApi';
import { followApi } from '@/api/services/followApi';
import { categoryApi, type Category } from '@/api/services/categoryApi';
import type { SuggestedUser } from '@/schemas/onboarding.schema';

export type FeedTab = 'following' | 'trending' | 'collections';

export interface FeedState {
    blogs: TrendingPost[];
    collections: Collection[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    trendingWindow: 'day' | 'week' | 'month';
    activeTab: FeedTab;
    suggestedUsers: SuggestedUser[];
    followingIds: Set<string>;
    categories: Category[];
}

export function useFeedData(isAuthenticated: boolean) {
    const [activeTab, setActiveTab] = useState<FeedTab>('trending');
    const [blogs, setBlogs] = useState<TrendingPost[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [trendingWindow, setTrendingWindow] = useState<'day' | 'week' | 'month'>('week');

    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
    const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchTab = useCallback(
        async (tab: FeedTab, pageNum: number, isReplace: boolean) => {
            try {
                if (isReplace) setLoading(true);
                else setLoadingMore(true);
                setError(null);

                if (tab === 'following') {
                    if (!isAuthenticated) {
                        setBlogs([]);
                        setHasMore(false);
                        return;
                    }
                    const res = await feedApi.getFollowingFeed({ page: pageNum, limit: 10 });
                    setBlogs((prev) =>
                        isReplace ? (res.posts as TrendingPost[]) : [...prev, ...res.posts as TrendingPost[]]
                    );
                    setHasMore(pageNum < res.meta.total_pages);

                } else if (tab === 'trending') {
                    const res = await feedApi.getTrendingFeed({
                        page: pageNum,
                        limit: 10,
                        window: trendingWindow,
                    });
                    setBlogs((prev) =>
                        isReplace ? res.posts : [...prev, ...res.posts]
                    );
                    setHasMore(pageNum < res.meta.total_pages);

                } else {
                    const res = await feedApi.getCollectionsFeed({ page: pageNum, limit: 12 });
                    setCollections((prev) =>
                        isReplace ? res.collections : [...prev, ...res.collections]
                    );
                    setHasMore(pageNum < res.meta.total_pages);
                }

                setPage(pageNum);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Không tải được bài viết');
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        },
        [activeTab, isAuthenticated, trendingWindow]
    );

    // Reload when tab or window changes
    useEffect(() => {
        setBlogs([]);
        setCollections([]);
        setPage(1);
        setHasMore(false);
        fetchTab(activeTab, 1, true);
    }, [activeTab, trendingWindow]);

    // Sidebar data
    useEffect(() => {
        followApi.getSuggestedUsers(4)
            .then(setSuggestedUsers)
            .catch((err) => console.warn('Failed to load suggested users', err));

        categoryApi.getCategories()
            .then(setCategories)
            .catch((err) => console.warn('Failed to load categories', err));
    }, []);

    const handleFollow = async (userId: string) => {
        try {
            await followApi.followUser(userId);
            setFollowingIds((prev) => new Set([...prev, userId]));
        } catch (err) {
            console.warn('Failed to follow user', err);
        }
    };

    const handleLikeToggle = useCallback(async (blogId: string) => {
        setBlogs((prev) =>
            prev.map((b) =>
                b.id !== blogId ? b : {
                    ...b,
                    is_liked: !b.is_liked,
                    reaction_count: b.is_liked ? b.reaction_count - 1 : b.reaction_count + 1,
                }
            )
        );
        try {
            const result = await blogApi.toggleBlogLike(blogId);
            setBlogs((prev) =>
                prev.map((b) =>
                    b.id !== blogId ? b : { ...b, is_liked: result.liked, reaction_count: result.count }
                )
            );
        } catch {
            setBlogs((prev) =>
                prev.map((b) =>
                    b.id !== blogId ? b : {
                        ...b,
                        is_liked: !b.is_liked,
                        reaction_count: b.is_liked ? b.reaction_count - 1 : b.reaction_count + 1,
                    }
                )
            );
        }
    }, []);

    const handleSaveToggle = useCallback(async (blogId: string) => {
        setBlogs((prev) =>
            prev.map((b) =>
                b.id !== blogId ? b : {
                    ...b,
                    is_saved: !b.is_saved,
                    save_count: b.is_saved ? b.save_count - 1 : b.save_count + 1,
                }
            )
        );
        try {
            const result = await blogApi.toggleSaveBlog(blogId);
            setBlogs((prev) =>
                prev.map((b) =>
                    b.id !== blogId ? b : { ...b, is_saved: result.saved }
                )
            );
        } catch {
            setBlogs((prev) =>
                prev.map((b) =>
                    b.id !== blogId ? b : {
                        ...b,
                        is_saved: !b.is_saved,
                        save_count: b.is_saved ? b.save_count - 1 : b.save_count + 1,
                    }
                )
            );
        }
    }, []);

    return {
        // state
        activeTab, setActiveTab,
        blogs, collections,
        loading, loadingMore,
        error, page, hasMore,
        trendingWindow, setTrendingWindow,
        suggestedUsers, followingIds,
        categories,
        // actions
        fetchTab,
        handleFollow,
        handleLikeToggle,
        handleSaveToggle,
        handleLoadMore: () => { if (!loadingMore && hasMore) fetchTab(activeTab, page + 1, false); },
    };
}
