import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Blog } from '@/api/services/blogApi';
import { getContentPreview } from '@/api/services/blogApi';
import '@/pages/Profile/Profile.css';

interface BlogPostsGridProps {
    posts: Blog[];
    loading?: boolean;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const BlogPostsGrid: React.FC<BlogPostsGridProps> = ({ posts, loading }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="blog-posts-grid">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="blog-post-card blog-post-card--skeleton">
                        <div className="blog-post-card__image skeleton-block" />
                        <div className="blog-post-card__body">
                            <div className="skeleton-line skeleton-line--wide" />
                            <div className="skeleton-line skeleton-line--narrow" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="profile-empty-state">
                <span className="material-symbols-outlined profile-empty-state__icon">article</span>
                <p className="profile-empty-state__text">Chưa có bài viết nào.</p>
            </div>
        );
    }

    return (
        <div className="blog-posts-grid">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="blog-post-card"
                    onClick={() => navigate(`/blog/${post.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/blog/${post.id}`)}
                >
                    <div
                        className="blog-post-card__image"
                        style={{
                            backgroundImage: post.banner_url
                                ? `url(${post.banner_url})`
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                    />
                    <div className="blog-post-card__body">
                        {post.category_name && (
                            <span className="blog-post-card__category">{post.category_name}</span>
                        )}
                        <h3 className="blog-post-card__title">{post.title}</h3>
                        {post.content_html && (
                            <p className="blog-post-card__excerpt">{getContentPreview(post.content_html, 120)}</p>
                        )}
                        <div className="blog-post-card__meta">
                            <span className="blog-post-card__date">{formatDate(post.created_at)}</span>
                            {post.read_time_minutes > 0 && (
                                <>
                                    <span className="meta-dot">·</span>
                                    <span className="blog-post-card__read-time">{post.read_time_minutes} phút đọc</span>
                                </>
                            )}
                        </div>
                        <div className="blog-post-card__stats">
                            <span className="blog-post-card__stat">
                                <span className="material-symbols-outlined">favorite</span>
                                {post.reaction_count.toLocaleString()}
                            </span>
                            <span className="blog-post-card__stat">
                                <span className="material-symbols-outlined">chat_bubble</span>
                                {post.comment_count.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};