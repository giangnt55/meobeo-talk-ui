import React from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import './BlogDetail.css';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Mock data - in production, fetch based on ID
    const post = {
        id: id || '1',
        category: 'Design',
        tags: ['Design System', 'Minimalism', 'UX/UI'],
        title: 'The Art of Minimalist Design',
        subtitle: 'In a world cluttered with noise, finding clarity often means stripping away the unnecessary. This exploration into minimalism isn\'t just about aesthetic choices, but a fundamental shift in how we perceive value.',
        author: {
            name: 'Elena Fisher',
            avatar: 'https://via.placeholder.com/40',
            date: 'Oct 24, 2023',
            readTime: '5 min read'
        },
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYvxfGtD5hG4qubvuZEjgePXBg9AdtbCkqnHjIA3RIKOAFhsU1FoucyFhF_FFvKeq8NN39hnBsKP5n8UC5SFRZ3kuceUVwvyiXeirG9rtgm5Bd5o9jM-X8Tm3m1I7jShruixIH_vPQGzCYB9yvgccDt4Nbl_8J5d1OfaitMCjviXOwZ8xXAw1N3KQfDWPo9AOTFyJW2MUYgVuQm0hHtruD-yEnAt6zoGBOgCskMpEm2UuKtjzhLcY3voYFNkcUvsbp9XLhT3bc-e8',
        heroCaption: 'Visual silence allows the mind to speak.',
        likes: 1200,
        comments: 48,
        lastUpdated: '2 days ago'
    };

    return (
        <>
            <SEO title={`${post.title} - MeoBeo Talk`} />

            <main className="blog-detail-container">
                <article className="blog-detail-article">
                    {/* Category Tags */}
                    <div className="article-categories">
                        <span>{post.category}</span>
                        <span className="category-dot"></span>
                        <span>Philosophy</span>
                    </div>

                    {/* Title */}
                    <h1 className="article-title">{post.title}</h1>

                    {/* Subtitle */}
                    <p className="article-subtitle">{post.subtitle}</p>

                    {/* Author & Actions */}
                    <div className="article-meta">
                        <div className="author-info">
                            <div className="author-avatar">
                                <img src={post.author.avatar} alt={post.author.name} />
                            </div>
                            <div className="author-details">
                                <span className="author-name">{post.author.name}</span>
                                <span className="author-date">
                                    {post.author.date} · {post.author.readTime}
                                </span>
                            </div>
                        </div>
                        <div className="article-actions">
                            <button className="action-btn" aria-label="Bookmark">
                                <span className="material-symbols-outlined">bookmark</span>
                            </button>
                            <button className="action-btn" aria-label="Share">
                                <span className="material-symbols-outlined">ios_share</span>
                            </button>
                            <button className="action-btn" aria-label="More options">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="hero-image-container">
                        <div className="hero-image">
                            <img src={post.heroImage} alt={post.title} />
                        </div>
                        <figcaption className="hero-caption">{post.heroCaption}</figcaption>
                    </div>

                    {/* Article Body */}
                    <div className="article-body">
                        <p className="article-opening">
                            Minimalism is not about emptiness; it is about making room for what truly matters. When we remove the visual clutter from our screens, or the physical clutter from our homes, we are not just creating space—we are curating our attention. The modern web has become a carnival of distractions, with pop-ups, banners, and infinite scrolls vying for a slice of our cognitive bandwidth.
                        </p>

                        <p>
                            Designing for minimalism requires a disciplined restraint. It is easy to add; it is difficult to subtract. Every element on a page must fight for its existence. Does this button serve the user's primary goal? Does this image advance the narrative? If the answer is hesitant, the element must go. This philosophy extends beyond design into the way we write and communicate.
                        </p>

                        <h3>The Functional Aesthetic</h3>

                        <p>
                            Form follows function is an old adage, but in the digital age, it has taken on new urgency. A beautiful interface that confuses the user is a failure of design. True minimalism marries aesthetics with usability, creating an experience that feels intuitive and effortless.
                        </p>

                        {/* Inline Image */}
                        <figure className="inline-image">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7If36zOX6WqTTbznoeWQnpzoRu6hUSJ__AvjXWHeBGAyweIo2xMh0DiXL4omhl7pNE5Yca0ZV9RiSymrrnOV1_AwyvL-kiuoJecXYq2ZqGx-EWKe6_BqfDi4O7qvODAbE5L17dvd7le4qOoR1hf832NmhfUx1nhYk-qH8avlB-gFM1s3MP1oPIOTuO8QgAQGRhzFnMKFDtXTgIv3oB325-5ht7MHjEpCTdDXHlEZ77R6rzHWPtlPG8fhYjSP5rpKddYbs3248_RA"
                                alt="Clean desk setup with a laptop and a plant"
                            />
                        </figure>

                        <p>
                            As we move forward, the "MeoBeo Talk" platform aims to embody these principles. By prioritizing the written word and the author's voice, we strip away the gamification of social interaction. There are no flashing notifications here, only stories waiting to be read.
                        </p>

                        <blockquote className="article-quote">
                            "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
                            <cite>— Antoine de Saint-Exupéry</cite>
                        </blockquote>

                        <p>
                            Embracing this mindset allows creators to focus on the essence of their message. It invites readers into a calm, contemplative space where ideas can be digested slowly, without the pressure to click away to the next trending topic. This is the art of minimalist design—a quiet revolution in a loud world.
                        </p>
                    </div>

                    {/* Footer Meta / Tags */}
                    <div className="article-footer">
                        <div className="article-tags">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="tag-pill">{tag}</span>
                            ))}
                        </div>
                        <div className="article-engagement">
                            <div className="engagement-actions">
                                <button className="engagement-btn">
                                    <span className="material-symbols-outlined">thumb_up</span>
                                    <span>{post.likes.toLocaleString()}</span>
                                </button>
                                <span className="engagement-divider">|</span>
                                <button className="engagement-btn">
                                    <span className="material-symbols-outlined">chat_bubble</span>
                                    <span>{post.comments}</span>
                                </button>
                            </div>
                            <div className="last-updated">
                                Last updated {post.lastUpdated}
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
};

export default BlogDetailPage;
