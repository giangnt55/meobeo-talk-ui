import React from 'react';
import '@/pages/Profile/Profile.css';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readTime: string;
    likes: number;
    comments: number;
}

interface BlogPostCardProps {
    post: BlogPost;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
    return (
        <article className="blog-post-card">
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
    );
};