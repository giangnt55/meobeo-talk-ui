import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Whatshot as WhatshotIcon,
  NewReleases as NewReleasesIcon,
  Recommend as RecommendIcon,
} from '@mui/icons-material';
import PostCard from '../../components/features/PostCard/PostCard';
import type { Post } from '../../types/post';
import { FeedType } from '../../types/common';
import { CATEGORIES, POPULAR_TAGS } from '../../utils';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FeedType>(FeedType.ForYou);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock posts data
        const mockPosts: Post[] = [
          {
            id: '1',
            title: 'Khám phá React 19: Những tính năng đột phá',
            content: 'Content here...',
            description:
              'React 19 mang đến nhiều cải tiến về performance và developer experience...',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
            categoryId: '1',
            category: { id: '1', name: 'Tech', slug: 'tech', postCount: 234, icon: '💻' },
            tags: [
              { id: '1', name: 'React', slug: 'react', postCount: 123 },
              { id: '2', name: 'JavaScript', slug: 'javascript', postCount: 456 },
            ],
            author: {
              id: '1',
              email: 'user@example.com',
              displayName: 'Nguyễn Văn A',
              avatar: '',
              followerCount: 1234,
              followingCount: 567,
              postCount: 42,
              createdAt: '2024-01-01',
            },
            authorId: '1',
            status: "PUBLISHED",
            likesCount: 234,
            commentsCount: 45,
            viewsCount: 1234,
            readTime: 5,
            isLiked: false,
            isBookmarked: false,
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Coffee shops thú vị ở Sài Gòn',
            content: 'Content here...',
            description:
              'Khám phá những quán cà phê độc đáo và yên tĩnh giữa lòng thành phố...',
            thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
            categoryId: '2',
            category: { id: '2', name: 'Life', slug: 'life', postCount: 156, icon: '🏖️' },
            tags: [
              { id: '3', name: 'Travel', slug: 'travel', postCount: 89 },
              { id: '4', name: 'Lifestyle', slug: 'lifestyle', postCount: 234 },
            ],
            author: {
              id: '2',
              email: 'user2@example.com',
              displayName: 'Trần Thị B',
              avatar: '',
              followerCount: 2345,
              followingCount: 123,
              postCount: 67,
              createdAt: '2024-01-01',
            },
            authorId: '2',
            status: "PUBLISHED",
            likesCount: 567,
            commentsCount: 89,
            viewsCount: 2345,
            readTime: 8,
            isLiked: true,
            isBookmarked: false,
            createdAt: new Date(Date.now() - 18000000).toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Làm thế nào để trở thành Senior Developer',
            content: 'Content here...',
            description:
              'Chia sẻ kinh nghiệm từ junior đến senior trong 5 năm...',
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
            categoryId: '5',
            category: { id: '5', name: 'Dev', slug: 'dev', postCount: 345, icon: '💼' },
            tags: [
              { id: '5', name: 'Career', slug: 'career', postCount: 167 },
              { id: '6', name: 'Programming', slug: 'programming', postCount: 289 },
            ],
            author: {
              id: '3',
              email: 'user3@example.com',
              displayName: 'Lê Văn C',
              avatar: '',
              followerCount: 3456,
              followingCount: 234,
              postCount: 89,
              createdAt: '2024-01-01',
            },
            authorId: '3',
            status: "PUBLISHED",
            likesCount: 892,
            commentsCount: 156,
            viewsCount: 4567,
            readTime: 12,
            isLiked: false,
            isBookmarked: true,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        setPosts(mockPosts);
      } catch (err) {
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: FeedType) => {
    setActiveTab(newValue);
  };

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleShare = (postId: string) => {
    // Implement share functionality
    console.log('Share post:', postId);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                icon={<RecommendIcon />}
                iconPosition="start"
                label="Dành cho bạn"
                value={FeedType.ForYou}
              />
              <Tab
                icon={<NewReleasesIcon />}
                iconPosition="start"
                label="Mới nhất"
                value={FeedType.Newest}
              />
              <Tab
                icon={<WhatshotIcon />}
                iconPosition="start"
                label="Xu hướng"
                value={FeedType.Trending}
              />
            </Tabs>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Posts Grid */}
          {!loading && !error && (
            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid size= {{xs:12}} key={post.id}>
                  <PostCard
                    post={post}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    onShare={handleShare}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Empty State */}
          {!loading && !error && posts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Không có bài viết nào
              </Typography>
            </Box>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid size={{xs:12, lg:4}} sx={{ display: { xs: 'none', lg: 'block' } }}>
          {/* Categories */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Danh mục
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
              {CATEGORIES.map((category) => (
                <Box
                  key={category.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                  onClick={() => navigate(`/category/${category.slug}`)}
                >
                  <Typography fontSize="1.5rem">{category.icon}</Typography>
                  <Typography fontWeight={500}>{category.name}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Popular Tags */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Tags phổ biến
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {POPULAR_TAGS.map((tag: React.Key | null | undefined) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  onClick={() => navigate(`/search?tag=${tag}`)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'primary.50',
                      color: 'primary.main',
                    },
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;