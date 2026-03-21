import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi, getContentPreview, type Blog } from '@/api/services/blogApi';
import { BLOG_CATEGORIES } from '@/constants/blog';
import { useAuth } from '@/hooks/useAuth';

const BlogPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [activeTab, setActiveTab] = useState('Khám phá');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const categories = ['Tất cả', ...BLOG_CATEGORIES];

    const fetchBlogs = async (pageNum: number, category: string) => {
        try {
            setError(null);

            let response;
            if (activeTab === 'Blog Của Tôi') {
                if (!user) {
                    setBlogs([]);
                    setPage(1);
                    setHasMore(false);
                    setLoading(false);
                    setLoadingMore(false);
                    return;
                }
                // API for user blogs doesn't support category filtering yet
                response = await blogApi.getUserBlogs(user.id, pageNum, 12);
            } else {
                response = await blogApi.getBlogs({
                    category: category === 'Tất cả' ? undefined : category,
                    page: pageNum,
                    limit: 12, // Reduced to 12 to match grid layout better (3x4 or 4x3)
                });
            }

            if (pageNum === 1) {
                setBlogs(response.posts);
            } else {
                setBlogs(prev => [...prev, ...response.posts]);
            }

            setHasMore(pageNum < response.meta.total_pages);
        } catch (err) {
            setError('Hổng tải được bài viết rồi. Bạn ráng đợi xíu thử lại nha.');
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Reset state when category or tab changes
    useEffect(() => {
        setBlogs([]);
        setPage(1);
        setHasMore(true);
        setLoading(true);
        fetchBlogs(1, activeCategory);
    }, [activeCategory, activeTab]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        setLoadingMore(true);
        fetchBlogs(nextPage, activeCategory);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (tab === 'Blog Của Tôi') {
            setActiveCategory('Tất cả'); // Reset category when switching to 'My Blogs'
        }
    };

    const filteredPosts = blogs;

    // Helper to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Helper for large numbers
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    return (
        <main className="flex flex-1 justify-center py-8 lg:py-12 px-6 bg-background-light dark:bg-background-dark">
            <div className="flex flex-col w-full max-w-[840px] flex-1">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-divider dark:border-[#3e322a]">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-deep-espresso dark:text-white">Chuyện trò đây đó</h1>
                        <p className="text-warm-taupe text-base">Góc nhỏ bình yên rải đầy suy tư và chuyện kể của chúng mình.</p>
                    </div>
                    <div className="flex gap-6">
                        <button
                            onClick={() => handleTabChange('Blog Của Tôi')}
                            className="relative flex flex-col items-center pb-2 transition-colors group"
                        >
                            <span className={`text-base ${activeTab === 'Blog Của Tôi' ? 'font-bold text-deep-espresso dark:text-white' : 'font-semibold text-warm-taupe hover:text-primary'}`}>
                                Blog Của Tôi
                            </span>
                            {activeTab === 'Blog Của Tôi' && (
                                <span className="absolute bottom-0 h-[3px] w-full bg-primary rounded-full"></span>
                            )}
                        </button>
                        <button
                            onClick={() => handleTabChange('Khám phá')}
                            className="relative flex flex-col items-center pb-2 transition-colors group"
                        >
                            <span className={`text-base ${activeTab === 'Khám phá' ? 'font-bold text-deep-espresso dark:text-white' : 'font-semibold text-warm-taupe hover:text-primary'}`}>
                                Khám phá
                            </span>
                            {activeTab === 'Khám phá' && (
                                <span className="absolute bottom-0 h-[3px] w-full bg-primary rounded-full"></span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-2 py-6 overflow-x-auto no-scrollbar border-b border-divider dark:border-[#3e322a]">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors ${activeCategory === category
                                ? 'bg-deep-espresso text-white'
                                : 'bg-[#f1edea] dark:bg-[#2d241b] text-warm-taupe hover:bg-[#e6e0db] dark:hover:bg-[#3e322a]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Loading State - Initial Load */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <p className="text-red-500 text-lg">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Thử lại nè
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredPosts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <p className="text-warm-taupe text-lg">Đang chờ mấy câu chuyện mới rơi vào đây nè.</p>
                    </div>
                )}

                {/* Feed */}
                {!loading && !error && filteredPosts.length > 0 && (
                    <div className="flex flex-col">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="flex items-start gap-8 py-10 border-b border-divider/60 dark:border-[#3e322a]/40 group cursor-pointer"
                                onClick={() => navigate(`/blog/${post.id}`)}
                            >
                                <div className="flex flex-col flex-1 gap-3">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-2xl font-extrabold text-deep-espresso dark:text-white leading-snug group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-xs font-semibold text-warm-taupe/80 tracking-wide uppercase">
                                            <span>{post.author.display_name || post.author.username}</span>
                                            <span className="size-1 bg-warm-taupe/30 rounded-full"></span>
                                            <span>{formatDate(post.created_at)}</span>
                                            <span className="size-1 bg-warm-taupe/30 rounded-full"></span>
                                            <span>{post.read_time_minutes} phút đọc</span>
                                        </div>
                                    </div>
                                    <p className="text-warm-taupe text-base leading-relaxed line-clamp-3">
                                        {post.content_preview || getContentPreview(post.content_html, 200) || 'Chưa có nội dung nhá hàng'}
                                    </p>
                                    <div className="flex items-center gap-6 mt-2">
                                        <div className="flex items-center gap-1.5 text-warm-taupe/60">
                                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            <span className="text-xs font-medium">{formatNumber(post.view_count)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-warm-taupe/60">
                                            <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                                            <span className="text-xs font-medium">{formatNumber(post.comment_count)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-warm-taupe/60">
                                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                                            <span className="text-xs font-medium">{formatNumber(post.reaction_count)}</span>
                                        </div>
                                    </div>
                                </div>
                                {post.banner_url && (
                                    <div className="hidden sm:block shrink-0 w-44 h-32 md:w-56 md:h-40 overflow-hidden rounded-xl bg-divider">
                                        <div
                                            className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url("${post.banner_url}")` }}
                                        ></div>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                )}

                {/* Load More Button - Only show if we have posts */}
                {!loading && !error && hasMore && filteredPosts.length > 0 && (
                    <div className="py-12 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            className="px-8 py-3 rounded-full border-2 border-divider dark:border-[#3e322a] text-deep-espresso dark:text-white font-bold hover:bg-divider dark:hover:bg-[#3e322a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loadingMore ? (
                                <>
                                    <div className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                                    Đợi xíu xíu nha...
                                </>
                            ) : (
                                'Đọc thêm mấy chuyện cũ nhen'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default BlogPage;
