export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface SearchParams extends PaginationParams {
  query?: string;
  categoryId?: string;
  tags?: string[];
  authorId?: string;
}

export const FeedType = {
  Post: "post",
  ForYou: "for-you",
  Newest: "newest",
  Trending: "trending",
  Comment: "comment",
  Notification: "notification"
} as const;

export type FeedType = typeof FeedType[keyof typeof FeedType];
