import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi, type Blog } from '@/api/services/blogApi';
import { followApi } from '@/api/services/followApi';
import type { SuggestedUser } from '@/schemas/onboarding.schema';
import './StreamFeed.css';

// ─── Helpers ─────────────────────────────────────────────────────────────────

type FeedTab = 'following' | 'trending' | 'collections';

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' });
}

function formatCount(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

function getTypeLabel(blog: Blog): string {
    if (blog.post_type === 'memory') return 'Ký Ức';
    if (blog.post_type === 'journey') return 'Hành Trình';
    return 'Blog';
}

function getTypeBadgeClass(blog: Blog): string {
    if (blog.post_type === 'memory') return 'memory';
    if (blog.post_type === 'journey') return 'journey';
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
}

const ArticleCard: React.FC<ArticleCardProps> = ({ blog }) => {
    const navigate = useNavigate();
    const authorName =
        blog.author.display_name || blog.author.username;
    const hasImage = !!(blog.banner_url || blog.thumbnail_url);
    const imgSrc = blog.banner_url || blog.thumbnail_url || '';
    const isPolaroid = blog.post_type === 'memory';

    const handleClick = () => {
        navigate(`/blog/${blog.id}`);
    };

    return (
        <article
            className={`stream-article${!hasImage ? ' no-image' : ''}`}
            onClick={handleClick}
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
                        <div className="stream-meta-avatar">
                            {initials(authorName)}
                        </div>
                    )}
                    <span className="stream-meta-author">{authorName}</span>
                    <span className={`stream-type-badge ${getTypeBadgeClass(blog)}`}>
                        {getTypeLabel(blog)}
                    </span>
                    <span className="stream-meta-dot">•</span>
                    <span className="stream-meta-date">{formatDate(blog.created_at)}</span>
                    {blog.read_time_minutes > 0 && (
                        <>
                            <span className="stream-meta-dot">•</span>
                            <span className="stream-meta-date">{blog.read_time_minutes} phút đọc</span>
                        </>
                    )}
                </div>

                {/* Title + Excerpt */}
                <div>
                    <h2 className="stream-article-title">{blog.title}</h2>
                    {blog.content_preview && (
                        <p className="stream-article-excerpt">{blog.content_preview}</p>
                    )}
                </div>

                {/* Footer stats */}
                <div className="stream-article-footer">
                    <div className="stream-footer-stat">
                        <span className="material-symbols-outlined">favorite</span>
                        <span>{formatCount(blog.reaction_count)}</span>
                    </div>
                    <div className="stream-footer-stat">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <span>{formatCount(blog.comment_count)}</span>
                    </div>
                    <button
                        className="stream-bookmark-btn"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Lưu bài"
                    >
                        <span className="material-symbols-outlined">bookmark</span>
                    </button>
                </div>
            </div>

            {/* Thumbnail */}
            {hasImage && (
                <div className={`stream-article-thumb${isPolaroid ? ' stream-polaroid' : ''}`}>
                    <img src={imgSrc} alt={blog.title} loading="lazy" />
                </div>
            )}
        </article>
    );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonArticle: React.FC = () => (
    <div className="stream-skeleton-article">
        <div className="stream-skeleton-body">
            <div className="stream-skeleton-line" style={{ height: '0.75rem', width: '40%' }} />
            <div className="stream-skeleton-line" style={{ height: '1.25rem', width: '85%' }} />
            <div className="stream-skeleton-line" style={{ height: '1rem', width: '70%' }} />
            <div className="stream-skeleton-line" style={{ height: '1rem', width: '60%' }} />
            <div className="stream-skeleton-line" style={{ height: '0.75rem', width: '30%', marginTop: '0.5rem' }} />
        </div>
        <div
            className="stream-skeleton-line stream-skeleton-thumb"
            style={{ flexShrink: 0 }}
        />
    </div>
);

// ─── Left Sidebar ─────────────────────────────────────────────────────────────

interface SidebarProps {
    suggestedUsers: SuggestedUser[];
    followingIds: Set<string>;
    onFollow: (userId: string) => void;
}

const COLLECTIONS = [
    { icon: 'auto_stories', label: 'Blog của tôi' },
    { icon: 'image', label: 'Ký ức của tôi' },
    { icon: 'flight', label: 'Hành trình của tôi' },
];

const TAGS = ['#Nhiếp ảnh', '#Du lịch', '#Ẩm thực', '#Nhật ký', '#Thiên nhiên'];

const Sidebar: React.FC<SidebarProps> = ({ suggestedUsers, followingIds, onFollow }) => (
    <aside className="stream-sidebar">
        {/* Collections */}
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

        {/* Tags */}
        <div className="stream-sidebar-section">
            <h3 className="stream-sidebar-heading">Chủ đề yêu thích</h3>
            <div className="stream-tags-list">
                {TAGS.map((tag) => (
                    <button key={tag} className="stream-tag-pill">
                        {tag}
                    </button>
                ))}
            </div>
        </div>

        {/* Suggested users */}
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

    const [activeTab, setActiveTab] = useState<FeedTab>('following');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
    const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());

    // ── fetch blogs ──
    const fetchBlogs = useCallback(async (pageNum: number, replace = false) => {
        try {
            if (replace) setLoading(true);
            else setLoadingMore(true);
            setError(null);

            const res = await blogApi.getBlogs({ page: pageNum, limit: 10 });

            setBlogs((prev) => (replace ? res.posts : [...prev, ...res.posts]));
            setHasMore(res.meta.page < res.meta.total_pages);
            setPage(pageNum);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không tải được bài viết');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, []);

    // ── fetch sidebar data ──
    const fetchSidebar = useCallback(async () => {
        try {
            const users = await followApi.getSuggestedUsers(4);
            setSuggestedUsers(users);
        } catch {
            // sidebar data is non-critical, fail silently
        }
    }, []);

    useEffect(() => {
        fetchBlogs(1, true);
        fetchSidebar();
    }, [fetchBlogs, fetchSidebar]);

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) fetchBlogs(page + 1, false);
    };

    const handleFollow = async (userId: string) => {
        try {
            await followApi.followUser(userId);
            setFollowingIds((prev) => new Set([...prev, userId]));
        } catch {
            // ignore
        }
    };

    // ── Tab change – re-fetch feed ──
    const handleTabChange = async (tab: FeedTab) => {
        if (tab === activeTab) return;
        setActiveTab(tab);
        // For now all tabs hit same API; extend when endpoints differ
        fetchBlogs(1, true);
    };

    // ── Render states ──
    const renderFeed = () => {
        if (loading) {
            return (
                <>
                    {[1, 2, 3, 4].map((i) => (
                        <SkeletonArticle key={i} />
                    ))}
                </>
            );
        }

        if (error) {
            return (
                <div className="stream-error">
                    <div className="stream-error-icon">😕</div>
                    <h3 className="stream-error-title">Không tải được bài viết</h3>
                    <p className="stream-error-text">{error}</p>
                    <button className="stream-retry-btn" onClick={() => fetchBlogs(1, true)}>
                        Thử lại
                    </button>
                </div>
            );
        }

        if (blogs.length === 0) {
            return (
                <div className="stream-empty">
                    <div className="stream-empty-icon material-symbols-outlined">article</div>
                    <h3 className="stream-empty-title">Chưa có bài viết nào</h3>
                    <p className="stream-empty-text">
                        Hãy là người đầu tiên chia sẻ câu chuyện của bạn!
                    </p>
                </div>
            );
        }

        return (
            <>
                {blogs.map((blog) => (
                    <ArticleCard key={blog.id} blog={blog} />
                ))}

                {/* Load more */}
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

    const TABS: { key: FeedTab; label: string }[] = [
        { key: 'following', label: 'Đang theo dõi' },
        { key: 'trending', label: 'Thịnh hành' },
        { key: 'collections', label: 'Bộ sưu tập' },
    ];

    return (
        <div className="stream-layout">
            {/* Left Sidebar */}
            <Sidebar
                suggestedUsers={suggestedUsers}
                followingIds={followingIds}
                onFollow={handleFollow}
            />

            {/* Main Feed */}
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
                </div>

                {/* Articles */}
                {renderFeed()}
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
