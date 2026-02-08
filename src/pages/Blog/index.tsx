import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [activeTab, setActiveTab] = useState('Khám phá');

    const categories = ['Tất cả', 'Du lịch', 'Đời sống', 'Cà phê', 'Nhiếp ảnh', 'Thiên nhiên', 'Đô thị'];

    const blogPosts = [
        {
            id: 1,
            category: 'Du lịch',
            title: 'Mùa Hè Ở Kyoto',
            description: 'Những ngôi chùa vàng soi bóng xuống mặt nước tĩnh lặng, tìm thấy những ngôi đền yên bình giữa cái nóng mùa hè.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiaFm6VIMM0e_nfW8_1YLo_aqDaZoGY4NlXPTR7dRLVpuxp79XR2mI-4OeURIMi8j9EvQ-LidkBciaiiayoTKyHusm-TqT2Ic6C5MtB82QKFzxg0O1Ua_pmsTDkbS2_DzHU3GOduCPpTY-KsbyPVLM5rnObw_MDKVco38AlLK0duJ7Rph6gdQXqWv-fcvpgkDAEHwuLymomifTWp8bpSlGbCrda2ArjfjtJUeE-nIMVmPGNLVdcfx1uvx-uYPq4APebkgzunqBRDE',
        },
        {
            id: 2,
            category: 'Đời sống',
            title: 'Nghệ Thuật Cà Phê',
            description: 'Khám phá những sắc thái tinh tế của một tách cà phê hoàn hảo, từng giọt chậm rãi.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi5erPtSgt1-xApPH8BB3OKAWUmSjxIVaaWJQmuQxfKofxQCP79-D9pTJOwNLi-sWfxxPpbWDf9rHLOU9LG4fh_ThuqJse16scQFJAWIm3iEXIF7plhmNjyypyVDWN_jhX1Tkd-TZ4GMbLmALq_WL9IFvzSoVVLhxcjosG1hzlhJyH-wDrI31S94DzQTZkMLPepKaJI43jtVntFe6j9G8PdMgwGpO7GhsUBXo_1pwesX1WQ8jjvxBLkEEDDxanO2y-NgAyo6glYXQ',
        },
        {
            id: 3,
            category: 'Thiên nhiên',
            title: 'Sương Mù Trên Núi',
            description: 'Thức dậy giữa biển mây và sự hùng vĩ tĩnh lặng của những đỉnh núi cao.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbT__WMNJsXN1P9J0d0LLgFXDvqu1XXbp_G5Izs2ElUntnHRHGtUQSBINI50aBerg45hz37-S8KPdCohZZx3E9cS7AbAES82QNlOMwjhYKEtkJgG8NYz7KyKVFbU8O-SrdHQXNI3B73P6rOzK1eJCT8kLuRL0d3JzuYpeag9UlnoghG8D_q9ORFd4v00LQbA7v7fcc61nJB8vXNG-rdogN4DWvWRaDQkd1WPdbBOSjYBeiicfoeqTK2CzCBb0d3cnDKfZgs9QmnXM',
        },
        {
            id: 4,
            category: 'Đô thị',
            title: 'Sự Cô Đơn Đô Thị',
            description: 'Tìm thấy những khoảnh khắc bình yên bất ngờ trong nhịp sống hối hả của đường phố thành phố.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-aEcad-FHi8XVwSQ1FhjR7pqpQI9ek1IJ321EYcPyOzKfLZry5zTxCtrSdyqx6PGz7Xq9uDi8U_170j8PilvbtoTjMIbzwN351BQtZ4r1cooNSYZOThnyrpZFCYm-3AXB0P5hE41hXTv_HxTbNf3XrX3u0wGptl0tmI-Qi9qIOh5YmzeYAdjZ6xW2ZRCg57jxShDIgHh1tg3lP-CB5xxo-egVFN40GJUr9AzQUF5SUAv07hxikV2LwvfsXPpHRuiExTaiJyv_ye8',
        },
        {
            id: 5,
            category: 'Nhiếp ảnh',
            title: 'Những Món Đồ Cổ',
            description: 'Kho báu từ cuối tuần trước: những chiếc máy ảnh cũ và những câu chuyện bị lãng quên trong những cuốn sách.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCixoByZoVjC2MLpdtaI0PUNAF7FevRAkMpI1jnEd5zUmi9CvqeyyeJPmGzy88rxNaN2cGiFFeMp0Wq4yyvYpGyFUaYQ6tH09cKwlxQ1Rt3ojvXMbk4IiKqRMNU7_RL64_CRfzXnIQ3G5m1Ak3VNkJPatkbI3KLaRbY1ShGY81EABLrqjKyxgCZFxUXcBbzthQYdik4XxDBP-KZWw7PDwXFYIztdmxNRfvAOOtJDovRjHCUMQF3yyalRPnPRD7OCv0oSs2BMBCf18',
        },
        {
            id: 6,
            category: 'Đời sống',
            title: 'Những Ngày Mưa',
            description: 'Không khí ấm cúng, trà nóng và tiếng mưa rơi đều đều bên cửa sổ.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAC-I9HDVTaf5QODyTL_VcPiYQpZazT6vyfjCf9Wnvfvvb95ExcBJde9A5yFX4-HaCWUi9BGEdAiuWk7r6rK1cC72dlPRGepwt2rlUT_unXYKz62JKZWX3ZIJs4L62PleW9eiyO7vheBPcauhtqzzeCqgAcuIOpMr-6AApLQZQKIT_evnYq9NFr3LBbwEdlbM6Js-XD3HGhBBzdWc8t7Z-Dt97aHA98t-KJk66DAuAEBBOFU1tDW9PUO4mlJm_UyD5Nl6ErGzzz4s',
        },
        {
            id: 7,
            category: 'Du lịch',
            title: 'Trốn Thoát Ra Đảo',
            description: 'Bỏ lại thế giới phía sau trong vài ngày để tận hưởng nắng, cát và nước biển xanh ngọc.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBSccwxDEboiC0gonyN5RbZL3YLyk5O3Iyf3Lhg6DBK5xQyogA9xe02pwspRbETiTnwwbpNocpg9g9FZnIX4RbHGtZQ5S5YurqXziVQmQkVQP0Na2q0hk_L19J4XVmkfMURTOzM1suvLZR-1tTSSrzrSGvQPVGf3BPc18OW0zzhhwicTvv3r_5Tg23__WHmNMromZsQaryi3ymRkmdcO-fIbuKA2UWoY4wcPgFFkzc43yzvsKGl1Lyc_nIqJ2cG_VdJgfaeoeo_bA',
        },
        {
            id: 8,
            category: 'Nhiếp ảnh',
            title: 'Câu Chuyện Vải Vóc',
            description: 'Dệt những ký ức vào từng thớ vải, hiểu lịch sử đằng sau mỗi hoa văn.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWW9bxhTbqYM9G2LzXazPL7Y65XhV6V1o3FRaQYpDZ_BbuRfM3Z-qVal3RPD1kLNqtRJ_xeaQTcDwu5Jj88lmfPFDPpvnqSvxH9SPmvvzhjfbxaqaNdyYp_T5j_BjaE_FoG879PRgnLl9t0aF5PMiTqqD5k2scBzR2M988UvmZqe07Q2Yk7OAxnFjy8CcurbS2O68q2xpu3PDVZtQG4ydwxRL4NF4OBqBEsImCeugvX1k5Ura0LOX2nPtvwVgIoa_fPA6RKWN10zQ',
        },
    ];

    const filteredPosts = activeCategory === 'Tất cả'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

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

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 pb-12">
                    {filteredPosts.map((post) => (
                        <article
                            key={post.id}
                            className="flex flex-col gap-3 group cursor-pointer"
                            onClick={() => navigate(`/blog/${post.id}`)}
                        >
                            <div className="overflow-hidden rounded-xl shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                                <div
                                    className="w-full bg-center bg-no-repeat aspect-[4/5] bg-cover transform transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url("${post.image}")` }}
                                ></div>
                            </div>
                            <div className="flex flex-col gap-1 px-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                    {post.category}
                                </span>
                                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                                    {post.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default BlogPage;
