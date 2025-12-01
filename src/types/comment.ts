import type { User } from "./auth";

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: User;
  parentId?: string;
  replies?: Comment[];
  likesCount: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  content: string;
  postId: string;
  parentId?: string;
}