import React, { useState, useEffect } from 'react';
import { FaBullhorn } from 'react-icons/fa';
import FeedCard from './FeedCard';
import CategoryFilter from './MoodFilter';
import './FeedMasonry.css';
import { postApi, type Post } from '@/api/services/postApi';

const FeedMasonry: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    // Fetch initial feed
    useEffect(() => {
        fetchFeed();
    }, []);

    const fetchFeed = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await postApi.getFeed(1, 20);
            setPosts(response.posts);
            setHasMore(response.meta.page < response.meta.total_pages);
            setPage(1);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load feed');
            console.error('Error fetching feed:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        if (loadingMore || !hasMore) return;

        try {
            setLoadingMore(true);
            const nextPage = page + 1;
            const response = await postApi.getFeed(nextPage, 20);
            setPosts(prev => [...prev, ...response.posts]);
            setHasMore(response.meta.page < response.meta.total_pages);
            setPage(nextPage);
        } catch (err) {
            console.error('Error loading more posts:', err);
        } finally {
            setLoadingMore(false);
        }
    };

    const getCategoryFromPost = (post: Post): string => {
        if (post.mood) return post.mood;
        // Default categories based on content
        const categories = ['Serene', 'Nostalgic', 'Joyful', 'Peaceful', 'Growth'];
        return categories[Math.floor(Math.random() * categories.length)];
    };

    if (loading) {
        return (
            <main className="feed-main">
                <div className="feed-content">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="feed-main">
                <div className="feed-content">
                    <div className="announcement-card" style={{ backgroundColor: '#fee', borderColor: '#fcc' }}>
                        <div className="announcement-content">
                            <h4 className="announcement-title">Error Loading Feed</h4>
                            <p className="announcement-description">{error}</p>
                            <button
                                onClick={fetchFeed}
                                style={{
                                    marginTop: '1rem',
                                    padding: '0.5rem 1rem',
                                    background: '#e74c3c',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="feed-main">
            <div className="feed-content">
                {/* Category Filter */}
                <CategoryFilter />

                <div className="masonry-grid">
                    {/* Welcome announcement */}
                    <div className="announcement-card">
                        <div className="announcement-content">
                            <div className="announcement-header">
                                <FaBullhorn className="announcement-icon" />
                                <h3 className="announcement-label">System Announcement</h3>
                            </div>
                            <h4 className="announcement-title">Welcome to Meobeo Talk!</h4>
                            <p className="announcement-description">
                                Share your thoughts, memories, and connect with others.
                            </p>
                        </div>
                    </div>

                    {/* Render posts with FeedCard */}
                    {posts.map((post, index) => {
                        // Vary aspect ratio for visual interest
                        const aspectRatio = index % 3 === 0 ? 'square' : 'auto';

                        return (
                            <FeedCard
                                key={post.id}
                                imageUrl={post.content_preview || 'https://via.placeholder.com/600x800'}
                                title={post.title || undefined}
                                category={getCategoryFromPost(post)}
                                authorName={post.author.display_name || post.author.username}
                                authorAvatar={post.author.avatar_url}
                                likes={Math.floor(Math.random() * 3000)} // Mock likes for now
                                isLiked={false}
                                aspectRatio={aspectRatio}
                            />
                        );
                    })}
                </div>

                {/* Load More / Loading Indicator */}
                {hasMore && (
                    <div className="loading-container">
                        {loadingMore ? (
                            <>
                                <div className="loading-spinner"></div>
                                <p>Loading more posts...</p>
                            </>
                        ) : (
                            <button
                                onClick={loadMore}
                                className="load-more-button"
                            >
                                Load More
                            </button>
                        )}
                    </div>
                )}

                {!hasMore && posts.length > 0 && (
                    <div className="loading-container">
                        <p style={{ color: '#888' }}>You've reached the end of your feed</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default FeedMasonry;
