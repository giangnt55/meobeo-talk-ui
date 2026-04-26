import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContentPreview } from '@/api/services/blogApi';
import { useExploreBlogs } from './hooks/useExploreBlogs';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const ExplorePage: React.FC = () => {
    useDocumentTitle('Khám Phá');
    const navigate = useNavigate();
    const [showSignupPopup] = useState(true);

    const {
        blogs,
        loading,
        loadingMore,
        error,
        hasMore,
        activeTab,
        tabs,
        setActiveTab,
        handleLoadMore,
        retry,
    } = useExploreBlogs();

    // Helper to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <main className="flex-1 flex flex-col items-center w-full pb-32 bg-background-light dark:bg-background-dark">
            <section className="w-full max-w-[800px] px-6 py-12 lg:py-16 text-center">
                <h2 className="text-[#181411] dark:text-white text-3xl lg:text-5xl font-black tracking-tight mb-4">
                    Bật mí góc chuyện nhỏ xíu
                </h2>
                <p className="text-[#897261] dark:text-gray-400 text-lg max-w-xl mx-auto">
                    Cùng khám phá muôn vàn ký ức và chuyến đi thú vị từ cộng đồng của chúng ta.
                </p>
            </section>

            <div className="w-full max-w-[960px] px-6 mb-8">
                <div className="flex items-center gap-8 border-b border-[#e6e0db] dark:border-gray-800">
                    {tabs.map((tab) => {
                        const labelMap: Record<string, string> = {
                            'Trending': 'Hot hit',
                            'Recent': 'Mới ra lò',
                            'Editors’ Choice': 'Lựa chọn xịn xò'
                        };
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm transition-colors ${activeTab === tab
                                    ? 'font-bold text-primary border-b-2 border-primary'
                                    : 'font-medium text-[#897261] dark:text-gray-400 hover:text-primary'
                                    }`}
                            >
                                {labelMap[tab] || tab}
                            </button>
                        );
                    })}
                </div>
            </div>

            {loading && (
                <div className="w-full max-w-[960px] px-6 flex flex-col gap-8">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="group flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-[#2c2018] rounded-2xl border border-[#e6e0db] dark:border-gray-800 animate-pulse">
                            <div className="flex-1 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                                <div className="w-3/4 h-7 bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
                                <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                            <div className="w-full md:w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-xl flex-shrink-0"></div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="flex flex-col items-center justify-center py-20 gap-4 w-full">
                    <p className="text-red-500 text-lg">{error}</p>
                    <button
                        onClick={retry}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Thử lại nè
                    </button>
                </div>
            )}

            {!loading && !error && blogs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-4 w-full">
                    <p className="text-[#897261] dark:text-gray-400 text-lg">Chưa có câu chuyện nào rơi vào đây á</p>
                </div>
            )}

            {!loading && !error && blogs.length > 0 && (
                <div className="w-full max-w-[960px] px-6 flex flex-col gap-8">
                    {blogs.map((post) => {
                        const isMemory = post.post_type === 'memory' || post.category === 'memory' || post.category_name?.toLowerCase() === 'memory';

                        return (
                            <article
                                key={post.id}
                                className="group flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-[#2c2018] rounded-2xl border border-[#e6e0db] dark:border-gray-800 hover:shadow-md transition-all cursor-pointer"
                                onClick={() => navigate(`/blog/${post.id}`)}
                            >
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        {isMemory ? (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-warm-taupe/10 text-warm-taupe dark:bg-warm-taupe/20 dark:text-[#d4c3b5]">
                                                Ký ức
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sage/10 text-[#5a6b5c] dark:bg-sage/20 dark:text-sage">
                                                Câu chuyện
                                            </span>
                                        )}
                                        <span className="text-xs text-[#897261] dark:text-gray-500">{formatDate(post.created_at)}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#181411] dark:text-white group-hover:text-primary transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-[#897261] dark:text-gray-400 line-clamp-2 leading-relaxed">
                                        {post.content_preview || getContentPreview(post.content_html, 200) || 'Chưa có nội dung nhá hàng'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        {post.author?.avatar_url ? (
                                            <img alt={post.author.display_name || post.author.username} className="w-6 h-6 rounded-full object-cover" src={post.author.avatar_url} />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500">
                                                {(post.author?.display_name || post.author?.username || 'U').charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <span className="text-xs font-medium text-[#181411] dark:text-gray-300">
                                            {post.author?.display_name || post.author?.username}
                                        </span>
                                    </div>
                                </div>

                                {(post.banner_url || post.thumbnail_url) && (
                                    <div className="relative w-full md:w-48 h-32 flex-shrink-0">
                                        {isMemory ? (
                                            <>
                                                <div className="absolute inset-0 bg-white p-1.5 shadow-md -rotate-2 border border-gray-100 overflow-hidden rounded-sm z-10">
                                                    <img alt={post.title} className="w-full h-full object-cover" src={post.banner_url || post.thumbnail_url} />
                                                </div>
                                                <div className="absolute inset-0 bg-white p-1.5 shadow-sm rotate-3 border border-gray-100 overflow-hidden rounded-sm z-0 translate-x-2"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full rounded-xl overflow-hidden">
                                                <img alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={post.banner_url || post.thumbnail_url} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </article>
                        );
                    })}

                    {hasMore && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="px-8 py-3 rounded-full border border-[#e6e0db] dark:border-gray-700 text-sm font-bold text-[#181411] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2c2018] transition-colors flex items-center gap-2"
                            >
                                {loadingMore ? (
                                    <>
                                        <div className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                                        Đợi một xíu xíu nha...
                                    </>
                                ) : (
                                    'Bưng thêm truyện ra nè'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Sticky Signup Popup */}
            {showSignupPopup && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-[90]">
                    <div className="bg-white/90 dark:bg-[#2c2018]/90 backdrop-blur-md border border-[#e6e0db] dark:border-gray-700 rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col pr-8">
                            <p className="text-[#181411] dark:text-white font-bold text-lg leading-tight">Ghiền mấy câu chuyện này không ta?</p>
                            <p className="text-[#897261] dark:text-gray-400 text-sm">Xách balo lên và viết chuyện của bạn thôi nè.</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <button
                                onClick={(e) => { e.stopPropagation(); navigate('/signup'); }}
                                className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-sm shadow-lg shadow-orange-200 dark:shadow-none transition-all hover:scale-105 active:scale-95"
                            >
                                Đăng ký nhen
                            </button>
                            {/* <button
                                onClick={(e) => { e.stopPropagation(); setShowSignupPopup(false); }}
                                className="text-[#897261] dark:text-gray-400 p-2 lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button> */}
                        </div>
                        {/* Desktop close button */}
                        {/* <button
                            onClick={(e) => { e.stopPropagation(); setShowSignupPopup(false); }}
                            className="hidden lg:flex absolute top-3 right-3 text-[#897261] dark:text-gray-400 p-1 hover:text-[#181411] dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button> */}
                    </div>
                </div>
            )}
        </main>
    );
};

export default ExplorePage;
