import { z } from 'zod';
import { apiResponseSchema, paginatedResponseSchema } from './api.schema';

// ============= Base Schema =============

export const memorySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  date: z.string().datetime(),
  mood: z.string().optional(),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags').default([]),
  images: z.array(z.string().url()).max(10, 'Maximum 10 images').default([]),
  visibility: z.enum(['public', 'friends', 'private']).default('private'),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  user_id: z.string().uuid(),
  author: z.object({
    id: z.string().uuid(),
    username: z.string(),
    display_name: z.string(),
    avatar: z.string().url().optional(),
  }).optional(),
  likes_count: z.number().int().nonnegative().default(0),
  comments_count: z.number().int().nonnegative().default(0),
  is_liked: z.boolean().optional(),
});

// ============= Request Schemas =============

// Create memory (omit backend-generated fields)
export const createMemorySchema = memorySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  user_id: true,
  author: true,
  likes_count: true,
  comments_count: true,
  is_liked: true,
});

// Update memory (all fields optional except changed ones)
export const updateMemorySchema = createMemorySchema.partial();

// Query params for listing memories
export const memoryQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  visibility: z.enum(['public', 'friends', 'private']).optional(),
  tag: z.string().optional(),
  user_id: z.string().uuid().optional(),
  search: z.string().optional(),
  sort_by: z.enum(['created_at', 'updated_at', 'likes_count', 'comments_count']).default('created_at'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

// ============= Wrapped Response Schemas =============

export const memoryResponseSchema = apiResponseSchema(memorySchema);
export const memoriesResponseSchema = paginatedResponseSchema(memorySchema);

// ============= Type Exports =============

export type Memory = z.infer<typeof memorySchema>;
export type CreateMemoryInput = z.infer<typeof createMemorySchema>;
export type UpdateMemoryInput = z.infer<typeof updateMemorySchema>;
export type MemoryQuery = z.infer<typeof memoryQuerySchema>;

export type MemoryResponse = z.infer<typeof memoryResponseSchema>;
export type MemoriesResponse = z.infer<typeof memoriesResponseSchema>;