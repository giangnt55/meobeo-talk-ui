import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { Tag } from '@/components/common/Tag/Tag';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { Input } from '@/components/common/Input/Input';
import type { Memory } from '@/types/memory';
import { mockMemories } from '@/mock/memoryData';
import { formatMemoryDate } from '@/utils/memoryHelpers';
import './MemoryDetail.css';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

export const MemoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Olivia',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      content:
        'This looks absolutely incredible! I have always wanted to go to Paris.',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      userId: '3',
      userName: 'Liam',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      content:
        'That picnic by the Seine sounds like a dream. Making me want to book a flight! ✈️',
      timestamp: '1 hour ago',
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const found = mockMemories.find((m) => m.id === id);
    if (found) {
      setMemory(found);
    }
  }, [id]);

  if (!memory) {
    return (
      <div className="memory-detail-loading">
        <p>Loading memory...</p>
      </div>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        userId: 'current-user',
        userName: 'You',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        content: newComment,
        timestamp: 'Just now',
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="memory-detail-page">
      <div className="memory-detail-container">
        <div className="memory-detail-header">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            leftIcon={<span>←</span>}
          >
            Back to Journal
          </Button>

          <div className="memory-actions">
            <button className="action-button">
              <span>🔗</span>
            </button>
            <button className="action-button">
              <span>✏️</span>
            </button>
            <button className="action-button danger">
              <span>🗑️</span>
            </button>
          </div>
        </div>

        <article className="memory-content">
          <h1 className="memory-detail-title">{memory.title}</h1>
          <p className="memory-detail-meta">
            {formatMemoryDate(memory.date)} • {memory.content.split(' ')[0]}, France
          </p>

          <div className="memory-detail-tags">
            {memory.mood && (
              <Tag variant="primary" icon={<span>😊</span>}>
                {memory.mood}
              </Tag>
            )}
            {memory.tags.map((tag) => (
              <Tag key={tag} icon={<span>🎨</span>}>
                {tag}
              </Tag>
            ))}
          </div>

          <div className="memory-detail-body">
            <div className="memory-text-content">
              <p>{memory.content}</p>
              <p>
                We spent hours getting lost in the Louvre, standing in awe before
                masterpieces we'd only ever seen in books. But the real highlight?
                A sunset picnic by the Seine, watching the Eiffel Tower light up
                the night sky. It was a simple moment, but one I'll cherish
                forever.
              </p>
            </div>

            {memory.images && memory.images.length > 0 && (
              <div className="memory-images">
                {memory.images.map((img, idx) => (
                  <div key={idx} className="memory-image-wrapper">
                    <img src={img} alt={`Memory ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="memory-engagement">
            <div className="engagement-actions">
              <button
                className={`engagement-button ${isLiked ? 'liked' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <span>{isLiked ? '❤️' : '🤍'}</span>
                <span>{memory.likes_count}</span>
              </button>
              <div className="liked-avatars">
                <Avatar size="sm" src="https://i.pravatar.cc/150?img=4" />
                <Avatar size="sm" src="https://i.pravatar.cc/150?img=5" />
                <Avatar size="sm" src="https://i.pravatar.cc/150?img=6" />
              </div>
            </div>
            <p className="comment-count">{comments.length} Comments</p>
          </div>

          <div className="comments-section">
            <h3 className="comments-title">Comments</h3>

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <Avatar src={comment.userAvatar} alt={comment.userName} />
                  <div className="comment-content">
                    <div className="comment-bubble">
                      <p className="comment-author">{comment.userName}</p>
                      <p className="comment-text">{comment.content}</p>
                    </div>
                    <p className="comment-time">{comment.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="comment-form">
              <Avatar src="https://i.pravatar.cc/150?img=1" alt="You" />
              <div className="comment-input-wrapper">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddComment();
                    }
                  }}
                  endIcon={
                    <button
                      className="send-button"
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                    >
                      <span>➤</span>
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
