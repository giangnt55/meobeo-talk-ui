import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '@/types/post';
import '@/pages/Profile/Profile.css';

interface MemoryJourneysListProps {
    journeys: Post[];
    loading?: boolean;
}

const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const JOURNEY_CATEGORY_COLORS: Record<string, string> = {
    'travel': '#ad2bee',
    'food': '#f97316',
    'lifestyle': '#06b6d4',
    'adventure': '#10b981',
    'culture': '#8b5cf6',
    'default': '#6366f1',
};

const MemoryJourneysListComponent: React.FC<MemoryJourneysListProps> = ({ journeys, loading }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="memory-journeys-list">
                {[1, 2].map((i) => (
                    <div key={i} className="profile-journey-card profile-journey-card--skeleton">
                        <div className="profile-journey-image-wrapper skeleton-block" />
                        <div className="profile-journey-content">
                            <div className="skeleton-line skeleton-line--medium" />
                            <div className="skeleton-line skeleton-line--wide" />
                            <div className="skeleton-line skeleton-line--narrow" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!journeys || journeys.length === 0) {
        return (
            <div className="profile-empty-state">
                <span className="material-symbols-outlined profile-empty-state__icon">explore</span>
                <p className="profile-empty-state__text">Chưa có hành trình nào.</p>
            </div>
        );
    }

    return (
        <div className="memory-journeys-list">
            {journeys.map((journey) => {
                const categoryKey = journey.journey_location?.toLowerCase() || 'default';
                const color = JOURNEY_CATEGORY_COLORS[categoryKey] || JOURNEY_CATEGORY_COLORS['default'];

                return (
                    <div
                        key={journey.id}
                        className="profile-journey-card"
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(`/journeys/${journey.id}`)}
                        onKeyDown={(e) => e.key === 'Enter' && navigate(`/journeys/${journey.id}`)}
                    >
                        <div className="profile-journey-image-wrapper">
                            <div
                                className="profile-journey-image"
                                style={{
                                    backgroundImage: journey.banner_url
                                        ? `url(${journey.banner_url})`
                                        : `linear-gradient(135deg, ${color}88 0%, ${color} 100%)`,
                                }}
                            />
                            <div className="profile-journey-image-overlay" />
                        </div>

                        <div className="profile-journey-content">
                            <div className="profile-journey-meta">
                                {journey.journey_location && (
                                    <span
                                        className="profile-journey-category"
                                        style={{
                                            backgroundColor: `${color}1A`,
                                            color,
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                                        {journey.journey_location}
                                    </span>
                                )}
                                {journey.journey_start_date && (
                                    <>
                                        <span className="meta-dot">●</span>
                                        <span className="profile-journey-entries">
                                            {formatDate(journey.journey_start_date)}
                                            {journey.journey_end_date && ` - ${formatDate(journey.journey_end_date)}`}
                                        </span>
                                    </>
                                )}
                            </div>

                            <h3 className="profile-journey-title">{journey.title}</h3>
                            {journey.content_preview && (
                                <p className="profile-journey-description">{journey.content_preview}</p>
                            )}

                            <div className="profile-journey-footer">
                                <div className="profile-journey-stats">
                                    <span className="profile-journey-stat">
                                        <span className="material-symbols-outlined">favorite</span>
                                        {journey.reaction_count}
                                    </span>
                                    <span className="profile-journey-stat">
                                        <span className="material-symbols-outlined">chat_bubble</span>
                                        {journey.comment_count}
                                    </span>
                                </div>
                                <button className="profile-journey-view-btn">
                                    Xem hành trình
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export const MemoryJourneysList = React.memo(MemoryJourneysListComponent);
