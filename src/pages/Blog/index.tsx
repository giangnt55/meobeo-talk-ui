import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi, type Blog } from '@/api/services/blogApi';
import { BLOG_CATEGORIES } from '@/constants/blog';

const BlogPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [activeTab, setActiveTab] = useState('Khám phá');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = ['Tất cả', ...BLOG_CATEGORIES];

    // Fetch blogs when component mounts or category changes
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await blogApi.getBlogs({
                    category: activeCategory === 'Tất cả' ? undefined : activeCategory,
                    page: 1,
                    limit: 20,
                });
                setBlogs(response.posts);
            } catch (err) {
                setError('Failed to load blogs. Please try again later.');
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [activeCategory]);

    const filteredPosts = blogs;

    return (
        <main className="flex flex-1 justify-center py-8 lg:py-12 px-4 md:px-10 bg-background-light dark:bg-background-dark">
            <div className="flex flex-col w-full max-w-[1200px] flex-1">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#e6e0db] dark:border-[#3e322a]">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-text-main dark:text-white font-display">
                            Bảng Tin Blog
                        </h1>
                        <p className="text-text-muted text-lg font-normal">
                            Chia sẻ những câu chuyện và ký ức của bạn bằng hình ảnh.
                        </p>
                    </div>
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('Blog Của Tôi')}
                            className={`relative flex flex-col items-center pb-2 transition-colors group ${activeTab === 'Blog Của Tôi' ? 'text-text-main dark:text-white' : 'text-text-muted hover:text-primary'
                                }`}
                        >
                            <span className={`text-lg ${activeTab === 'Blog Của Tôi' ? 'font-bold' : 'font-medium'}`}>
                                Blog Của Tôi
                            </span>
                            <span
                                className={`absolute bottom-0 h-[3px] w-full rounded-t-sm transition-all ${activeTab === 'Blog Của Tôi'
                                    ? 'bg-text-main dark:bg-primary'
                                    : 'bg-transparent group-hover:bg-primary/30'
                                    }`}
                            ></span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Khám phá')}
                            className={`relative flex flex-col items-center pb-2 transition-colors group ${activeTab === 'Khám phá' ? 'text-text-main dark:text-white' : 'text-text-muted hover:text-primary'
                                }`}
                        >
                            <span className={`text-lg ${activeTab === 'Khám phá' ? 'font-bold' : 'font-medium'}`}>
                                Khám Phá
                            </span>
                            <span
                                className={`absolute bottom-0 h-[3px] w-full rounded-t-sm transition-all ${activeTab === 'Khám phá'
                                    ? 'bg-text-main dark:bg-primary'
                                    : 'bg-transparent group-hover:bg-primary/30'
                                    }`}
                            ></span>
                        </button>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex items-center gap-2 py-6 overflow-x-auto no-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeCategory === category
                                ? 'bg-primary text-white'
                                : 'bg-[#efedeb] dark:bg-[#2d241b] text-text-muted hover:bg-[#e6e0db] dark:hover:bg-[#3e322a]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
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
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredPosts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <p className="text-text-muted text-lg">No blogs found in this category.</p>
                    </div>
                )}

                {/* Blog Grid */}
                {!loading && !error && filteredPosts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 pb-12">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="flex flex-col gap-3 group cursor-pointer"
                                onClick={() => navigate(`/blog/${post.id}`)}
                            >
                                <div className="overflow-hidden rounded-xl shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                                    {post.banner_url ? (
                                        <div
                                            className="w-full bg-center bg-no-repeat aspect-[4/5] bg-cover transform transition-transform duration-500 group-hover:scale-105"
                                            style={{ backgroundImage: `url("${post.banner_url}")` }}
                                        ></div>
                                    ) : (
                                        <div className="w-full aspect-[4/5] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                            <span className="text-6xl">📝</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 px-1">
                                    {post.category && (
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                            {post.category}
                                        </span>
                                    )}
                                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                                        {post.content_preview || 'No preview available'}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default BlogPage;
