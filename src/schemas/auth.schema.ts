import { z } from 'zod';
import { apiResponseSchema } from './api.schema';

// ============= Request Schemas =============

export const loginSchema = z.object({
  email_or_username: z.string().min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string(),
});

// ============= Response Schemas =============

export const authUserSchema = z.object({
  user_id: z.string().uuid(),
  email: z.string().email(),
  username: z.string(),
  display_name: z.string(),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
  onboarding_completed: z.boolean(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const authResponseSchema = z.object({
  user_id: z.string().uuid(),
  email: z.string().email(),
  username: z.string(),
  display_name: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
  onboarding_completed: z.boolean(),
  expires_in: z.number().int().positive(),
});

// ============= Wrapped Response Schemas =============

export const loginResponseSchema = apiResponseSchema(authResponseSchema);
export const signupResponseSchema = apiResponseSchema(authResponseSchema);
export const refreshResponseSchema = apiResponseSchema(authResponseSchema);
export const userProfileResponseSchema = apiResponseSchema(authUserSchema);

// ============= Type Exports =============

export type LoginRequest = z.infer<typeof loginSchema>;
export type SignupRequest = z.infer<typeof signupSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenSchema>;

export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;

export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type SignupResponse = z.infer<typeof signupResponseSchema>;
export type RefreshResponse = z.infer<typeof refreshResponseSchema>;
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;