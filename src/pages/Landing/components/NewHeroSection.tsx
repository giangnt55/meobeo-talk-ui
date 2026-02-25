import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const NewHeroSection: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

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

    return (
        <div className="w-full max-w-[1200px] px-6 lg:px-10 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Hero Content */}
                <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[#181411] dark:text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.02em]">
                            Mỗi Ký Ức <br />
                            <span className="text-primary relative inline-block">
                                Là Một Câu Chuyện
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
                            Lưu giữ những khoảnh khắc thoáng qua, tiếng cười, và những phút giây lắng đọng. MeoBeo Talk là nơi cất giữ những câu chuyện bằng hình ảnh, biến những mảnh ghép cuộc sống thành một hành trình đáng nhớ.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <button
                            onClick={handleShareClick}
                            className="flex items-center justify-center rounded-xl h-12 px-8 bg-primary hover:bg-orange-600 text-white text-base font-bold shadow-lg shadow-orange-200 dark:shadow-none transition-all hover:-translate-y-0.5"
                        >
                            Bắt đầu chia sẻ nè
                        </button>
                        <button
                            onClick={handleExploreClick}
                            className="flex items-center justify-center rounded-xl h-12 px-8 bg-white dark:bg-[#382a20] border border-[#e6e0db] dark:border-gray-700 text-[#181411] dark:text-white text-base font-bold hover:bg-gray-50 dark:hover:bg-[#443328] transition-all"
                        >
                            Khám phá các câu chuyện
                        </button>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm text-[#897261] dark:text-gray-400">
                        <div className="flex -space-x-3">
                            <img
                                alt="User avatar smiling woman"
                                className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP-MOMLAsrdtunOOGUwZCGvXEKUCQV0t30xuN0VnDatKrJi5XBhPX8lXPgAid6nYmYla95z8PyliiIIaZzDDLCQ3S96Z8cMvvBTHlSEc1f40lFVuUN7q368HRaVBthUKWE2zb4lfT8tzG3vTPKglSickL68GjwZiWpDGz5wQpfHlYeL0dpJwLSUchfc8N91kvg-ErWWc2SJP6enBr4IwkxVrsjT7JvPTpRIJ-DqCvUZaY5EHMShVry9603jn1A_9w8B2oSItQB8bY"
                            />
                            <img
                                alt="User avatar young man"
                                className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWan4AFaiT4cVIuSavTS8AfnIblKSIL4bAAQrTZ6Zr2u0HOgQZa8bSdUScljb_bIi1MAQsnhRTx7LXgVxNVtPsu_F0QWAHcHDkJ5vXfZ0UavseOPIgNjPBi4ChPr-jzUCCZRbkI5SKIesRZn15fGjfFq7hsutYAVM9q6yeWFVYlEfwKag-QYjE9gNI0rd-VfjT1mif73RbsMrCqyHc6oCxagoWt7OxGp-oM8ut25ssOQAJAvoHDIq3qalGHYAKHlupFHrbBu-fEFs"
                            />
                            <img
                                alt="User avatar woman glasses"
                                className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJFuG2bzDrBF1Fyij4bcTMBhJ8WzIahdRD-dPl_JvIfsRcz-LFgL8ihYViPQZlMnRb4O9nykngzkH_glSeJqpepx-aKYsQmoMZ7Y6yqxdnDwlVJNbAoPOgPncM0D4YQJTwjW5QwLCnewelLXv8powYp0f6xIsNoIAc-fKOXmyAFmMvOjWme5Ztpvj4sBAkeFo5z1lrjkNLzd8RBNgoHJACyaZCWxrsR2_r_52YvzS46grJSi2Ypc1omoJTiscTiqitOiaR7OkHgPg"
                            />
                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                +2k
                            </div>
                        </div>
                        <p>Tham gia cùng 2,000+ người kể chuyện điii.</p>
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
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAciMarNAA-Kox-Zkr-IeSSHaUAQxwGsXErL21q_22-sSSf4oY-lNJ5As9bHlRtVzSUoMLXjsmC2SJs3Tv6YSq4qJaGa-SNmFd4vEkF-EV-lqr0D8XpzTw7Z7u5uz-5jBevBns443EuY5spD2XrfaX_Pso1VoRriMzR1UpL8EaAMA1yJ_IvHllpXPFWdA7AeGaMyuq7PJen1I8LDSuh_lQ28a-7NsvCgOoHiTPys0dsDb0HT90PS-uXiEVpAopua4H6SdWpgt-5Dyk"
                        />
                    </div>

                    {/* Image 2: Secondary overlapping */}
                    <div className="absolute bottom-10 left-4 lg:left-0 w-[55%] aspect-square -rotate-6 shadow-xl rounded-2xl overflow-hidden border-4 border-white dark:border-[#382a20] transform hover:-rotate-2 hover:scale-105 transition-all duration-500 z-20">
                        <img
                            alt="Camera and coffee on a wooden table"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY_FPw9vQv42ggEKvQGolp8lrXD97UgOcRly-Bl1atqfiImPf_ev2AW4NDwjkJrck3RZkgWmesrseOn2tfyg077JXN4cDmgwJXjWZMAknY0RX0hFxn53J5QVqeKNYJv2QVPDHMX9_-k9NpLxdB_Jd6gOyIQs_JLjIlcRdOwgQt3cICn6dENJ5LabqXA286cCWwOqjcWS7oKLXqRSQosSoI5CMCD7kGWPVt_-OiXlE8XJAEMyTIyn5E4Ejuc4mUDCiM6_sgevMXra8"
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
