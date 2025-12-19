import React, { useState, useEffect } from 'react';
import './TrendingSidebar.css';
import { postApi, type TrendingTopic } from '@/api/services/postApi';
import { followApi } from '@/api/services/followApi';
import type { SuggestedUser } from '@/schemas/onboarding.schema';

const TrendingSidebar: React.FC = () => {
    const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
    const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [trending, users] = await Promise.all([
                postApi.getTrending(3),
                followApi.getSuggestedUsers(2),
            ]);
            setTrendingTopics(trending);
            setSuggestedUsers(users);
        } catch (error) {
            console.error('Error fetching sidebar data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <aside className="trending-sidebar">
                <div className="sidebar-sections">
                    <div className="sidebar-card">
                        <p style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
                            Loading...
                        </p>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="trending-sidebar">
            <div className="sidebar-sections">
                {/* Trending Topics */}
                {trendingTopics.length > 0 && (
                    <div className="sidebar-card">
                        <h3 className="sidebar-card-title">Trending Topics</h3>
                        <div className="trending-topics">
                            {trendingTopics.map((topic, index) => (
                                <div key={index} className="topic-item">
                                    <p className="topic-meta">
                                        {index + 1} · Trending
                                    </p>
                                    <p className="topic-hashtag">{topic.hashtag}</p>
                                    <p className="topic-posts">
                                        {topic.post_count.toLocaleString()} Posts
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Who to Follow */}
                {suggestedUsers.length > 0 && (
                    <div className="sidebar-card">
                        <h3 className="sidebar-card-title">Who to Follow</h3>
                        <div className="suggested-users">
                            {suggestedUsers.map((user) => (
                                <div key={user.id} className="user-item">
                                    <div className="user-item-info">
                                        <div
                                            className="user-item-avatar"
                                            style={{
                                                backgroundImage: `url("${user.avatar_url || 'https://via.placeholder.com/40'}")`
                                            }}
                                        />
                                        <div>
                                            <p className="user-item-name">
                                                {user.display_name || user.username}
                                            </p>
                                            <p className="user-item-handle">@{user.username}</p>
                                        </div>
                                    </div>
                                    <button className="follow-btn">Follow</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {trendingTopics.length === 0 && suggestedUsers.length === 0 && (
                    <div className="sidebar-card">
                        <p style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
                            No trending topics or suggested users at the moment.
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default TrendingSidebar;
