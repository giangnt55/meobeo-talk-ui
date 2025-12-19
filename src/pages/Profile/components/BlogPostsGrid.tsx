import React from 'react';
import { BlogPostCard } from './BlogPostCard';
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

interface BlogPostsGridProps {
    posts: BlogPost[];
}

export const BlogPostsGrid: React.FC<BlogPostsGridProps> = ({ posts }) => {
    return (
        <div className="blog-posts-grid">
            {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
        </div>
    );
};