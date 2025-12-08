import { Card, CardBody, CardHeader } from "@/components/common/Card/Card";
import "./BlogCard.css";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorAvatar: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  category,
  title,
  excerpt,
  authorName,
  authorAvatar,
}) => {
  return (
    <Card hoverable outline="subtle">
      <CardHeader className="blog-card-header">
        <img src={image} alt={title} className="blog-image" />
      </CardHeader>

      <CardBody>
        <p className="blog-category">{category}</p>
        <h3 className="blog-title">{title}</h3>
        <p className="blog-excerpt">{excerpt}</p>

        <div className="blog-author">
          <img src={authorAvatar} className="author-avatar" />
          <span>{authorName}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
