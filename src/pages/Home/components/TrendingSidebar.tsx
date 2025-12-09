import React from 'react';
import './TrendingSidebar.css';

interface TrendingTopic {
    id: number;
    category: string;
    hashtag: string;
    posts: string;
}

interface SuggestedUser {
    id: number;
    name: string;
    handle: string;
    avatar: string;
}

const TrendingSidebar: React.FC = () => {
    const trendingTopics: TrendingTopic[] = [
        {
            id: 1,
            category: 'Tech',
            hashtag: '#AIRevolution',
            posts: '1.2M Posts'
        },
        {
            id: 2,
            category: 'Gaming',
            hashtag: '#CyberPulse2077',
            posts: '890k Posts'
        },
        {
            id: 3,
            category: 'Art & Design',
            hashtag: '#CreativeFlow',
            posts: '450k Posts'
        }
    ];

    const suggestedUsers: SuggestedUser[] = [
        {
            id: 1,
            name: 'Sarah Lee',
            handle: '@sarahdesigns',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClkMJJCf4Y16hFu-8_hB6M6FhEHM8eA6EDbZwkVlEMKT1Y_5XVGpKeCFcQ3f8zgsel6idAMg6LRCyiYI7f85P_ENHtD0iEghKaTAYvbR_nHdoV2JEr0KTibVc09hHABXQOfRhbwJSn4b7ozEnVk_BHlU5oVdOK7tHipkudKbMDBCpNH2E9pJSOPu50xndqIQTV4nnewJRugUmductsr6R6BJQ_oLay_ni-Ltv0kdQegs-rQaf4aHrYhwl5_Fmm7JF72CeNfBeb9cau'
        },
        {
            id: 2,
            name: 'Kevin Hart',
            handle: '@kevthedev',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZW-4KtcvI78j9b2CaBx_hRtR-nEepXpSPyahExExasimZSyliez2erKoiLuFhFa4lOb3R6MCCzylSFIlPrF_NQE_sBBxRPdb_bwplN8DSIKUEfySWPgtVvkzsGI2yeixMpvCRDepj7OB5AlocpKsnEsH93j1ZJvPKZmQyIA5n7D9o9-j-0nhaYblpV9WHaa-TvE6bSFpgfU2Uf0wlxPTd9vFyFrxR27W_s5MsYOr9mL3iWkRwSK91ZUHlGfEnANuojms-Ja7UyI9'
        }
    ];

    return (
        <aside className="trending-sidebar">
            <div className="sidebar-sections">
                {/* Trending Topics */}
                <div className="sidebar-card">
                    <h3 className="sidebar-card-title">Trending Topics</h3>
                    <div className="trending-topics">
                        {trendingTopics.map((topic) => (
                            <div key={topic.id} className="topic-item">
                                <p className="topic-meta">
                                    {topic.id} · {topic.category} · Trending
                                </p>
                                <p className="topic-hashtag">{topic.hashtag}</p>
                                <p className="topic-posts">{topic.posts}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Who to Follow */}
                <div className="sidebar-card">
                    <h3 className="sidebar-card-title">Who to Follow</h3>
                    <div className="suggested-users">
                        {suggestedUsers.map((user) => (
                            <div key={user.id} className="user-item">
                                <div className="user-item-info">
                                    <div
                                        className="user-item-avatar"
                                        style={{ backgroundImage: `url("${user.avatar}")` }}
                                    />
                                    <div>
                                        <p className="user-item-name">{user.name}</p>
                                        <p className="user-item-handle">{user.handle}</p>
                                    </div>
                                </div>
                                <button className="follow-btn">Follow</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default TrendingSidebar;
