import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFeedData, type FeedTab } from '../hooks/useFeedData';
import { ArticleCard } from './ArticleCard';
import { CollectionCard } from './CollectionCard';
import { SkeletonArticle } from './FeedSkeleton';
import { FeedSidebar } from './FeedSidebar';
import './StreamFeed.css';

const TABS: { key: FeedTab; label: string }[] = [
    { key: 'following', label: 'Đang theo dõi' },
    { key: 'trending', label: 'Thịnh hành' },
    { key: 'collections', label: 'Bộ sưu tập' },
];

const StreamFeed: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const {
        activeTab, setActiveTab,
        blogs, collections,
        loading, loadingMore,
        error, hasMore,
        trendingWindow, setTrendingWindow,
        suggestedUsers, followingIds, categories,
        fetchTab,
        handleFollow,
        handleLikeToggle,
        handleSaveToggle,
        handleLoadMore,
    } = useFeedData(isAuthenticated);

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
                    <button className="stream-retry-btn" onClick={() => fetchTab(activeTab, 1, true)}>
                        Thử lại
                    </button>
                </div>
            );
        }

        if (activeTab === 'collections') {
            if (collections.length === 0) {
                return (
                    <div className="stream-empty">
                        <div className="stream-empty-icon material-symbols-outlined">collections_bookmark</div>
                        <h3 className="stream-empty-title">Chưa có bộ sưu tập nào</h3>
                        <p className="stream-empty-text">Bộ sưu tập sẽ sớm xuất hiện ở đây.</p>
                    </div>
                );
            }
            return (
                <div className="stream-collections-grid">
                    {collections.map((col) => <CollectionCard key={col.id} collection={col} />)}
                </div>
            );
        }

        if (activeTab === 'following' && !isAuthenticated) {
            return (
                <div className="stream-auth-prompt">
                    <div className="stream-auth-icon material-symbols-outlined">people</div>
                    <h3 className="stream-empty-title">Đăng nhập để xem feed của bạn</h3>
                    <p className="stream-empty-text">Theo dõi người dùng yêu thích để thấy nội dung của họ tại đây.</p>
                    <button className="stream-retry-btn" onClick={() => navigate('/login')}>Đăng nhập</button>
                </div>
            );
        }

        if (blogs.length === 0) {
            const msg = activeTab === 'following'
                ? 'Chưa có bài viết từ những người bạn đang theo dõi.'
                : 'Không có bài viết thịnh hành trong khoảng thời gian này.';
            return (
                <div className="stream-empty">
                    <div className="stream-empty-icon material-symbols-outlined">article</div>
                    <h3 className="stream-empty-title">Chưa có bài viết nào</h3>
                    <p className="stream-empty-text">{msg}</p>
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
            <FeedSidebar
                suggestedUsers={suggestedUsers}
                followingIds={followingIds}
                categories={categories}
                onFollow={handleFollow}
            />

            <main className="stream-feed">
                <div className="stream-tabs" role="tablist">
                    {TABS.map((t) => (
                        <button
                            key={t.key}
                            role="tab"
                            aria-selected={activeTab === t.key}
                            className={`stream-tab${activeTab === t.key ? ' active' : ''}`}
                            onClick={() => { if (t.key !== activeTab) setActiveTab(t.key); }}
                        >
                            {t.label}
                        </button>
                    ))}

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
