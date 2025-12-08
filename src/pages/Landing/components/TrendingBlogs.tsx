import BlogCard from "@/components/common/BlogCard/BlogCard";
import "../Landing.css";

const blogData = [
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    category: "Travel",
    title: "An Unforgettable Trip to Bali",
    excerpt: "Exploring temples, beaches and culture...",
    authorName: "Sarah Millner",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    category: "Travel",
    title: "An Unforgettable Trip to Bali",
    excerpt: "Exploring temples, beaches and culture...",
    authorName: "Sarah Millner",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    category: "Travel",
    title: "An Unforgettable Trip to Bali",
    excerpt: "Exploring temples, beaches and culture...",
    authorName: "Sarah Millner",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  // ... add other 2 items
];

const TrendingBlogs = () => {
  return (
    <section className="blog-section">
      <h2 className="section-title">Trending on the Blog</h2>
      <p className="section-subtitle">Discover what's buzzing.</p>

      <div className="blog-grid">
        {blogData.map((blog, i) => (
          <BlogCard key={i} {...blog} />
        ))}
      </div>
    </section>
  );
};

export default TrendingBlogs;
