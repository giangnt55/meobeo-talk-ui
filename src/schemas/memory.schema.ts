// import { z } from 'zod';

// // Memory schema with validation
// export const memorySchema = z.object({
//   id: z.string().uuid(),
//   title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
//   content: z.string().min(1, 'Content is required'),
//   date: z.string().datetime(),
//   mood: z.string().optional(),
//   tags: z.array(z.string()).max(10, 'Maximum 10 tags'),
//   images: z.array(z.string().url()).optional(),
//   visibility: z.enum(['public', 'friends', 'private']),
//   createdAt: z.string().datetime(),
//   updatedAt: z.string().datetime(),
//   userId: z.string().uuid(),
//   likes: z.number().int().nonnegative(),
//   comments: z.number().int().nonnegative(),
// });

// export const createMemorySchema = memorySchema.omit({
//   id: true,
//   createdAt: true,
//   updatedAt: true,
//   userId: true,
//   likes: true,
//   comments: true,
// });

// export const updateMemorySchema = createMemorySchema.partial();

// export type Memory = z.infer<typeof memorySchema>;
// export type CreateMemoryInput = z.infer<typeof createMemorySchema>;
// export type UpdateMemoryInput = z.infer<typeof updateMemorySchema>;

// // API Response schema
// export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
//   z.object({
//     success: z.boolean(),
//     data: dataSchema.optional(),
//     message: z.string().optional(),
//     error: z
//       .object({
//         code: z.string(),
//         message: z.string(),
//         details: z.record(z.any()).optional(),
//       })
//       .optional(),
//     meta: z
//       .object({
//         page: z.number(),
//         limit: z.number(),
//         total: z.number(),
//         totalPages: z.number(),
//       })
//       .optional(),
//   });
