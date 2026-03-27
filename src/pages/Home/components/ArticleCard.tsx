import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getContentPreview, type Blog } from '@/api/services/blogApi';

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'short',
    });
}

export function formatCount(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

export function getTypeLabel(postType: string): string {
    if (postType === 'memory') return 'Ký Ức';
    if (postType === 'journey') return 'Hành Trình';
    return 'Blog';
}

export function getTypeBadgeClass(postType: string): string {
    if (postType === 'memory') return 'memory';
    if (postType === 'journey') return 'journey';
    return 'blog';
}

export function initials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

// ─── ArticleCard ──────────────────────────────────────────────────────────────

export interface ArticleCardProps {
    blog: Blog;
    trendingScore?: number;
    onLikeToggle: (id: string) => void;
    onSaveToggle: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
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
    const preview = getContentPreview(blog.content_html || '', 160);

    return (
        <article
            className={`stream-article${!hasImage ? ' no-image' : ''}`}
            onClick={() => navigate(`/blog/${blog.id}`)}
        >
            <div className="stream-article-body">
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

                <div>
                    <h2 className="stream-article-title">{blog.title}</h2>
                    {(blog.content_preview || preview) && (
                        <p className="stream-article-excerpt">
                            {blog.content_preview || preview}
                        </p>
                    )}
                </div>

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

            {hasImage && (
                <div className={`stream-article-thumb${isPolaroid ? ' stream-polaroid' : ''}`}>
                    <img src={imgSrc} alt={blog.title || ''} loading="lazy" />
                </div>
            )}
        </article>
    );
};
