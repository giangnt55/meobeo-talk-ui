import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import { blogApi, type Blog, type Comment } from '@/api/services/blogApi';
import { useAuth } from '@/hooks/useAuth';
import './BlogDetail.css';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user, isAuthenticated } = useAuth();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Comment state
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // Reply state
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');
    const [replySubmitting, setReplySubmitting] = useState(false);

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
                setIsLiked(data.is_liked || false);

                // Fetch comments
                fetchComments(data.id);
            } catch (err) {
                setError('Failed to load blog. Please try again later.');
                console.error('Error fetching blog:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const fetchComments = async (blogId: string, pageNum = 1) => {
        try {
            setCommentsLoading(true);
            const data = await blogApi.getComments(blogId, pageNum, 10);

            if (pageNum === 1) {
                setComments(data.comments);
            } else {
                setComments(prev => {
                    const existingIds = new Set(prev.map(c => c.id));
                    const newComments = data.comments.filter(c => !existingIds.has(c.id));
                    return [...prev, ...newComments];
                });
            }

            setHasMore(data.meta.page < data.meta.total_pages);
            setPage(pageNum);
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setCommentsLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (blog && hasMore && !commentsLoading) {
            fetchComments(blog.id, page + 1);
        }
    };

    const threadedComments = useMemo(() => {
        const commentMap = new Map<string, any>();
        const roots: any[] = [];

        // Deep clone items for tree construction to avoid mutating state items if they are reused
        // Also initializing replies array
        const items = comments.map(c => ({ ...c, replies: [] as Comment[] }));

        items.forEach(c => commentMap.set(c.id, c));

        items.forEach(c => {
            if (c.parent_id && commentMap.has(c.parent_id)) {
                commentMap.get(c.parent_id).replies.push(c);
            } else {
                roots.push(c);
            }
        });

        // Optional: Sort roots/replies by date if not already guaranteed by API order preservation
        // Assuming API returns newest first or generally ordered? 
        // Typically comments are oldest first (chronological).
        // Let's rely on API order which is preserved by push.

        return roots;
    }, [comments]);

    const handlePostComment = async () => {
        if (!blog || !commentText.trim()) return;

        try {
            setSubmitting(true);
            const newComment = await blogApi.createComment(blog.id, commentText);
            setComments([newComment, ...comments]);
            setCommentText('');
            setBlog(prev => prev ? { ...prev, comment_count: prev.comment_count + 1 } : null);
        } catch (err) {
            console.error('Error posting comment:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleBlogLike = async () => {
        if (!blog || !isAuthenticated) return;

        const previousState = isLiked;
        const previousCount = blog.reaction_count;

        setIsLiked(!previousState);
        setBlog(prev => prev ? {
            ...prev,
            reaction_count: previousState ? prev.reaction_count - 1 : prev.reaction_count + 1
        } : null);

        try {
            const result = await blogApi.toggleBlogLike(blog.id);
            setIsLiked(result.liked);
            setBlog(prev => prev ? { ...prev, reaction_count: result.count } : null);
        } catch (err) {
            setIsLiked(previousState);
            setBlog(prev => prev ? { ...prev, reaction_count: previousCount } : null);
            console.error('Error liking blog:', err);
        }
    };

    const handleCommentLike = async (commentId: string) => {
        if (!isAuthenticated) return;

        // Optimistic update
        setComments(items => items.map(item => {
            if (item.id === commentId) {
                const isLiked = !item.is_liked;
                return {
                    ...item,
                    is_liked: isLiked,
                    reaction_count: isLiked ? (item.reaction_count || 0) + 1 : Math.max((item.reaction_count || 0) - 1, 0)
                };
            }
            return item;
        }));

        try {
            const result = await blogApi.toggleCommentLike(commentId);
            setComments(items => items.map(item => {
                if (item.id === commentId) {
                    return {
                        ...item,
                        is_liked: result.liked,
                        reaction_count: result.count
                    };
                }
                return item;
            }));
        } catch (err) {
            console.error('Error liking comment:', err);
        }
    };

    const handleReplySubmit = async (parentId: string) => {
        if (!blog || !replyText.trim()) return;

        try {
            setReplySubmitting(true);
            const newReply = await blogApi.createComment(blog.id, replyText, parentId);

            // Just append to flat list, useMemo will handle nesting
            setComments(prev => [...prev, newReply]);

            setReplyingTo(null);
            setReplyText('');
            // Increment blog comment count
            setBlog(prev => prev ? { ...prev, comment_count: prev.comment_count + 1 } : null);
        } catch (err) {
            console.error('Error replying:', err);
        } finally {
            setReplySubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return formatDate(dateString);
    };

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

    const displayedComments = isAuthenticated ? threadedComments : threadedComments.slice(0, 3);

    return (
        <>
            <SEO title={`${blog.title} - MeoBeo Talk`} />

            <main className="blog-detail-container">
                <article className="blog-detail-article">
                    <div className="article-categories">
                        {blog.category && <span>{blog.category_name || blog.category}</span>}
                    </div>

                    <h1 className="article-title">{blog.title}</h1>

                    {blog.content_preview && (
                        <p className="article-subtitle">{blog.content_preview}</p>
                    )}

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
                            <button className="article-action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </button>
                            <button className="article-action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                            </button>
                            <button className="article-action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {blog.banner_url && (
                        <div className="hero-image mb-12">
                            <img src={blog.banner_url} alt={blog.title} />
                        </div>
                    )}

                    <div
                        className="article-body"
                        dangerouslySetInnerHTML={{ __html: blog.content_html }}
                    />

                    {blog.tags && blog.tags.length > 0 && (
                        <div className="article-tags">
                            {blog.tags.map((tag: string, index: number) => (
                                <span key={index} className="tag-pill">{tag}</span>
                            ))}
                        </div>
                    )}

                    <div className="w-full max-w-[720px] pt-8 border-t border-stone-200 dark:border-stone-800 mt-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleBlogLike}
                                    className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-primary' : 'text-stone-500 hover:text-primary'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                    </svg>
                                    <span className="text-sm font-sans font-medium">{blog.reaction_count}</span>
                                </button>
                                <span className="text-stone-300 dark:text-stone-700">|</span>
                                <button className="flex items-center gap-2 text-stone-500 hover:text-primary transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    <span className="text-sm font-sans font-medium">{blog.comment_count}</span>
                                </button>
                            </div>
                            <div className="text-sm text-stone-400 font-sans">
                                Last updated {formatTimeAgo(blog.updated_at)}
                            </div>
                        </div>
                    </div>
                </article>

                <section className="w-full max-w-[720px] mx-auto mt-24 pb-16">
                    <h3 className="font-display text-2xl font-bold mb-10 text-stone-800 dark:text-stone-100">Conversations</h3>

                    <div className="bg-white dark:bg-stone-900/50 rounded-2xl p-6 mb-16 shadow-sm border border-stone-100 dark:border-stone-800">
                        {isAuthenticated ? (
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0 overflow-hidden">
                                    <img
                                        alt={user?.displayName || user?.username}
                                        className="w-full h-full object-cover"
                                        src={user?.avatar || 'https://via.placeholder.com/40'}
                                    />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        className="w-full border-none focus:ring-0 bg-transparent font-sans text-stone-700 dark:text-stone-200 placeholder-stone-400 p-0 mb-4 min-h-[100px] resize-none leading-relaxed focus:outline-none"
                                        placeholder="Share your thoughts..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    ></textarea>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handlePostComment}
                                            disabled={submitting || !commentText.trim()}
                                            className="bg-primary hover:bg-[#b03a12] text-white px-6 py-2 rounded-full text-sm font-bold font-sans transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {submitting ? 'Posting...' : 'Post Thought'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center py-2">
                                <h4 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">Join the conversation</h4>
                                <p className="text-stone-500 dark:text-stone-400 mb-8">Sign in to share your thoughts.</p>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <Link to="/login" className="w-full sm:w-auto px-8 py-2.5 bg-[#ee7c2b] hover:bg-[#d96b1e] text-white rounded-full text-sm font-bold transition-all shadow-sm">
                                        Sign In
                                    </Link>
                                    <Link to="/signup" className="w-full sm:w-auto px-8 py-2.5 bg-transparent border border-stone-400 text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-full text-sm font-bold transition-all">
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-12">
                        {comments.length > 0 ? (
                            <>
                                {displayedComments.map((comment) => (
                                    <div key={comment.id} className="flex gap-4 animate-fade-in">
                                        <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700 flex-shrink-0 overflow-hidden">
                                            <img
                                                alt={comment.user.username}
                                                className="w-full h-full object-cover"
                                                src={comment.user.avatar_url || 'https://via.placeholder.com/32'}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-bold font-sans text-stone-800 dark:text-stone-100">
                                                    {comment.user.display_name || comment.user.username}
                                                </span>
                                                <span className="text-xs text-stone-400 font-sans">
                                                    {formatTimeAgo(comment.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans mb-3 text-[15px]">
                                                {comment.content}
                                            </p>
                                            <div className="flex items-center gap-4">
                                                {isAuthenticated ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleCommentLike(comment.id)}
                                                            className={`hover:opacity-80 flex items-center gap-1 transition-opacity ${comment.is_liked ? 'text-primary' : 'text-stone-500 dark:text-stone-400'}`}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={comment.is_liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                            </svg>
                                                            <span className="text-xs font-sans font-medium">{comment.reaction_count || 0}</span>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setReplyingTo(replyingTo === comment.id ? null : comment.id);
                                                                setReplyText('');
                                                            }}
                                                            className="text-stone-500 dark:text-stone-400 hover:opacity-80 text-xs font-sans font-medium transition-opacity"
                                                        >
                                                            Reply
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className="text-stone-400 text-xs font-medium italic">Sign in to reply</span>
                                                )}
                                            </div>

                                            {isAuthenticated && replyingTo === comment.id && (
                                                <div className="mt-4 animate-fade-in">
                                                    <div className="flex gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0 overflow-hidden">
                                                            <img
                                                                alt={user?.displayName || user?.username}
                                                                className="w-full h-full object-cover"
                                                                src={user?.avatar || 'https://via.placeholder.com/32'}
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="relative">
                                                                <textarea
                                                                    className="w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl p-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none min-h-[80px]"
                                                                    placeholder={`Trả lời ${comment.user.display_name || comment.user.username}...`}
                                                                    value={replyText}
                                                                    onChange={(e) => setReplyText(e.target.value)}
                                                                    autoFocus
                                                                ></textarea>
                                                                <div className="flex justify-end gap-2 mt-2">
                                                                    <button
                                                                        onClick={() => setReplyingTo(null)}
                                                                        className="px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                                                                    >
                                                                        Hủy
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleReplySubmit(comment.id)}
                                                                        disabled={replySubmitting || !replyText.trim()}
                                                                        className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
                                                                    >
                                                                        {replySubmitting ? 'Đang trả lời...' : 'Trả lời'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {comment.replies && comment.replies.length > 0 && (
                                                <div className="mt-8 pl-4 border-l border-stone-200 dark:border-stone-800 space-y-8">
                                                    {comment.replies.map((reply: any) => (
                                                        <div key={reply.id} className="flex gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700 flex-shrink-0 overflow-hidden">
                                                                <img alt={reply.user.username} className="w-full h-full object-cover" src={reply.user.avatar_url || 'https://via.placeholder.com/32'} />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-sm font-bold font-sans text-stone-800 dark:text-stone-100">{reply.user.display_name || reply.user.username}</span>
                                                                    <span className="text-xs text-stone-400 font-sans">{formatTimeAgo(reply.created_at)}</span>
                                                                </div>
                                                                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans mb-3 text-[15px]">
                                                                    {reply.content}
                                                                </p>
                                                                {/* Optional: Add Like/Reply for nested comments here if desired */}
                                                                {isAuthenticated && (
                                                                    <button
                                                                        onClick={() => handleCommentLike(reply.id)}
                                                                        className={`hover:opacity-80 flex items-center gap-1 transition-opacity ${reply.is_liked ? 'text-primary' : 'text-stone-500 dark:text-stone-400'}`}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={reply.is_liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                                        </svg>
                                                                        <span className="text-xs font-sans font-medium">{reply.reaction_count || 0}</span>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {commentsLoading && (
                                    <div className="flex justify-center py-6">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                    </div>
                                )}

                                {isAuthenticated && hasMore && !commentsLoading && (
                                    <div className="text-center pt-8">
                                        <button
                                            onClick={handleLoadMore}
                                            className="px-6 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-full text-sm font-bold transition-colors"
                                        >
                                            Load More Comments
                                        </button>
                                    </div>
                                )}

                                {!isAuthenticated && comments.length > 3 && (
                                    <div className="text-center pt-8 border-t border-stone-200 dark:border-stone-800 mt-6">
                                        <p className="text-stone-500 mb-4 dark:text-stone-400">Join the community to see regular updates and all conversations.</p>
                                        <Link to="/login" className="text-primary font-bold hover:underline">
                                            Sign In to View All
                                        </Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            commentsLoading ? (
                                <div className="flex justify-center py-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <p className="text-center text-stone-500 italic">No thoughts shared yet. Be the first!</p>
                            )
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default BlogDetailPage;
