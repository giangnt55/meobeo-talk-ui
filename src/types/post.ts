import type { User } from "./auth";
import type { Category } from "./category";
import type { Tag } from "./tag";

export interface Post {
  id: string;
  title: string;
  content: string;
  description: string;
  thumbnail?: string;
  categoryId: string;
  category: Category;
  tags: Tag[];
  author: User;
  authorId: string;
  status: PostStatus;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  readTime: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export const PostStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  HIDDEN: 'HIDDEN'
} as const;

export type PostStatus = typeof PostStatus[keyof typeof PostStatus];

export interface CreatePostData {
  title: string;
  content: string;
  description: string;
  thumbnail?: string;
  categoryId: string;
  tags: string[];
  status: PostStatus;
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}