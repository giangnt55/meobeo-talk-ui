import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import { MyJourneysSection } from './components/MyJourneysSection'; // Rename this/reuse if possible, or build new
import './MemoriesPage.css';

// Mock Data for Memories Grid
const MOCK_MEMORIES = [
    {
        id: '1',
        title: 'Quiet Morning',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiaFm6VIMM0e_nfW8_1YLo_aqDaZoGY4NlXPTR7dRLVpuxp79XR2mI-4OeURIMi8j9EvQ-LidkBciaiiayoTKyHusm-TqT2Ic6C5MtB82QKFzxg0O1Ua_pmsTDkbS2_DzHU3GOduCPpTY-KsbyPVLM5rnObw_MDKVco38AlLK0duJ7Rph6gdQXqWv-fcvpgkDAEHwuLymomifTWp8bpSlGbCrda2ArjfjtJUeE-nIMVmPGNLVdcfx1uvx-uYPq4APebkgzunqBRDE',
        date: 'August 12, 2023',
        tag: 'Quiet'
    },
    {
        id: '2',
        title: 'Nature Path',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbT__WMNJsXN1P9J0d0LLgFXDvqu1XXbp_G5Izs2ElUntnHRHGtUQSBINI50aBerg45hz37-S8KPdCohZZx3E9cS7AbAES82QNlOMwjhYKEtkJgG8NYz7KyKVFbU8O-SrdHQXNI3B73P6rOzK1eJCT8kLuRL0d3JzuYpeag9UlnoghG8D_q9ORFd4v00LQbA7v7fcc61nJB8vXNG-rdogN4DWvWRaDQkd1WPdbBOSjYBeiicfoeqTK2CzCBb0d3cnDKfZgs9QmnXM',
        date: 'Yesterday',
        tag: 'Serene'
    },
    {
        id: '3',
        title: 'Seaside',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBSccwxDEboiC0gonyN5RbZL3YLyk5O3Iyf3Lhg6DBK5xQyogA9xe02pwspRbETiTnwwbpNocpg9g9FZnIX4RbHGtZQ5S5YurqXziVQmQkVQP0Na2q0hk_L19J4XVmkfMURTOzM1suvLZR-1tTSSrzrSGvQPVGf3BPc18OW0zzhhwicTvv3r_5Tg23__WHmNMromZsQaryi3ymRkmdcO-fIbuKA2UWoY4wcPgFFkzc43yzvsKGl1Lyc_nIqJ2cG_VdJgfaeoeo_bA',
        date: 'July 15, 2023',
        tag: 'Nostalgic'
    },
    {
        id: '4',
        title: 'Workspace',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWW9bxhTbqYM9G2LzXazPL7Y65XhV6V1o3FRaQYpDZ_BbuRfM3Z-qVal3RPD1kLNqtRJ_xeaQTcDwu5Jj88lmfPFDPpvnqSvxH9SPmvvzhjfbxaqaNdyYp_T5j_BjaE_FoG879PRgnLl9t0aF5PMiTqqD5k2scBzR2M988UvmZqe07Q2Yk7OAxnFjy8CcurbS2O68q2xpu3PDVZtQG4ydwxRL4NF4OBqBEsImCeugvX1k5Ura0LOX2nPtvwVgIoa_fPA6RKWN10zQ',
        date: 'October 02, 2023',
        tag: 'Creative'
    },
    {
        id: '5',
        title: 'Coffee Moment',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi5erPtSgt1-xApPH8BB3OKAWUmSjxIVaaWJQmuQxfKofxQCP79-D9pTJOwNLi-sWfxxPpbWDf9rHLOU9LG4fh_ThuqJse16scQFJAWIm3iEXIF7plhmNjyypyVDWN_jhX1Tkd-TZ4GMbLmALq_WL9IFvzSoVVLhxcjosG1hzlhJyH-wDrI31S94DzQTZkMLPepKaJI43jtVntFe6j9G8PdMgwGpO7GhsUBXo_1pwesX1WQ8jjvxBLkEEDDxanO2y-NgAyo6glYXQ',
        date: 'December 20, 2023',
        tag: 'Warm'
    },
    {
        id: '6',
        title: 'Copenhagen',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-aEcad-FHi8XVwSQ1FhjR7pqpQI9ek1IJ321EYcPyOzKfLZry5zTxCtrSdyqx6PGz7Xq9uDi8U_170j8PilvbtoTjMIbzwN351BQtZ4r1cooNSYZOThnyrpZFCYm-3AXB0P5hE41hXTv_HxTbNf3XrX3u0wGptl0tmI-Qi9qIOh5YmzeYAdjZ6xW2ZRCg57jxShDIgHh1tg3lP-CB5xxo-egVFN40GJUr9AzQUF5SUAv07hxikV2LwvfsXPpHRuiExTaiJyv_ye8',
        date: 'November 11, 2023',
        tag: 'Joyful'
    },
    {
        id: '7',
        title: 'Street Scene',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCixoByZoVjC2MLpdtaI0PUNAF7FevRAkMpI1jnEd5zUmi9CvqeyyeJPmGzy88rxNaN2cGiFFeMp0Wq4yyvYpGyFUaYQ6tH09cKwlxQ1Rt3ojvXMbk4IiKqRMNU7_RL64_CRfzXnIQ3G5m1Ak3VNkJPatkbI3KLaRbY1ShGY81EABLrqjKyxgCZFxUXcBbzthQYdik4XxDBP-KZWw7PDwXFYIztdmxNRfvAOOtJDovRjHCUMQF3yyalRPnPRD7OCv0oSs2BMBCf18',
        date: 'September 28, 2023',
        tag: 'Urban'
    },
    {
        id: '8',
        title: 'Forest View',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAC-I9HDVTaf5QODyTL_VcPiYQpZazT6vyfjCf9Wnvfvvb95ExcBJde9A5yFX4-HaCWUi9BGEdAiuWk7r6rK1cC72dlPRGepwt2rlUT_unXYKz62JKZWX3ZIJs4L62PleW9eiyO7vheBPcauhtqzzeCqgAcuIOpMr-6AApLQZQKIT_evnYq9NFr3LBbwEdlbM6Js-XD3HGhBBzdWc8t7Z-Dt97aHA98t-KJk66DAuAEBBOFU1tDW9PUO4mlJm_UyD5Nl6ErGzzz4s',
        date: 'Last Month',
        tag: 'Quiet'
    }
];

export const MemoriesPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'journal' | 'journeys'>('journal');

    return (
        <div className="memories-page">
            <SEO
                title="Your Memories - MeoBeo Talk"
                description="Your digital memory sanctuary."
            />

            {/* Sticky Sub-nav */}
            <div className="memories-subnav-sticky">
                <div className="memories-subnav-container">
                    <div className="memories-tabs">
                        <button
                            className={`memories-tab ${activeTab === 'journal' ? 'active' : ''}`}
                            onClick={() => setActiveTab('journal')}
                        >
                            Memory Journal
                        </button>
                        <button
                            className={`memories-tab ${activeTab === 'journeys' ? 'active' : ''}`}
                            onClick={() => setActiveTab('journeys')}
                        >
                            Memory Journeys
                        </button>
                    </div>
                </div>
            </div>

            <main className="memories-main-content">
                {/* Page Header */}
                <div className="memories-page-header">
                    <h1>Your Memories</h1>
                    <button
                        className="create-memory-btn"
                        onClick={() => navigate('/memories/create')}
                    >
                        <span className="material-symbols-outlined">add_photo_alternate</span>
                        <span>Create Memory</span>
                    </button>
                </div>

                {/* Content Rendering */}
                {activeTab === 'journal' ? (
                    <div className="memories-masonry-grid">
                        {MOCK_MEMORIES.map((memory) => (
                            <div key={memory.id} className="memory-masonry-item group">
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
                    <div className="journeys-view-container">
                        {/* Reusing existing component for Journeys view if available, or placeholder */}
                        <div className="journeys-section-wrapper">
                            <MyJourneysSection />
                        </div>
                    </div>
                )}
            </main>

        </div>
    );
};
