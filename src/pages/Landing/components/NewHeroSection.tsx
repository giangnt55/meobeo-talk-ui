import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { userApi, type CommunityStats } from '@/api/services/userApi';

const NewHeroSection: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [stats, setStats] = useState<CommunityStats | null>(null);

    useEffect(() => {
        userApi.getCommunityStats()
            .then(setStats)
            .catch(() => { /* silent fail – social proof is non-critical */ });
    }, []);

    const handleShareClick = () => {
        if (isAuthenticated) {
            navigate('/blog/create');
        } else {
            navigate('/login');
        }
    };

    const handleExploreClick = () => {
        navigate('/explore');
    };

    const formatCount = (count: number): string => {
        if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
        return count.toString();
    };

    return (
        <div className="w-full max-w-[1200px] px-6 lg:px-10 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Hero Content */}
                <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[#181411] dark:text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.02em]">
                            Mỗi Khoảnh Khắc <br />
                            <span className="text-primary relative inline-block">
                                Đều Là Câu Chuyện Riêng
                                <svg
                                    className="absolute -bottom-2 w-full left-0 text-primary/20 -z-10"
                                    height="10"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 100 10"
                                >
                                    <path
                                        d="M0 5 Q 50 10 100 5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                    />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-[#897261] dark:text-gray-300 text-lg leading-relaxed max-w-lg">
                            Gom nhặt từng khoảnh khắc bé xinh, tiếng cười khe khẽ, và cả những phút giây lắng đọng nữa nha. Meowmuc là góc nhỏ ấm áp để tụi mình cùng kể chuyện bằng hình ảnh, biến cuộc sống thành một cuốn nhật ký chung thật rực rỡ và đáng yêu vô cùng!
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <button
                            onClick={handleShareClick}
                            className="flex items-center justify-center rounded-xl h-12 px-8 bg-primary hover:bg-orange-600 text-white text-base font-bold shadow-lg shadow-orange-200 dark:shadow-none transition-all hover:-translate-y-0.5"
                        >
                            Kể chuyện nào
                        </button>
                        <button
                            onClick={handleExploreClick}
                            className="flex items-center justify-center rounded-xl h-12 px-8 bg-white dark:bg-[#382a20] border border-[#e6e0db] dark:border-gray-700 text-[#181411] dark:text-white text-base font-bold hover:bg-gray-50 dark:hover:bg-[#443328] transition-all"
                        >
                            Xem chuyện hay nè
                        </button>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm text-[#897261] dark:text-gray-400">
                        <div className="flex -space-x-3">
                            {stats?.recent_avatars?.map((avatar, index) => (
                                <img
                                    key={index}
                                    alt={`Thành viên ${index + 1}`}
                                    className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover"
                                    src={avatar}
                                />
                            ))}
                            {stats && stats.total_users > (stats.recent_avatars?.length || 0) && (
                                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                    +{formatCount(stats.total_users - (stats.recent_avatars?.length || 0))}
                                </div>
                            )}
                        </div>
                        {stats && (
                            <p>Đã có {formatCount(stats.total_users)} người cùng kể chuyện rồi đó</p>
                        )}
                    </div>
                </div>

                {/* Hero Visual (Scrapbook Collage) */}
                <div className="relative h-[400px] lg:h-[550px] w-full order-1 lg:order-2 perspective-1000">
                    {/* Decorative Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 dark:bg-primary/5 rounded-full blur-3xl -z-10"></div>

                    {/* Image 1: Main */}
                    <div className="absolute top-0 right-4 lg:right-10 w-[65%] aspect-[3/4] rotate-3 shadow-2xl rounded-2xl overflow-hidden border-4 border-white dark:border-[#382a20] transform hover:rotate-0 hover:scale-105 transition-all duration-500 z-10">
                        <img
                            alt="Group of friends laughing at sunset"
                            className="w-full h-full object-cover"
                            src="https://meobeo-r2.giangntse150747.workers.dev/posts/post-1/images/1774096367_IMG_20260314_161148.jpg"
                        />
                    </div>

                    {/* Image 2: Secondary overlapping */}
                    <div className="absolute bottom-10 left-4 lg:left-0 w-[55%] aspect-square -rotate-6 shadow-xl rounded-2xl overflow-hidden border-4 border-white dark:border-[#382a20] transform hover:-rotate-2 hover:scale-105 transition-all duration-500 z-20">
                        <img
                            alt="Camera and coffee on a wooden table"
                            className="w-full h-full object-cover"
                            src="https://meobeo-r2.giangntse150747.workers.dev/posts/post-1/images/1774096180_IMG_20251031_160813.jpg"
                        />
                    </div>

                    {/* Sticker/Badge */}
                    <div className="absolute top-10 left-10 lg:-left-4 bg-white dark:bg-[#2c2018] p-3 rounded-xl shadow-lg rotate-12 z-30 animate-pulse">
                        <span className="material-symbols-outlined text-primary text-3xl">favorite</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewHeroSection;
