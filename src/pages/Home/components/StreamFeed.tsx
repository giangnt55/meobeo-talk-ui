import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi, getContentPreview, type Blog } from '@/api/services/blogApi';
import { feedApi, type TrendingPost, type Collection } from '@/api/services/feedApi';
import { followApi } from '@/api/services/followApi';
import { categoryApi, type Category } from '@/api/services/categoryApi';
import type { SuggestedUser } from '@/schemas/onboarding.schema';
import { useAuth } from '@/hooks/useAuth';
import './StreamFeed.css';

// ─── Tab definition ───────────────────────────────────────────────────────────

/** Each tab hits a different backend route with different data logic. */
type FeedTab = 'following' | 'trending' | 'collections';

interface TabDef {
    key: FeedTab;
    label: string;
    requiresAuth?: boolean;
}

const TABS: TabDef[] = [
    { key: 'following', label: 'Đang theo dõi', requiresAuth: true },
    { key: 'trending', label: 'Thịnh hành' },
    { key: 'collections', label: 'Bộ sưu tập' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'short',
    });
}

function formatCount(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

function getTypeLabel(postType: string): string {
    if (postType === 'memory') return 'Ký Ức';
    if (postType === 'journey') return 'Hành Trình';
    return 'Blog';
}

function getTypeBadgeClass(postType: string): string {
    if (postType === 'memory') return 'memory';
    if (postType === 'journey') return 'journey';
    return 'blog';
}

function initials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

// ─── Article Card ─────────────────────────────────────────────────────────────

interface ArticleCardProps {
    blog: Blog;
    trendingScore?: number;
    onLikeToggle: (id: string) => void;
    onSaveToggle: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    blog,
    trendingScore,
    onLikeToggle,
    onSaveToggle,
}) => {
    const navigate = useNavigate();
    const authorName = blog.author.display_name || blog.author.username;
    const hasImage = !!(blog.banner_url || blog.thumbnail_url);
    const imgSrc = blog.banner_url || blog.thumbnail_url || '';
    const isPolaroid = blog.post_type === 'memory';

    // Derive preview from HTML on the frontend — no separate DB field needed in list resp
    const preview = getContentPreview(blog.content_html || '', 160);

    return (
        <article
            className={`stream-article${!hasImage ? ' no-image' : ''}`}
            onClick={() => navigate(`/blog/${blog.id}`)}
        >
            {/* Body */}
            <div className="stream-article-body">
                {/* Meta row */}
                <div className="stream-article-meta">
                    {blog.author.avatar_url ? (
                        <div
                            className="stream-meta-avatar"
                            style={{ backgroundImage: `url(${blog.author.avatar_url})` }}
                        />
                    ) : (
                        <div className="stream-meta-avatar">{initials(authorName)}</div>
                    )}
                    <span className="stream-meta-author">{authorName}</span>
                    <span className={`stream-type-badge ${getTypeBadgeClass(blog.post_type)}`}>
                        {getTypeLabel(blog.post_type)}
                    </span>
                    <span className="stream-meta-dot">•</span>
                    <span className="stream-meta-date">{formatDate(blog.created_at)}</span>
                    {blog.read_time_minutes > 0 && (
                        <>
                            <span className="stream-meta-dot">•</span>
                            <span className="stream-meta-date">
                                {blog.read_time_minutes} phút đọc
                            </span>
                        </>
                    )}
                    {trendingScore !== undefined && (
                        <>
                            <span className="stream-meta-dot">•</span>
                            <span className="stream-trending-badge">
                                🔥 {trendingScore.toFixed(1)}
                            </span>
                        </>
                    )}
                </div>

                {/* Title + Excerpt */}
                <div>
                    <h2 className="stream-article-title">{blog.title}</h2>
                    {/* content_preview is populated by backend at write-time.
                        Fall back to client-side extraction if missing (e.g. older posts). */}
                    {(blog.content_preview || preview) && (
                        <p className="stream-article-excerpt">
                            {blog.content_preview || preview}
                        </p>
                    )}
                </div>

                {/* Footer stats */}
                <div className="stream-article-footer">
                    <button
                        className={`stream-footer-stat stream-like-btn${blog.is_liked ? ' active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onLikeToggle(blog.id); }}
                        aria-label={blog.is_liked ? 'Bỏ thích' : 'Thích'}
                    >
                        <span className="material-symbols-outlined">
                            {blog.is_liked ? 'favorite' : 'favorite_border'}
                        </span>
                        <span>{formatCount(blog.reaction_count)}</span>
                    </button>

                    <div className="stream-footer-stat">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <span>{formatCount(blog.comment_count)}</span>
                    </div>

                    {/* save_count shown alongside bookmark icon */}
                    <div className="stream-footer-stat stream-save-count">
                        <span className="material-symbols-outlined">bookmark_border</span>
                        <span>{formatCount(blog.save_count)}</span>
                    </div>

                    <button
                        className={`stream-bookmark-btn${blog.is_saved ? ' active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onSaveToggle(blog.id); }}
                        aria-label={blog.is_saved ? 'Bỏ lưu' : 'Lưu bài'}
                    >
                        <span className="material-symbols-outlined">
                            {blog.is_saved ? 'bookmark' : 'bookmark_add'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Thumbnail */}
            {hasImage && (
                <div className={`stream-article-thumb${isPolaroid ? ' stream-polaroid' : ''}`}>
                    <img src={imgSrc} alt={blog.title || ''} loading="lazy" />
                </div>
            )}
        </article>
    );
};

// ─── Collections placeholder card ─────────────────────────────────────────────

const CollectionCard: React.FC<{ collection: Collection }> = ({ collection }) => (
    <div className="stream-collection-card">
        <div className="stream-collection-previews">
            {collection.preview_posts.slice(0, 3).map((p) => (
                <div
                    key={p.id}
                    className="stream-collection-thumb"
                    style={p.banner_url ? { backgroundImage: `url(${p.banner_url})` } : undefined}
                />
            ))}
            {collection.preview_posts.length === 0 && (
                <div className="stream-collection-thumb stream-collection-thumb--empty" />
            )}
        </div>
        <div className="stream-collection-meta">
            <h3 className="stream-collection-name">{collection.name}</h3>
            {collection.description && (
                <p className="stream-collection-desc">{collection.description}</p>
            )}
            <span className="stream-collection-count">
                {collection.post_count} bài viết
            </span>
        </div>
    </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonArticle: React.FC = () => (
    <div className="stream-skeleton-article">
        <div className="stream-skeleton-body">
            <div className="stream-skeleton-line" style={{ height: '0.75rem', width: '40%' }} />
            <div className="stream-skeleton-line" style={{ height: '1.25rem', width: '85%' }} />
            <div className="stream-skeleton-line" style={{ height: '1rem', width: '70%' }} />
            <div className="stream-skeleton-line" style={{ height: '1rem', width: '60%' }} />
            <div
                className="stream-skeleton-line"
                style={{ height: '0.75rem', width: '30%', marginTop: '0.5rem' }}
            />
        </div>
        <div
            className="stream-skeleton-line stream-skeleton-thumb"
            style={{ flexShrink: 0 }}
        />
    </div>
);

// ─── Left Sidebar ─────────────────────────────────────────────────────────────

const COLLECTIONS = [
    { icon: 'auto_stories', label: 'Blog của tôi' },
    { icon: 'image', label: 'Ký ức của tôi' },
    { icon: 'flight', label: 'Hành trình của tôi' },
];

interface SidebarProps {
    suggestedUsers: SuggestedUser[];
    followingIds: Set<string>;
    categories: Category[];
    onFollow: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ suggestedUsers, followingIds, categories, onFollow }) => (
    <aside className="stream-sidebar">
        <div className="stream-sidebar-section">
            <h3 className="stream-sidebar-heading">Bộ sưu tập</h3>
            <nav className="stream-sidebar-nav">
                {COLLECTIONS.map((c) => (
                    <a key={c.label} href="#" className="stream-sidebar-nav-item">
                        <span className="material-symbols-outlined">{c.icon}</span>
                        {c.label}
                    </a>
                ))}
                <a href="/blog/create" className="stream-sidebar-nav-item create-link">
                    <span className="material-symbols-outlined">add</span>
                    Tạo bộ sưu tập
                </a>
            </nav>
        </div>

        <div className="stream-sidebar-section">
            <h3 className="stream-sidebar-heading">Chủ đề</h3>
            <div className="stream-tags-list">
                {categories.slice(0, 5).map((cat) => (
                    <button key={cat.id} className="stream-tag-pill">#{cat.name}</button>
                ))}
            </div>
        </div>

        {suggestedUsers.length > 0 && (
            <div className="stream-sidebar-section">
                <h3 className="stream-sidebar-heading">Gợi ý theo dõi</h3>
                <div className="stream-suggested-list">
                    {suggestedUsers.slice(0, 4).map((user) => {
                        const name = user.display_name || user.username;
                        return (
                            <div key={user.id} className="stream-suggested-user">
                                <div className="stream-suggested-user-info">
                                    {user.avatar_url ? (
                                        <div
                                            className="stream-suggested-avatar"
                                            style={{ backgroundImage: `url(${user.avatar_url})` }}
                                        />
                                    ) : (
                                        <div className="stream-suggested-avatar">
                                            {initials(name)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="stream-suggested-name">{name}</p>
                                        <p className="stream-suggested-role">@{user.username}</p>
                                    </div>
                                </div>
                                <button
                                    className="stream-follow-btn"
                                    onClick={() => onFollow(user.id)}
                                >
                                    {followingIds.has(user.id) ? 'Đã theo' : 'Theo dõi'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
    </aside>
);

// ─── Main StreamFeed ──────────────────────────────────────────────────────────

const StreamFeed: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [activeTab, setActiveTab] = useState<FeedTab>('trending');
    const [blogs, setBlogs] = useState<TrendingPost[]>([]); // trending extends Blog
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

    // ── Fetch logic per tab ──────────────────────────────────────────────────

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
                    // collections
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

    // ── Initial + tab-change fetch ────────────────────────────────────────────

    useEffect(() => {
        setBlogs([]);
        setCollections([]);
        setPage(1);
        setHasMore(false);
        fetchTab(activeTab, 1, true);
    }, [activeTab, trendingWindow]);

    // ── Sidebar data ─────────────────────────────────────────────────────────

    useEffect(() => {
        followApi.getSuggestedUsers(4)
            .then(setSuggestedUsers)
            .catch((err) => {
                console.warn('Failed to load suggested users', err);
            });

        categoryApi.getCategories()
            .then(setCategories)
            .catch((err) => {
                console.warn('Failed to load categories', err);
            });
    }, []);

    // ── Actions ───────────────────────────────────────────────────────────────

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) fetchTab(activeTab, page + 1, false);
    };

    const handleFollow = async (userId: string) => {
        try {
            await followApi.followUser(userId);
            setFollowingIds((prev) => new Set([...prev, userId]));
        } catch (err) {
            console.warn('Failed to follow user', err);
        }
    };

    const handleTabChange = (tab: FeedTab) => {
        if (tab === activeTab) return;
        setActiveTab(tab);
    };

    // ── Like — optimistic update + server reconcile ───────────────────────────

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
            // Revert
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

    // ── Save — optimistic update + server reconcile ───────────────────────────

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
            // Revert
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

    // ── Render states ─────────────────────────────────────────────────────────

    const renderFollowingPrompt = () => (
        <div className="stream-auth-prompt">
            <div className="stream-auth-icon material-symbols-outlined">people</div>
            <h3 className="stream-empty-title">Đăng nhập để xem feed của bạn</h3>
            <p className="stream-empty-text">
                Theo dõi người dùng yêu thích để thấy nội dung của họ tại đây.
            </p>
            <button className="stream-retry-btn" onClick={() => navigate('/login')}>
                Đăng nhập
            </button>
        </div>
    );

    const renderFeedContent = () => {
        if (loading) {
            return <>{[1, 2, 3, 4].map((i) => <SkeletonArticle key={i} />)}</>;
        }

        if (error) {
            return (
                <div className="stream-error">
                    <div className="stream-error-icon">😕</div>
                    <h3 className="stream-error-title">Không tải được bài viết</h3>
                    <p className="stream-error-text">{error}</p>
                    <button
                        className="stream-retry-btn"
                        onClick={() => fetchTab(activeTab, 1, true)}
                    >
                        Thử lại
                    </button>
                </div>
            );
        }

        // Collections tab
        if (activeTab === 'collections') {
            if (collections.length === 0) {
                return (
                    <div className="stream-empty">
                        <div className="stream-empty-icon material-symbols-outlined">collections_bookmark</div>
                        <h3 className="stream-empty-title">Chưa có bộ sưu tập nào</h3>
                        <p className="stream-empty-text">
                            Bộ sưu tập sẽ sớm xuất hiện ở đây.
                        </p>
                    </div>
                );
            }
            return (
                <div className="stream-collections-grid">
                    {collections.map((col) => (
                        <CollectionCard key={col.id} collection={col} />
                    ))}
                </div>
            );
        }

        // Following tab — not authenticated
        if (activeTab === 'following' && !isAuthenticated) {
            return renderFollowingPrompt();
        }

        // Blog feeds (following + trending)
        if (blogs.length === 0) {
            const emptyMsg =
                activeTab === 'following'
                    ? 'Chưa có bài viết từ những người bạn đang theo dõi.'
                    : 'Không có bài viết thịnh hành trong khoảng thời gian này.';
            return (
                <div className="stream-empty">
                    <div className="stream-empty-icon material-symbols-outlined">article</div>
                    <h3 className="stream-empty-title">Chưa có bài viết nào</h3>
                    <p className="stream-empty-text">{emptyMsg}</p>
                </div>
            );
        }

        return (
            <>
                {blogs.map((blog) => (
                    <ArticleCard
                        key={blog.id}
                        blog={blog}
                        trendingScore={activeTab === 'trending' ? blog.trending_score : undefined}
                        onLikeToggle={handleLikeToggle}
                        onSaveToggle={handleSaveToggle}
                    />
                ))}

                {hasMore && (
                    <div className="stream-load-more">
                        {loadingMore ? (
                            <div className="stream-loading">
                                <div className="stream-spinner" />
                                <span className="stream-loading-text">Đang tải thêm...</span>
                            </div>
                        ) : (
                            <button className="stream-load-more-btn" onClick={handleLoadMore}>
                                Xem thêm câu chuyện
                            </button>
                        )}
                    </div>
                )}
                {!hasMore && blogs.length > 0 && (
                    <p className="stream-end-text">Hết rồi nè. Quay lại sau nhé! 🎉</p>
                )}
            </>
        );
    };

    return (
        <div className="stream-layout">
            <Sidebar
                suggestedUsers={suggestedUsers}
                followingIds={followingIds}
                categories={categories}
                onFollow={handleFollow}
            />

            <main className="stream-feed">
                {/* Tab bar */}
                <div className="stream-tabs" role="tablist">
                    {TABS.map((t) => (
                        <button
                            key={t.key}
                            role="tab"
                            aria-selected={activeTab === t.key}
                            className={`stream-tab${activeTab === t.key ? ' active' : ''}`}
                            onClick={() => handleTabChange(t.key)}
                        >
                            {t.label}
                        </button>
                    ))}

                    {/* Trending window selector */}
                    {activeTab === 'trending' && (
                        <div className="stream-window-selector">
                            {(['day', 'week', 'month'] as const).map((w) => (
                                <button
                                    key={w}
                                    className={`stream-window-btn${trendingWindow === w ? ' active' : ''}`}
                                    onClick={() => setTrendingWindow(w)}
                                >
                                    {w === 'day' ? 'Hôm nay' : w === 'week' ? 'Tuần này' : 'Tháng này'}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {renderFeedContent()}
            </main>

            {/* Mobile FAB */}
            <button
                className="stream-fab"
                aria-label="Tạo bài viết"
                onClick={() => navigate('/blog/create')}
            >
                <span className="material-symbols-outlined">add</span>
            </button>
        </div>
    );
};

export default StreamFeed;
