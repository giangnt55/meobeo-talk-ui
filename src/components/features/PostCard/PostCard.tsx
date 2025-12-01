import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  CardActions,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../../../types/post';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onBookmark,
  onShare,
}) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profile/${post.author.id}`);
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/category/${post.category.slug}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(post.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.(post.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(post.id);
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: vi,
  });

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={handlePostClick}
    >
      {/* Thumbnail */}
      {post.thumbnail && (
        <CardMedia
          component="img"
          height="200"
          image={post.thumbnail}
          alt={post.title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Author Info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            gap: 1.5,
          }}
          onClick={handleAuthorClick}
        >
          <Avatar
            src={post.author.avatar}
            alt={post.author.displayName}
            sx={{ width: 32, height: 32 }}
          >
            {post.author.displayName.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {post.author.displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {timeAgo} · {post.readTime} phút đọc
            </Typography>
          </Box>
        </Box>

        {/* Category */}
        <Chip
          label={post.category.name}
          size="small"
          onClick={handleCategoryClick}
          sx={{
            mb: 1.5,
            fontWeight: 600,
            bgcolor: 'primary.50',
            color: 'primary.main',
          }}
        />

        {/* Title */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 700,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 1,
          }}
        >
          {post.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 2,
          }}
        >
          {post.description}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {post.tags.slice(0, 3).map((tag) => (
            <Chip
              key={tag.id}
              label={`#${tag.name}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          px: 2,
          pb: 2,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={handleLike}
              color={post.isLiked ? 'error' : 'default'}
            >
              {post.isLiked ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.likesCount}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small">
              <CommentIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.commentsCount}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={handleBookmark}
            color={post.isBookmarked ? 'primary' : 'default'}
          >
            {post.isBookmarked ? (
              <BookmarkIcon fontSize="small" />
            ) : (
              <BookmarkBorderIcon fontSize="small" />
            )}
          </IconButton>
          <IconButton size="small" onClick={handleShare}>
            <ShareIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;