import React from 'react';
import { Card, CardBody } from '../../common/Card/Card';
import { Tag } from '../../common/Tag/Tag';
// import { Avatar } from '../../common/Avatar/Avatar'; // Removed unused import
import './MemoryCard.css';

interface MemoryCardProps {
  id: string;
  title: string;
  date: string;
  image?: string;
  content: string;
  tags: string[];
  mood?: string;
  likes: number;
  comments: number;
  onClick?: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  title,
  date,
  image,
  content,
  tags,
  mood,
  likes,
  comments,
  onClick,
}) => {
  return (
    <Card hoverable onClick={onClick} className="memory-card">
      <div className="memory-card-header">
        <span className="memory-icon">✈️</span>
      </div>
      <CardBody>
        <p className="memory-date">{date}</p>
        <h3 className="memory-title">{title}</h3>
        {image && (
          <div
            className="memory-image"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
        <p className="memory-content">{content}</p>
        {mood && (
          <div className="memory-mood">
            <Tag variant="primary" size="sm">
              😊 {mood}
            </Tag>
          </div>
        )}
        <div className="memory-tags">
          {tags.map((tag) => (
            <Tag key={tag} size="sm">
              #{tag}
            </Tag>
          ))}
        </div>
        <div className="memory-footer">
          <div className="memory-stats">
            <span>❤️ {likes}</span>
            <span>💬 {comments}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};