import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import { blogApi, type Blog } from '@/api/services/blogApi';
import './BlogDetail.css';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) {
                setError('Blog ID not found');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const data = await blogApi.getBlogById(id);
                setBlog(data);
            } catch (err) {
                setError('Failed to load blog. Please try again later.');
                console.error('Error fetching blog:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <main className="blog-detail-container">
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </main>
        );
    }

    if (error || !blog) {
        return (
            <main className="blog-detail-container">
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <p className="text-red-500 text-lg">{error || 'Blog not found'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <>
            <SEO title={`${blog.title} - MeoBeo Talk`} />

            <main className="blog-detail-container">
                <article className="blog-detail-article">
                    {/* Category Tags */}
                    <div className="article-categories">
                        {blog.category && <span>{blog.category}</span>}
                    </div>

                    {/* Title */}
                    <h1 className="article-title">{blog.title}</h1>

                    {/* Subtitle */}
                    {blog.content_preview && (
                        <p className="article-subtitle">{blog.content_preview}</p>
                    )}

                    {/* Author & Actions */}
                    <div className="article-meta">
                        <div className="author-info">
                            <div className="author-avatar">
                                <img src={blog.author.avatar_url || 'https://via.placeholder.com/40'} alt={blog.author.display_name || blog.author.username} />
                            </div>
                            <div className="author-details">
                                <span className="author-name">{blog.author.display_name || blog.author.username}</span>
                                <span className="author-date">
                                    {formatDate(blog.created_at)} · {blog.read_time_minutes} phút đọc
                                </span>
                            </div>
                        </div>

                        <div className="article-actions">
                            <button className="action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </button>
                            <button className="action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                            </button>
                            <button className="action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    {blog.banner_url && (
                        <div className="hero-image">
                            <img src={blog.banner_url} alt={blog.title} />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="article-body"
                        dangerouslySetInnerHTML={{ __html: blog.content_html }}
                    />

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="article-tags">
                            {blog.tags.map((tag: string, index: number) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="article-stats">
                        <div className="stat-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span>{blog.reaction_count}</span>
                        </div>
                        <div className="stat-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>{blog.comment_count}</span>
                        </div>
                        <div className="stat-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span>{blog.view_count}</span>
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
};

export default BlogDetailPage;
