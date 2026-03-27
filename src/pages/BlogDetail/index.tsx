import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import { blogApi, getContentPreview, type Blog } from '@/api/services/blogApi';
import { useAuth } from '@/hooks/useAuth';
import { CommentSection } from './components/CommentSection';
import './BlogDetail.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit', month: 'short', year: 'numeric',
    });
}

function formatTimeAgo(dateString: string): string {
    const diffInSeconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
    if (diffInSeconds < 60) return 'Vừa xong luôn';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    return formatDate(dateString);
}

// ─── BlogDetailPage ───────────────────────────────────────────────────────────

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user, isAuthenticated } = useAuth();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!id) {
            setError('Hổng tìm thấy bài viết này rồi');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        blogApi.getBlogById(id)
            .then((data) => {
                setBlog(data);
                setIsLiked(data.is_liked || false);
            })
            .catch(() => setError('Hổng tải được bài viết. Bạn ráng đợi xíu thử lại nha.'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleBlogLike = async () => {
        if (!blog || !isAuthenticated) return;
        const prev = isLiked;
        setIsLiked(!prev);
        setBlog((b) => b ? { ...b, reaction_count: prev ? b.reaction_count - 1 : b.reaction_count + 1 } : null);
        try {
            const result = await blogApi.toggleBlogLike(blog.id);
            setIsLiked(result.liked);
            setBlog((b) => b ? { ...b, reaction_count: result.count } : null);
        } catch {
            setIsLiked(prev);
        }
    };

    if (loading) {
        return (
            <main className="blog-detail-container">
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
            </main>
        );
    }

    if (error || !blog) {
        return (
            <main className="blog-detail-container">
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <p className="text-red-500 text-lg">{error || 'Hổng tìm thấy bài viết'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Thử lại nè
                    </button>
                </div>
            </main>
        );
    }

    return (
        <>
            <SEO title={`${blog.title} - MeoBeo Talk`} />

            <main className="blog-detail-container">
                <article className="blog-detail-article">
                    <div className="article-categories">
                        {blog.category && <span>{blog.category_name || blog.category}</span>}
                    </div>

                    <h1 className="article-title">{blog.title}</h1>

                    {blog.content_html && (
                        <p className="article-subtitle">{getContentPreview(blog.content_html, 250)}</p>
                    )}

                    <div className="article-meta">
                        <div className="author-info">
                            <div className="author-avatar">
                                <img
                                    src={blog.author.avatar_url || 'https://via.placeholder.com/40'}
                                    alt={blog.author.display_name || blog.author.username}
                                />
                            </div>
                            <div className="author-details">
                                <span className="author-name">{blog.author.display_name || blog.author.username}</span>
                                <span className="author-date">
                                    {formatDate(blog.created_at)} · {blog.read_time_minutes} phút đọc
                                </span>
                            </div>
                        </div>

                        <div className="article-actions">
                            {/* bookmark / share / more buttons */}
                            {[
                                <path key="bm" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
                                null,
                                null,
                            ].map((_, i) => (
                                <button key={i} className="article-action-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {i === 0 && <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />}
                                        {i === 1 && <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>}
                                        {i === 2 && <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>}
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {blog.banner_url && (
                        <div className="hero-image mb-12">
                            <img src={blog.banner_url} alt={blog.title} />
                        </div>
                    )}

                    <div className="article-body" dangerouslySetInnerHTML={{ __html: blog.content_html }} />

                    {blog.tags && blog.tags.length > 0 && (
                        <div className="article-tags">
                            {blog.tags.map((tag: string, i: number) => (
                                <span key={i} className="tag-pill">{tag}</span>
                            ))}
                        </div>
                    )}

                    {/* Reaction bar */}
                    <div className="w-full max-w-[720px] pt-8 border-t border-stone-200 dark:border-stone-800 mt-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleBlogLike}
                                    className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-primary' : 'text-stone-500 hover:text-primary'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                    </svg>
                                    <span className="text-sm font-sans font-medium">{blog.reaction_count}</span>
                                </button>
                                <span className="text-stone-300 dark:text-stone-700">|</span>
                                <button className="flex items-center gap-2 text-stone-500 hover:text-primary transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    <span className="text-sm font-sans font-medium">{blog.comment_count}</span>
                                </button>
                            </div>
                            <div className="text-sm text-stone-400 font-sans">
                                Cập nhật lần cuối {formatTimeAgo(blog.updated_at)}
                            </div>
                        </div>
                    </div>
                </article>

                <CommentSection
                    blogId={blog.id}
                    isAuthenticated={isAuthenticated}
                    currentUser={user}
                />
            </main>
        </>
    );
};

export default BlogDetailPage;
