import { z } from 'zod';

// ============= API Response Schema =============
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
  });

// ============= Pagination Schema =============
export const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.boolean(),
    data: z.array(itemSchema).optional(),
    message: z.string().optional(),
    meta: paginationMetaSchema.optional(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
  });

// ============= Error Schema =============
export const apiErrorSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

// ============= Types =============
export type ApiResponse<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof apiResponseSchema<T>>
>;

export type PaginatedResponse<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof paginatedResponseSchema<T>>
>;

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;

export type ApiError = z.infer<typeof apiErrorSchema>;