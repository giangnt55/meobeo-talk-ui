import React from 'react';
import type { Comment } from '@/api/services/blogApi';
import { blogApi } from '@/api/services/blogApi';
import { Link } from 'react-router-dom';
import type { User } from '@/types/auth';

// ─── Helpers (local) ──────────────────────────────────────────────────────────

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

// ─── ReplyInput ───────────────────────────────────────────────────────────────

interface ReplyInputProps {
    user: User | null;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    submitting: boolean;
}

const ReplyInput: React.FC<ReplyInputProps> = ({
    user, placeholder, value, onChange, onSubmit, onCancel, submitting,
}) => (
    <div className="mt-4 animate-fade-in">
        <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0 overflow-hidden">
                <img
                    alt={user?.display_name || user?.username}
                    className="w-full h-full object-cover"
                    src={user?.avatar_url || 'https://via.placeholder.com/32'}
                />
            </div>
            <div className="flex-1">
                <div className="relative">
                    <textarea
                        className="w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl p-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none min-h-[80px]"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        autoFocus
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={onCancel}
                            className="px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={onSubmit}
                            disabled={submitting || !value.trim()}
                            className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {submitting ? 'Đang trả lời...' : 'Trả lời'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ─── CommentItem ──────────────────────────────────────────────────────────────

interface CommentItemProps {
    comment: Comment;
    isAuthenticated: boolean;
    replyingTo: string | null;
    replyText: string;
    replySubmitting: boolean;
    currentUser: User | null;
    onLike: (id: string) => void;
    onReplyToggle: (id: string) => void;
    onReplyChange: (v: string) => void;
    onReplySubmit: (parentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    isAuthenticated,
    replyingTo,
    replyText,
    replySubmitting,
    currentUser,
    onLike,
    onReplyToggle,
    onReplyChange,
    onReplySubmit,
}) => (
    <div className="flex gap-4 animate-fade-in">
        <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700 flex-shrink-0 overflow-hidden">
            <img
                alt={comment.user.display_name || comment.user.username}
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
                            onClick={() => onLike(comment.id)}
                            className={`hover:opacity-80 flex items-center gap-1 transition-opacity ${comment.is_liked ? 'text-primary' : 'text-stone-500 dark:text-stone-400'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={comment.is_liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span className="text-xs font-sans font-medium">{comment.reaction_count || 0}</span>
                        </button>
                        <button
                            onClick={() => onReplyToggle(comment.id)}
                            className="text-stone-500 dark:text-stone-400 hover:opacity-80 text-xs font-sans font-medium transition-opacity"
                        >
                            Trả lời
                        </button>
                    </>
                ) : (
                    <span className="text-stone-400 text-xs font-medium italic">Đăng nhập để trả lời nhen</span>
                )}
            </div>

            {isAuthenticated && replyingTo === comment.id && (
                <ReplyInput
                    user={currentUser}
                    placeholder={`Trả lời ${comment.user.display_name || comment.user.username}...`}
                    value={replyText}
                    onChange={onReplyChange}
                    onSubmit={() => onReplySubmit(comment.id)}
                    onCancel={() => onReplyToggle(comment.id)}
                    submitting={replySubmitting}
                />
            )}

            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-8 pl-4 border-l border-stone-200 dark:border-stone-800 space-y-8">
                    {comment.replies.map((reply: Comment) => (
                        <div key={reply.id} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700 flex-shrink-0 overflow-hidden">
                                <img alt={reply.user.username} className="w-full h-full object-cover" src={reply.user.avatar_url || 'https://via.placeholder.com/32'} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-bold font-sans text-stone-800 dark:text-stone-100">
                                        {reply.user.display_name || reply.user.username}
                                    </span>
                                    <span className="text-xs text-stone-400 font-sans">{formatTimeAgo(reply.created_at)}</span>
                                </div>
                                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans mb-3 text-[15px]">
                                    {reply.content}
                                </p>
                                {isAuthenticated && (
                                    <button
                                        onClick={() => onLike(reply.id)}
                                        className={`hover:opacity-80 flex items-center gap-1 transition-opacity ${reply.is_liked ? 'text-primary' : 'text-stone-500 dark:text-stone-400'}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={reply.is_liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
);

// ─── CommentSection ───────────────────────────────────────────────────────────

export interface CommentSectionProps {
    blogId: string;
    isAuthenticated: boolean;
    currentUser: User | null;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
    blogId,
    isAuthenticated,
    currentUser,
}) => {
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [commentText, setCommentText] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(false);
    const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
    const [replyText, setReplyText] = React.useState('');
    const [replySubmitting, setReplySubmitting] = React.useState(false);

    const threadedComments = React.useMemo(() => {
        const map = new Map<string, Comment>();
        const roots: Comment[] = [];
        const items = comments.map((c) => ({ ...c, replies: [] as Comment[] }));
        items.forEach((c) => map.set(c.id, c));
        items.forEach((c) => {
            if (c.parent_id && map.has(c.parent_id)) {
                map.get(c.parent_id)!.replies!.push(c);
            } else {
                roots.push(c);
            }
        });
        return roots;
    }, [comments]);

    const fetchComments = React.useCallback(async (pageNum = 1) => {
        try {
            setLoading(true);
            const data = await blogApi.getComments(blogId, pageNum, 10);
            if (pageNum === 1) {
                setComments(data.comments);
            } else {
                setComments((prev) => {
                    const ids = new Set(prev.map((c) => c.id));
                    return [...prev, ...data.comments.filter((c) => !ids.has(c.id))];
                });
            }
            setHasMore(data.meta.page < data.meta.total_pages);
            setPage(pageNum);
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setLoading(false);
        }
    }, [blogId]);

    React.useEffect(() => { fetchComments(1); }, [fetchComments]);

    const handlePostComment = async () => {
        if (!commentText.trim()) return;
        try {
            setSubmitting(true);
            const newComment = await blogApi.createComment(blogId, commentText);
            setComments((prev) => [newComment, ...prev]);
            setCommentText('');
        } catch (err) {
            console.error('Error posting comment:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCommentLike = async (commentId: string) => {
        if (!isAuthenticated) return;
        setComments((items) => items.map((item) => {
            if (item.id !== commentId) return item;
            const liked = !item.is_liked;
            return { ...item, is_liked: liked, reaction_count: liked ? (item.reaction_count || 0) + 1 : Math.max((item.reaction_count || 0) - 1, 0) };
        }));
        try {
            const result = await blogApi.toggleCommentLike(commentId);
            setComments((items) => items.map((item) =>
                item.id !== commentId ? item : { ...item, is_liked: result.liked, reaction_count: result.count }
            ));
        } catch (err) {
            console.error('Error liking comment:', err);
        }
    };

    const handleReplySubmit = async (parentId: string) => {
        if (!replyText.trim()) return;
        try {
            setReplySubmitting(true);
            const newReply = await blogApi.createComment(blogId, replyText, parentId);
            setComments((prev) => [...prev, newReply]);
            setReplyingTo(null);
            setReplyText('');
        } catch (err) {
            console.error('Error replying:', err);
        } finally {
            setReplySubmitting(false);
        }
    };

    const handleReplyToggle = (id: string) => {
        setReplyingTo((prev) => (prev === id ? null : id));
        setReplyText('');
    };

    const displayed = isAuthenticated ? threadedComments : threadedComments.slice(0, 3);

    return (
        <section className="w-full max-w-[720px] mx-auto mt-24 pb-16">
            <h3 className="font-display text-2xl font-bold mb-10 text-stone-800 dark:text-stone-100">
                Trò chuyện cùng nhau
            </h3>

            {/* Input box */}
            <div className="bg-white dark:bg-stone-900/50 rounded-2xl p-6 mb-16 shadow-sm border border-stone-100 dark:border-stone-800">
                {isAuthenticated ? (
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0 overflow-hidden">
                            <img
                                alt={currentUser?.display_name || currentUser?.username}
                                className="w-full h-full object-cover"
                                src={currentUser?.avatar_url || 'https://via.placeholder.com/40'}
                            />
                        </div>
                        <div className="flex-1">
                            <textarea
                                className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 resize-none min-h-[80px] text-sm leading-relaxed placeholder-stone-400"
                                placeholder="Chia sẻ suy nghĩ của bạn..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handlePostComment}
                                    disabled={submitting || !commentText.trim()}
                                    className="bg-primary hover:bg-[#b03a12] text-white px-6 py-2 rounded-full text-sm font-bold font-sans transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Đang đăng...' : 'Đăng suy nghĩ'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center py-2">
                        <h4 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">Tham gia góp vui nè</h4>
                        <p className="text-stone-500 dark:text-stone-400 mb-8">Đăng nhập để kể chuyện của bạn nha.</p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link to="/login" className="w-full sm:w-auto px-8 py-2.5 bg-[#ee7c2b] hover:bg-[#d96b1e] text-white rounded-full text-sm font-bold transition-all shadow-sm">
                                Đăng nhập
                            </Link>
                            <Link to="/signup" className="w-full sm:w-auto px-8 py-2.5 bg-transparent border border-stone-400 text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-full text-sm font-bold transition-all">
                                Tạo tài khoản
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Comment list */}
            <div className="space-y-12">
                {comments.length > 0 ? (
                    <>
                        {displayed.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                isAuthenticated={isAuthenticated}
                                currentUser={currentUser}
                                replyingTo={replyingTo}
                                replyText={replyText}
                                replySubmitting={replySubmitting}
                                onLike={handleCommentLike}
                                onReplyToggle={handleReplyToggle}
                                onReplyChange={setReplyText}
                                onReplySubmit={handleReplySubmit}
                            />
                        ))}

                        {loading && (
                            <div className="flex justify-center py-6">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                            </div>
                        )}

                        {isAuthenticated && hasMore && !loading && (
                            <div className="text-center pt-8">
                                <button
                                    onClick={() => fetchComments(page + 1)}
                                    className="px-6 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-full text-sm font-bold transition-colors"
                                >
                                    Tải thêm bình luận
                                </button>
                            </div>
                        )}

                        {!isAuthenticated && comments.length > 3 && (
                            <div className="text-center pt-8 border-t border-stone-200 dark:border-stone-800 mt-6">
                                <p className="text-stone-500 mb-4 dark:text-stone-400">Vào nhà chung để xem thêm nhiều chuyện hay ho nha.</p>
                                <Link to="/login" className="text-primary font-bold hover:underline">
                                    Đăng nhập để xem hết
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                        </div>
                    ) : (
                        <p className="text-center text-stone-500 italic">Chưa có ai nói gì hết trơn. Bắt chuyện trước đi bạn!</p>
                    )
                )}
            </div>
        </section>
    );
};
