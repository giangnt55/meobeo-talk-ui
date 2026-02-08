import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import './MemoriesPage.css';

// Mock Data for Memories Grid
const MOCK_MEMORIES = [
    {
        id: '1',
        title: 'Buổi Sáng Yên Bình',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiaFm6VIMM0e_nfW8_1YLo_aqDaZoGY4NlXPTR7dRLVpuxp79XR2mI-4OeURIMi8j9EvQ-LidkBciaiiayoTKyHusm-TqT2Ic6C5MtB82QKFzxg0O1Ua_pmsTDkbS2_DzHU3GOduCPpTY-KsbyPVLM5rnObw_MDKVco38AlLK0duJ7Rph6gdQXqWv-fcvpgkDAEHwuLymomifTWp8bpSlGbCrda2ArjfjtJUeE-nIMVmPGNLVdcfx1uvx-uYPq4APebkgzunqBRDE',
        date: '12 Tháng 8, 2023',
        tag: 'Yên ắng'
    },
    {
        id: '2',
        title: 'Đường Mòn Thiên Nhiên',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbT__WMNJsXN1P9J0d0LLgFXDvqu1XXbp_G5Izs2ElUntnHRHGtUQSBINI50aBerg45hz37-S8KPdCohZZx3E9cS7AbAES82QNlOMwjhYKEtkJgG8NYz7KyKVFbU8O-SrdHQXNI3B73P6rOzK1eJCT8kLuRL0d3JzuYpeag9UlnoghG8D_q9ORFd4v00LQbA7v7fcc61nJB8vXNG-rdogN4DWvWRaDQkd1WPdbBOSjYBeiicfoeqTK2CzCBb0d3cnDKfZgs9QmnXM',
        date: 'Hôm qua',
        tag: 'Thanh bình'
    },
    {
        id: '3',
        title: 'Bên Bờ Biển',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBSccwxDEboiC0gonyN5RbZL3YLyk5O3Iyf3Lhg6DBK5xQyogA9xe02pwspRbETiTnwwbpNocpg9g9FZnIX4RbHGtZQ5S5YurqXziVQmQkVQP0Na2q0hk_L19J4XVmkfMURTOzM1suvLZR-1tTSSrzrSGvQPVGf3BPc18OW0zzhhwicTvv3r_5Tg23__WHmNMromZsQaryi3ymRkmdcO-fIbuKA2UWoY4wcPgFFkzc43yzvsKGl1Lyc_nIqJ2cG_VdJgfaeoeo_bA',
        date: '15 Tháng 7, 2023',
        tag: 'Hoài cổ'
    },
    {
        id: '4',
        title: 'Góc Làm Việc',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWW9bxhTbqYM9G2LzXazPL7Y65XhV6V1o3FRaQYpDZ_BbuRfM3Z-qVal3RPD1kLNqtRJ_xeaQTcDwu5Jj88lmfPFDPpvnqSvxH9SPmvvzhjfbxaqaNdyYp_T5j_BjaE_FoG879PRgnLl9t0aF5PMiTqqD5k2scBzR2M988UvmZqe07Q2Yk7OAxnFjy8CcurbS2O68q2xpu3PDVZtQG4ydwxRL4NF4OBqBEsImCeugvX1k5Ura0LOX2nPtvwVgIoa_fPA6RKWN10zQ',
        date: '02 Tháng 10, 2023',
        tag: 'Sáng tạo'
    },
    {
        id: '5',
        title: 'Phút Giây Cà Phê',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi5erPtSgt1-xApPH8BB3OKAWUmSjxIVaaWJQmuQxfKofxQCP79-D9pTJOwNLi-sWfxxPpbWDf9rHLOU9LG4fh_ThuqJse16scQFJAWIm3iEXIF7plhmNjyypyVDWN_jhX1Tkd-TZ4GMbLmALq_WL9IFvzSoVVLhxcjosG1hzlhJyH-wDrI31S94DzQTZkMLPepKaJI43jtVntFe6j9G8PdMgwGpO7GhsUBXo_1pwesX1WQ8jjvxBLkEEDDxanO2y-NgAyo6glYXQ',
        date: '20 Tháng 12, 2023',
        tag: 'Ấm áp'
    },
    {
        id: '6',
        title: 'Copenhagen',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-aEcad-FHi8XVwSQ1FhjR7pqpQI9ek1IJ321EYcPyOzKfLZry5zTxCtrSdyqx6PGz7Xq9uDi8U_170j8PilvbtoTjMIbzwN351BQtZ4r1cooNSYZOThnyrpZFCYm-3AXB0P5hE41hXTv_HxTbNf3XrX3u0wGptl0tmI-Qi9qIOh5YmzeYAdjZ6xW2ZRCg57jxShDIgHh1tg3lP-CB5xxo-egVFN40GJUr9AzQUF5SUAv07hxikV2LwvfsXPpHRuiExTaiJyv_ye8',
        date: '11 Tháng 11, 2023',
        tag: 'Vui vẻ'
    },
    {
        id: '7',
        title: 'Góc Phố',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCixoByZoVjC2MLpdtaI0PUNAF7FevRAkMpI1jnEd5zUmi9CvqeyyeJPmGzy88rxNaN2cGiFFeMp0Wq4yyvYpGyFUaYQ6tH09cKwlxQ1Rt3ojvXMbk4IiKqRMNU7_RL64_CRfzXnIQ3G5m1Ak3VNkJPatkbI3KLaRbY1ShGY81EABLrqjKyxgCZFxUXcBbzthQYdik4XxDBP-KZWw7PDwXFYIztdmxNRfvAOOtJDovRjHCUMQF3yyalRPnPRD7OCv0oSs2BMBCf18',
        date: '28 Tháng 9, 2023',
        tag: 'Thành thị'
    },
    {
        id: '8',
        title: 'Cảnh Rừng',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAC-I9HDVTaf5QODyTL_VcPiYQpZazT6vyfjCf9Wnvfvvb95ExcBJde9A5yFX4-HaCWUi9BGEdAiuWk7r6rK1cC72dlPRGepwt2rlUT_unXYKz62JKZWX3ZIJs4L62PleW9eiyO7vheBPcauhtqzzeCqgAcuIOpMr-6AApLQZQKIT_evnYq9NFr3LBbwEdlbM6Js-XD3HGhBBzdWc8t7Z-Dt97aHA98t-KJk66DAuAEBBOFU1tDW9PUO4mlJm_UyD5Nl6ErGzzz4s',
        date: 'Tháng trước',
        tag: 'Yên ắng'
    }
];

// Mock Data for Journeys Grid
const MOCK_JOURNEYS = [
    {
        id: '1',
        title: 'Mùa Hè Châu Âu',
        count: '24 Ký Ức',
        date: 'Th6 - Th8 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-aEcad-FHi8XVwSQ1FhjR7pqpQI9ek1IJ321EYcPyOzKfLZry5zTxCtrSdyqx6PGz7Xq9uDi8U_170j8PilvbtoTjMIbzwN351BQtZ4r1cooNSYZOThnyrpZFCYm-3AXB0P5hE41hXTv_HxTbNf3XrX3u0wGptl0tmI-Qi9qIOh5YmzeYAdjZ6xW2ZRCg57jxShDIgHh1tg3lP-CB5xxo-egVFN40GJUr9AzQUF5SUAv07hxikV2LwvfsXPpHRuiExTaiJyv_ye8',
        aspect: 'aspect-[4/5]'
    },
    {
        id: '2',
        title: 'Leo Núi Cuối Tuần',
        count: '12 Ký Ức',
        date: 'Mùa Thu 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAC-I9HDVTaf5QODyTL_VcPiYQpZazT6vyfjCf9Wnvfvvb95ExcBJde9A5yFX4-HaCWUi9BGEdAiuWk7r6rK1cC72dlPRGepwt2rlUT_unXYKz62JKZWX3ZIJs4L62PleW9eiyO7vheBPcauhtqzzeCqgAcuIOpMr-6AApLQZQKIT_evnYq9NFr3LBbwEdlbM6Js-XD3HGhBBzdWc8t7Z-Dt97aHA98t-KJk66DAuAEBBOFU1tDW9PUO4mlJm_UyD5Nl6ErGzzz4s',
        aspect: 'aspect-square'
    },
    {
        id: '3',
        title: 'Quán Cà Phê Yên Tĩnh',
        count: '8 Ký Ức',
        date: '2023 - Hiện tại',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi5erPtSgt1-xApPH8BB3OKAWUmSjxIVaaWJQmuQxfKofxQCP79-D9pTJOwNLi-sWfxxPpbWDf9rHLOU9LG4fh_ThuqJse16scQFJAWIm3iEXIF7plhmNjyypyVDWN_jhX1Tkd-TZ4GMbLmALq_WL9IFvzSoVVLhxcjosG1hzlhJyH-wDrI31S94DzQTZkMLPepKaJI43jtVntFe6j9G8PdMgwGpO7GhsUBXo_1pwesX1WQ8jjvxBLkEEDDxanO2y-NgAyo6glYXQ',
        aspect: 'aspect-[3/4]'
    },
    {
        id: '4',
        title: 'Quá Trình Sáng Tạo',
        count: '42 Ký Ức',
        date: 'Tháng 10 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWW9bxhTbqYM9G2LzXazPL7Y65XhV6V1o3FRaQYpDZ_BbuRfM3Z-qVal3RPD1kLNqtRJ_xeaQTcDwu5Jj88lmfPFDPpvnqSvxH9SPmvvzhjfbxaqaNdyYp_T5j_BjaE_FoG879PRgnLl9t0aF5PMiTqqD5k2scBzR2M988UvmZqe07Q2Yk7OAxnFjy8CcurbS2O68q2xpu3PDVZtQG4ydwxRL4NF4OBqBEsImCeugvX1k5Ura0LOX2nPtvwVgIoa_fPA6RKWN10zQ',
        aspect: 'aspect-[4/5]'
    },
    {
        id: '5',
        title: 'Kỳ Nghỉ Biển',
        count: '15 Ký Ức',
        date: 'Tháng 7 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBSccwxDEboiC0gonyN5RbZL3YLyk5O3Iyf3Lhg6DBK5xQyogA9xe02pwspRbETiTnwwbpNocpg9g9FZnIX4RbHGtZQ5S5YurqXziVQmQkVQP0Na2q0hk_L19J4XVmkfMURTOzM1suvLZR-1tTSSrzrSGvQPVGf3BPc18OW0zzhhwicTvv3r_5Tg23__WHmNMromZsQaryi3ymRkmdcO-fIbuKA2UWoY4wcPgFFkzc43yzvsKGl1Lyc_nIqJ2cG_VdJgfaeoeo_bA',
        aspect: 'aspect-video'
    },
    {
        id: '6',
        title: 'Thói Quen Buổi Sáng',
        count: '31 Ký Ức',
        date: 'Năm 2023',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiaFm6VIMM0e_nfW8_1YLo_aqDaZoGY4NlXPTR7dRLVpuxp79XR2mI-4OeURIMi8j9EvQ-LidkBciaiiayoTKyHusm-TqT2Ic6C5MtB82QKFzxg0O1Ua_pmsTDkbS2_DzHU3GOduCPpTY-KsbyPVLM5rnObw_MDKVco38AlLK0duJ7Rph6gdQXqWv-fcvpgkDAEHwuLymomifTWp8bpSlGbCrda2ArjfjtJUeE-nIMVmPGNLVdcfx1uvx-uYPq4APebkgzunqBRDE',
        aspect: 'aspect-square'
    }
];

export const MemoriesPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'journal' | 'journeys'>('journal');

    return (
        <div className="memories-page">
            <SEO
                title="Your Memories - MeoBeo Talk"
                description="Nơi lưu giữ những kỷ niệm đáng nhớ."
            />

            {/* Sticky Sub-nav */}
            <div className="memories-subnav-sticky">
                <div className="memories-subnav-container">
                    <div className="memories-tabs">
                        <button
                            className={`memories-tab ${activeTab === 'journal' ? 'active' : ''}`}
                            onClick={() => setActiveTab('journal')}
                        >
                            Nhật Ký Ký Ức
                        </button>
                        <button
                            className={`memories-tab ${activeTab === 'journeys' ? 'active' : ''}`}
                            onClick={() => setActiveTab('journeys')}
                        >
                            Hành Trình Ký Ức
                        </button>
                    </div>
                </div>
            </div>

            <main className="memories-main-content">
                {/* Page Header */}
                <div className="memories-page-header">
                    <h1>{activeTab === 'journal' ? 'Ký Ức Của Bạn' : 'Hành Trình Của Bạn'}</h1>
                    <button
                        className="create-memory-btn"
                        onClick={() => navigate(activeTab === 'journal' ? '/memories/create' : '/journey/create')}
                    >
                        <span className="material-symbols-outlined">
                            {activeTab === 'journal' ? 'add_photo_alternate' : 'auto_stories'}
                        </span>
                        <span>{activeTab === 'journal' ? 'Tạo Ký Ức' : 'Tạo Hành Trình'}</span>
                    </button>
                </div>

                {/* Content Rendering */}
                {activeTab === 'journal' ? (
                    <div className="memories-masonry-grid">
                        {MOCK_MEMORIES.map((memory) => (
                            <div
                                key={memory.id}
                                className="memory-masonry-item group"
                                onClick={() => navigate(`/memories/${memory.id}`)}
                            >
                                <div className="memory-card-image-wrapper">
                                    <img
                                        src={memory.image}
                                        alt={memory.title}
                                        className="memory-card-image"
                                    />
                                </div>
                                <div className="memory-card-content">
                                    <span className="memory-tag">{memory.tag}</span>
                                    <span className="memory-date">{memory.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="memories-masonry-grid">
                        {MOCK_JOURNEYS.map((journey) => (
                            <div
                                key={journey.id}
                                className="memory-masonry-item group cursor-pointer"
                                onClick={() => navigate(`/memories/journeys/${journey.id}`)}
                            >
                                <div className="stack-effect mb-6">
                                    <div className="journey-card-image-wrapper">
                                        <img
                                            src={journey.image}
                                            alt={journey.title}
                                            className={`journey-card-image ${journey.aspect}`}
                                        />
                                    </div>
                                </div>
                                <div className="journey-card-info">
                                    <h3 className="journey-title">{journey.title}</h3>
                                    <div className="journey-meta">
                                        <span>{journey.count}</span>
                                        <span className="journey-dot"></span>
                                        <span>{journey.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

        </div>
    );
};
