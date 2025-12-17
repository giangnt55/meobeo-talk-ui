import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import './Profile.css';

// Mock data - sẽ được thay thế bằng API calls
const MOCK_USER_DATA = {
    displayName: 'Alex Doe',
    username: 'alexdoe',
    bio: 'Digital artist & storyteller. Exploring the intersection of technology and creativity. Let\'s connect and create something amazing together! ✨',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADweeidT_517mG3XyWhAoqCFDI0uosKBtCLRfeu0CnLr0ca1gHhg4HNEG5XFWyXz8_cM3jvmUt9QqpiJ0iPuLYPGmHCYvwn4ZQN1gsqwsoASJaRam5iR9oUDQ8tuKp7ySIOn6_rmC3PAUlCK_XsyvlIVyPVinQ5CX7Bw4RXW5HzJ-fpYSFwWkh0oRQsQPZBXq2eJijirYxSYPONLlPi4dPvMQcpn6-RmIw_xWGGrOme5_Ennt6spyB5y6jUHSMkCfxUmF-PaC0IuaX',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbFsPgQrGC3CsWmzQ4SYHSi2YlCe6ilcMIpLIsyRQRgGQdoHu9RDwHoELY87O0kHSqp_6vSS-RsTKrpY-8ly1RzobGzeaOwpRdN7eGh5Ue3Q-oUlxcA-q-smOd8W7Tz9FgHHk16YxlS2UBTbqBIO4wsky7_hk_UJQ9F0x83zIhxNw59mKxT6VpGCUP_dcthXdDIG73038l_eIt9IcTnuuJS_wyGWQErBM3pxSxxaS24q4L6EIm4_cF4gQ1MwX4mKquTBG-rBgxIUw1',
    stats: {
        posts: 128,
        followers: 1200,
        following: 345,
    },
    socialLinks: [
        { name: 'Twitter', icon: 'alternate_email', url: '#' },
        { name: 'Instagram', icon: 'photo_camera', url: '#' },
        { name: 'Website', icon: 'language', url: '#' },
    ],
};

const MOCK_BLOG_POSTS = [
    {
        id: '1',
        title: 'My Creative Journey',
        excerpt: 'A deep dive into the world of digital art and inspiration. How I found my style and voice.',
        coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1fYkZxVo9lPmUaCzxhxE0vnZe1kQeIzbhE3gNQKDEFEcInVgIa3lYTFzwYZdm9HagRUzrinZmrzVRBuNDNId53oQCtsPyw1_a7fM9dl3MH9GUz1p3Yy4PLaYFGVmR3QTVeS33nM9mW_8iiK6txlgP-qNhjNASXXFYwRf7kI5BdBKVkRFJMgtQxFeHnjrYkzHa3wwY4Lt8kcJQPds0I2euN6yXnYBZj-n5HXSYNrRQZHUAEF64vpdTJkAxpKdNeiYdL5CJjcuvu5v-',
        date: 'Oct 24, 2023',
        readTime: '5 min read',
        likes: 2100,
        comments: 152,
    },
    {
        id: '2',
        title: 'Tech & Design Fusion',
        excerpt: 'How modern technology is reshaping the design industry and what to expect in the next decade.',
        coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSlviCIj1iY4xMkVENzL03VpDcolWk_-SAe4fEOac8SBvhs_PJNgge14cOk6gScUMiQEaxIFieNQ2VcNaz2NyuvXvX9SLTj_olXae1MqhUUNkwW1a03FyHl8bDZ3wlhb8kDb50qinaGTuAnM3PzoYOMPRUtcshw9hMfXy0Mdzx719WgmZnqfudlGpSEa8x38c9a2DN-q6aN_Qh3tIRixqhxqCCyfLseAY_-rG8JqR4UpT4VGby_1VhR7VWWt4Yw4b9f8w8_VTV2sGg',
        date: 'Oct 20, 2023',
        readTime: '8 min read',
        likes: 1800,
        comments: 98,
    },
];

export const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { user: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState<'posts' | 'journal' | 'journeys'>('posts');
    const [searchQuery, setSearchQuery] = useState('');

    const isOwnProfile = currentUser?.username === username;

    return (
        <div className="profile-page">
            {/* Cover Image */}
            <div className="profile-cover-wrapper">
                <div
                    className="profile-cover"
                    style={{ backgroundImage: `url(${MOCK_USER_DATA.coverImage})` }}
                >
                    <div className="cover-overlay"></div>
                    {isOwnProfile && (
                        <button className="edit-cover-btn">
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                    )}
                </div>

                {/* Avatar */}
                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar-container">
                        <div
                            className="profile-avatar"
                            style={{ backgroundImage: `url(${MOCK_USER_DATA.avatar})` }}
                        />
                        {isOwnProfile && (
                            <button className="edit-avatar-btn">
                                <span className="material-symbols-outlined">photo_camera</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="profile-content">
                <div className="profile-grid">
                    {/* Sidebar */}
                    <aside className="profile-sidebar">
                        <div className="profile-info">
                            <div className="profile-header">
                                <h1 className="profile-name">{MOCK_USER_DATA.displayName}</h1>
                                <p className="profile-username">@{MOCK_USER_DATA.username}</p>
                            </div>

                            <p className="profile-bio">{MOCK_USER_DATA.bio}</p>

                            {/* Stats */}
                            <div className="profile-stats">
                                <div className="stat-item">
                                    <span className="stat-value">{MOCK_USER_DATA.stats.posts}</span>
                                    <span className="stat-label">Posts</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-value">{MOCK_USER_DATA.stats.followers.toLocaleString()}</span>
                                    <span className="stat-label">Followers</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-value">{MOCK_USER_DATA.stats.following}</span>
                                    <span className="stat-label">Following</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="profile-actions">
                                {isOwnProfile ? (
                                    <button className="btn-edit-profile">Edit Profile</button>
                                ) : (
                                    <>
                                        <button className="btn-follow">Follow</button>
                                        <button className="btn-message">Message</button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="social-links-section">
                            <h3 className="section-title">Connect</h3>
                            <div className="social-links">
                                {MOCK_USER_DATA.socialLinks.map((link) => (
                                    <a key={link.name} href={link.url} className="social-link">
                                        <div className="social-icon">
                                            <span className="material-symbols-outlined">{link.icon}</span>
                                        </div>
                                        <p className="social-name">{link.name}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="profile-main">
                        {/* Tabs */}
                        <div className="profile-tabs">
                            <nav className="tabs-nav">
                                <button
                                    className={`tab-item ${activeTab === 'posts' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('posts')}
                                >
                                    Blog Posts
                                </button>
                                <button
                                    className={`tab-item ${activeTab === 'journal' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('journal')}
                                >
                                    Memory Journal
                                </button>
                                <button
                                    className={`tab-item ${activeTab === 'journeys' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('journeys')}
                                >
                                    Memory Journeys
                                </button>
                            </nav>
                        </div>

                        {/* Search Bar */}
                        <div className="search-bar">
                            <div className="search-input-wrapper">
                                <span className="material-symbols-outlined search-icon">search</span>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search blog posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="filter-btn">
                                <span className="material-symbols-outlined">tune</span>
                            </button>
                        </div>

                        {/* Content based on active tab */}
                        {activeTab === 'posts' && (
                            <div className="blog-posts-grid">
                                {MOCK_BLOG_POSTS.map((post) => (
                                    <article key={post.id} className="blog-post-card">
                                        <div className="post-image-wrapper">
                                            <div
                                                className="post-image"
                                                style={{ backgroundImage: `url(${post.coverImage})` }}
                                            />
                                            <span className="post-badge">Blog</span>
                                        </div>
                                        <div className="post-content">
                                            <div className="post-meta">
                                                <span>{post.date}</span>
                                                <span className="meta-dot">●</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                            <h3 className="post-title">
                                                <a href="#">{post.title}</a>
                                            </h3>
                                            <p className="post-excerpt">{post.excerpt}</p>
                                            <div className="post-footer">
                                                <div className="post-actions">
                                                    <button className="action-btn">
                                                        <span className="material-symbols-outlined">favorite</span>
                                                        <span>{post.likes.toLocaleString()}</span>
                                                    </button>
                                                    <button className="action-btn">
                                                        <span className="material-symbols-outlined">chat_bubble</span>
                                                        <span>{post.comments}</span>
                                                    </button>
                                                </div>
                                                <button className="bookmark-btn">
                                                    <span className="material-symbols-outlined">bookmark</span>
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {activeTab === 'journal' && (
                            <div className="journal-content">
                                <div className="section-divider">
                                    <span className="divider-text">Memory Journal Content</span>
                                </div>
                                <p className="empty-state">Memory journal entries will be displayed here.</p>
                            </div>
                        )}

                        {activeTab === 'journeys' && (
                            <div className="journeys-content">
                                <div className="section-divider">
                                    <span className="divider-text">Memory Journeys Content</span>
                                </div>
                                <p className="empty-state">Memory journeys will be displayed here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
