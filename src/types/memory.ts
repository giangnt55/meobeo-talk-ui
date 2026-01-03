export interface Memory {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
  tags: string[];
  images?: string[];
  visibility: 'public' | 'friends' | 'private';
  created_at: string;
  updated_at: string;
  user_id: string;
  likes_count: number;
  comments_count: number;
  is_liked?: boolean;
}

export interface MemoryTemplate {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description?: string;
}

export interface MemoryFilter {
  year?: number;
  tags?: string[];
  mood?: string;
  sortBy?: 'newest' | 'oldest' | 'mostLiked';
}