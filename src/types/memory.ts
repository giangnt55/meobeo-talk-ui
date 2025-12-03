export interface Memory {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
  tags: string[];
  images?: string[];
  visibility: 'public' | 'friends' | 'private';
  createdAt: string;
  updatedAt: string;
  userId: string;
  likes: number;
  comments: number;
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