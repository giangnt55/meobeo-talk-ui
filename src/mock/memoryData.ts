import type { Memory, MemoryTemplate } from "../types/memory";

export const mockMemories: Memory[] = [
  {
    id: '1',
    title: 'Summer Vacation in Bali',
    content: 'An unforgettable trip exploring the temples, beaches, and vibrant culture of Bali...',
    date: '2023-08-15',
    mood: 'Joyful',
    tags: ['travel', 'beach'],
    images: ['https://example.com/bali.jpg'],
    visibility: 'public',
    createdAt: '2023-08-15T10:00:00Z',
    updatedAt: '2023-08-15T10:00:00Z',
    userId: 'user1',
    likes: 24,
    comments: 3,
  },
  {
    id: '2',
    title: 'Graduation Day',
    content: 'The end of one chapter and the exciting beginning of another...',
    date: '2023-05-20',
    mood: 'Proud',
    tags: ['milestone', 'family'],
    visibility: 'friends',
    createdAt: '2023-05-20T10:00:00Z',
    updatedAt: '2023-05-20T10:00:00Z',
    userId: 'user1',
    likes: 18,
    comments: 5,
  },
];

export const mockTemplates: MemoryTemplate[] = [
  {
    id: '1',
    name: 'Wanderlust Journey',
    category: 'Travel',
    thumbnail: 'https://example.com/template1.jpg',
  },
  {
    id: '2',
    name: 'Golden Moments',
    category: 'Friendship',
    thumbnail: 'https://example.com/template2.jpg',
  },
];