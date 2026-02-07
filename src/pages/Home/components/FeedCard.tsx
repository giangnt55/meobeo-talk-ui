import React from 'react';
import './FeedCard.css';

interface FeedCardProps {
    imageUrl: string;
    title?: string;
    category?: string;
    authorName: string;
    authorAvatar?: string;
    likes?: number;
    isLiked?: boolean;
    onLike?: () => void;
    onBookmark?: () => void;
    aspectRatio?: 'auto' | 'square';
}

const FeedCard: React.FC<FeedCardProps> = ({
    imageUrl,
    title,
    category = 'Memory',
    authorName,
    authorAvatar,
    likes = 0,
    isLiked = false,
    onLike,
    onBookmark,
    aspectRatio = 'auto',
}) => {
    const getCategoryColor = (cat: string) => {
        const colors: Record<string, string> = {
            'Serene': 'bg-blue-500/80',
            'Nostalgic': 'bg-white/20',
            'Joyful': 'bg-primary/80',
            'Peaceful': 'bg-white/20',
            'Growth': 'bg-green-600/80',
            'Productive': 'bg-white/20',
            'Wanderlust': 'bg-blue-500/80',
            'Cozy': 'bg-primary/80',
        };
        return colors[cat] || 'bg-white/20';
    };

    return (
        <div className="feed-card">
            <img
                src={imageUrl}
                alt={title || 'Feed image'}
                className={`feed-card-image ${aspectRatio === 'square' ? 'aspect-square' : ''}`}
            />
            <div className="feed-card-overlay"></div>

            {/* Bookmark button - shows on hover */}
            <button
                className="feed-card-bookmark"
                onClick={onBookmark}
                aria-label="Bookmark"
            >
                <span className="material-symbols-outlined">bookmark</span>
            </button>

            {/* Bottom content */}
            <div className="feed-card-content">
                {/* Category tags */}
                <div className="feed-card-tags">
                    <span className={`feed-card-tag ${getCategoryColor(category)}`}>
                        {category}
                    </span>
                </div>

                {/* Title if provided */}
                {title && <h3 className="feed-card-title">{title}</h3>}

                {/* Author and likes */}
                <div className="feed-card-footer">
                    <div className="feed-card-author">
                        {authorAvatar && (
                            <div
                                className="feed-card-avatar"
                                style={{ backgroundImage: `url(${authorAvatar})` }}
                            ></div>
                        )}
                        <span className="feed-card-author-name">{authorName}</span>
                    </div>

                    {likes > 0 && (
                        <button
                            className="feed-card-likes"
                            onClick={onLike}
                        >
                            <span className={`material-symbols-outlined ${isLiked ? 'filled' : ''}`}>
                                favorite
                            </span>
                            <span className="feed-card-likes-count">{likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedCard;
