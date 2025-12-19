import React from 'react';
import { FaPlay, FaHeart, FaPencilAlt } from 'react-icons/fa';
import './PostCard.css';

interface PostCardProps {
    imageUrl?: string;
    title?: string;
    authorName: string;
    authorAvatar?: string;
    isVideo?: boolean;
    alt?: string;
    postType?: 'blog' | 'journey';
    bannerUrl?: string;
    thumbnailUrl?: string;
}

const PostCard: React.FC<PostCardProps> = ({
    imageUrl,
    title = 'Untitled',
    authorName,
    authorAvatar = '/default-avatar.png',
    isVideo = false,
    alt = 'Post image',
    postType = 'blog',
    bannerUrl,
    thumbnailUrl
}) => {
    // Use banner first, then thumbnail, then imageUrl as fallback
    const displayImage = bannerUrl || thumbnailUrl || imageUrl || '/placeholder-image.png';

    return (
        <div className="post-card">
            <div className="post-image-container">
                <img
                    alt={alt}
                    className="post-image"
                    src={displayImage}
                />

                {/* Type Badge */}
                <div className="post-type-badge">
                    <div className={`badge-content ${postType}`}>
                        {postType === 'blog' ? (
                            <>
                                <FaPencilAlt className="badge-icon" />
                                <span className="badge-label">Blog</span>
                            </>
                        ) : (
                            <>
                                <FaHeart className="badge-icon filled" />
                                <span className="badge-label">Journey</span>
                            </>
                        )}
                    </div>
                </div>

                {isVideo && (
                    <div className="video-overlay">
                        <FaPlay className="play-icon" />
                    </div>
                )}

                <div className="post-overlay">
                    <div className="post-info">
                        <p className="post-title">{title}</p>
                        <div className="post-author">
                            <div
                                className="author-avatar"
                                style={{ backgroundImage: `url("${authorAvatar}")` }}
                            />
                            <p className="author-name">{authorName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
