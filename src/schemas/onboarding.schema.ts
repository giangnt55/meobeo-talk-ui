import { z } from 'zod';
import { apiResponseSchema } from './api.schema';

// ============= Interest Schemas =============

export const interestSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  image_url: z.string().url().optional().nullable(),
});

export const interestsResponseSchema = apiResponseSchema(z.array(interestSchema));
export const categoriesResponseSchema = apiResponseSchema(z.array(z.string()));

// ============= Onboarding Schemas =============

export const onboardingStatusSchema = z.object({
  user_id: z.string().uuid(),
  current_step: z.number().int().min(1).max(3),
  completed_steps: z.array(z.number().int().min(1).max(3)),
  is_completed: z.boolean(),
  completed_at: z.string().datetime().optional().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const onboardingStatusResponseSchema = apiResponseSchema(onboardingStatusSchema);

export const updateOnboardingStepSchema = z.object({
  current_step: z.number().int().min(1).max(3),
  completed_steps: z.array(z.number().int().min(1).max(3)),
});

export const addUserInterestsSchema = z.object({
  interest_ids: z.array(z.string().uuid()).min(5, 'Please select at least 5 interests').max(10, 'Maximum 10 interests'),
});

// ============= Follow Schemas =============

export const suggestedUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  display_name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  follower_count: z.number().int().nonnegative(),
  following_count: z.number().int().nonnegative(),
  is_following: z.boolean(),
});

export const suggestedUsersResponseSchema = apiResponseSchema(z.array(suggestedUserSchema));

export const followResponseSchema = apiResponseSchema(z.object({
  follower_id: z.string().uuid(),
  followee_id: z.string().uuid(),
  created_at: z.string().datetime().optional(),
}));

// ============= Profile Schemas =============

export const profileSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  display_name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const profileResponseSchema = apiResponseSchema(profileSchema);

export const updateProfileSchema = z.object({
  display_name: z.string().min(2, 'Display name must be at least 2 characters').max(150).optional(),
  bio: z.string().max(500, 'Bio must be at most 500 characters').optional(),
});

// ============= Type Exports =============

export type Interest = z.infer<typeof interestSchema>;
export type InterestsResponse = z.infer<typeof interestsResponseSchema>;
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;

export type OnboardingStatus = z.infer<typeof onboardingStatusSchema>;
export type OnboardingStatusResponse = z.infer<typeof onboardingStatusResponseSchema>;
export type UpdateOnboardingStep = z.infer<typeof updateOnboardingStepSchema>;
export type AddUserInterests = z.infer<typeof addUserInterestsSchema>;

export type SuggestedUser = z.infer<typeof suggestedUserSchema>;
export type SuggestedUsersResponse = z.infer<typeof suggestedUsersResponseSchema>;
export type FollowResponse = z.infer<typeof followResponseSchema>;

export type Profile = z.infer<typeof profileSchema>;
export type ProfileResponse = z.infer<typeof profileResponseSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
