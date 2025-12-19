// Updated Post type with new fields
export type PostType = 'blog' | 'journey';

export interface Post {
  id: string;
  author_id: string;
  post_type: PostType;

  // Content
  title?: string;
  content: string;
  content_preview?: string;

  // Images
  banner_url?: string;
  thumbnail_url?: string;

  // Mood/Emotion
  mood?: string;
  emotion_intensity?: number;

  // Journey-specific
  journey_start_date?: string;
  journey_end_date?: string;
  journey_location?: string;
  journal_count?: number;

  // Blog-specific
  read_time_minutes?: number;
  category?: string;

  // Visibility & Status
  visibility: string;
  status: string;
  allow_comments: boolean;
  is_sensitive: boolean;

  // Counters
  comment_count: number;
  reaction_count: number;
  view_count: number;

  // Timestamps
  created_at: string;
  updated_at: string;

  // Author (from feed)
  author?: {
    id: string;
    username: string;
    display_name?: string;
    avatar_url?: string;
    bio?: string;
  };
}

export interface Journal {
  id: string;
  journey_id: string;
  author_id: string;
  title: string;
  content: string;
  content_preview?: string;
  images?: string[];
  location?: string;
  date?: string;
  mood?: string;
  emotion_intensity?: number;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface JourneyStats {
  journey_id: string;
  journal_count: number;
  total_images: number;
  duration_days?: number;
  last_journal_date?: string;
}

export interface JourneyWithJournals extends Post {
  journals: Journal[];
  stats?: JourneyStats;
}

export interface CreateJournalInput {
  title: string;
  content: string;
  content_preview?: string;
  images?: string[];
  location?: string;
  date?: string;
  mood?: string;
  emotion_intensity?: number;
}

export interface UpdateJournalInput {
  title?: string;
  content?: string;
  content_preview?: string;
  images?: string[];
  location?: string;
  date?: string;
  mood?: string;
  emotion_intensity?: number;
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}