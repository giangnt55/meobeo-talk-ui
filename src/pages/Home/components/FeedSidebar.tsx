import React from 'react';
import type { Category } from '@/api/services/categoryApi';
import type { SuggestedUser } from '@/schemas/onboarding.schema';
import { initials } from './ArticleCard';

const COLLECTIONS = [
    { icon: 'auto_stories', label: 'Blog của tôi' },
    { icon: 'image', label: 'Ký ức của tôi' },
    { icon: 'flight', label: 'Hành trình của tôi' },
];

export interface FeedSidebarProps {
    suggestedUsers: SuggestedUser[];
    followingIds: Set<string>;
    categories: Category[];
    onFollow: (id: string) => void;
}

export const FeedSidebar: React.FC<FeedSidebarProps> = ({
    suggestedUsers,
    followingIds,
    categories,
    onFollow,
}) => (
    <aside className="stream-sidebar">
        <div className="stream-sidebar-section">
            <h3 className="stream-sidebar-heading">Bộ sưu tập</h3>
            <nav className="stream-sidebar-nav">
                {COLLECTIONS.map((c) => (
                    <a key={c.label} href="#" className="stream-sidebar-nav-item">
                        <span className="material-symbols-outlined">{c.icon}</span>
                        {c.label}
                    </a>
                ))}
                <a href="/blog/create" className="stream-sidebar-nav-item create-link">
                    <span className="material-symbols-outlined">add</span>
                    Tạo bộ sưu tập
                </a>
            </nav>
        </div>

        <div className="stream-sidebar-section">
            <h3 className="stream-sidebar-heading">Chủ đề</h3>
            <div className="stream-tags-list">
                {categories.slice(0, 5).map((cat) => (
                    <button key={cat.id} className="stream-tag-pill">#{cat.name}</button>
                ))}
            </div>
        </div>

        {suggestedUsers.length > 0 && (
            <div className="stream-sidebar-section">
                <h3 className="stream-sidebar-heading">Gợi ý theo dõi</h3>
                <div className="stream-suggested-list">
                    {suggestedUsers.slice(0, 4).map((user) => {
                        const name = user.display_name || user.username;
                        return (
                            <div key={user.id} className="stream-suggested-user">
                                <div className="stream-suggested-user-info">
                                    {user.avatar_url ? (
                                        <div
                                            className="stream-suggested-avatar"
                                            style={{ backgroundImage: `url(${user.avatar_url})` }}
                                        />
                                    ) : (
                                        <div className="stream-suggested-avatar">
                                            {initials(name)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="stream-suggested-name">{name}</p>
                                        <p className="stream-suggested-role">@{user.username}</p>
                                    </div>
                                </div>
                                <button
                                    className="stream-follow-btn"
                                    onClick={() => onFollow(user.id)}
                                >
                                    {followingIds.has(user.id) ? 'Đã theo' : 'Theo dõi'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
    </aside>
);
