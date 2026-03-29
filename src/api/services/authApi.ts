import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';
import type { User, LoginCredentials, SignupData, AuthResponse } from '@/types/auth';

interface LoginApiResponse {
  user_id: string;
  email: string;
  username: string;
  display_name: string;
  access_token: string;
  refresh_token: string;
  onboarding_completed: boolean;
  avatar_url?: string;
  bio?: string;
  interests?: string[];
  following?: string[];
  followers?: string[];
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
  email_verified?: boolean;
  post_count?: number;
  follower_count?: number;
  following_count?: number;
}

function mapLoginApiResponse(apiData: LoginApiResponse): AuthResponse {
  const now = new Date().toISOString();
  const user: User = {
    id: apiData.user_id,
    email: apiData.email,
    username: apiData.username,
    display_name: apiData.display_name,
    avatar_url: apiData.avatar_url,
    bio: apiData.bio,
    interests: apiData.interests ?? [],
    following: apiData.following ?? [],
    followers: apiData.followers ?? [],
    created_at: apiData.created_at ?? now,
    updated_at: apiData.updated_at ?? now,
    is_active: apiData.is_active ?? true,
    email_verified: apiData.email_verified ?? false,
    post_count: apiData.post_count ?? 0,
    follower_count: apiData.follower_count ?? (apiData.followers?.length ?? 0),
    following_count: apiData.following_count ?? (apiData.following?.length ?? 0),
    onboardingCompleted: apiData.onboarding_completed,
  };

  return {
    user,
    accessToken: apiData.access_token,
    refreshToken: apiData.refresh_token,
  };
}

// ─── authApi ──────────────────────────────────────────────────────────────────

export const authApi = {
  /**
   * Login
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('auth/login', {
      json: {
        email_or_username: credentials.emailOrUsername,
        password: credentials.password,
      },
    }).json<ApiResponse<LoginApiResponse>>();

    if (response.success && response.data) {
      return mapLoginApiResponse(response.data);
    }

    const errorMsg = response.error?.message || response.message || 'Login failed';
    const err = new Error(errorMsg) as Error & { code?: string };
    if (response.error?.code) {
      err.code = response.error.code;
    }
    throw err;
  },

  /**
   * Signup
   */
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post('auth/register', {
      json: data,
    }).json<ApiResponse<LoginApiResponse>>();

    if (response.success && response.data) {
      return mapLoginApiResponse(response.data);
    }

    throw new Error(response.message || 'Signup failed');
  },

  /**
   * Verify Email with OTP
   */
  verifyEmail: async (email: string, code: string): Promise<AuthResponse> => {
    const response = await api.post('auth/verify-email', {
      json: {
        email: email,
        otp_code: code,
      },
    }).json<ApiResponse<LoginApiResponse>>();

    if (response.success && response.data) {
      return mapLoginApiResponse(response.data);
    }

    throw new Error(response.message || 'Verify email failed');
  },

  /**
   * Resend Verification Code
   */
  resendVerificationCode: async (email: string): Promise<void> => {
    const response = await api.post('auth/resend-otp', {
      json: { email },
    }).json<ApiResponse<void>>();

    if (!response.success) {
      throw new Error(response.message || 'Failed to resend verification code');
    }
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('auth/logout').json();
    } finally {
      // Always clear tokens even if API call fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      // Refresh token is cleared via backend (HttpOnly cookie)
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('users/me').json<ApiResponse<Record<string, unknown>>>();

    if (response.success && response.data) {
      const raw = response.data;
      return {
        ...raw,
        display_name: (raw.display_name as string | undefined) || (raw.full_name as string | undefined),
      } as unknown as User;
    }

    throw new Error(response.message || 'Failed to get user');
  },

  /**
   * Update profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch('auth/profile', {
      json: data,
    }).json<ApiResponse<User>>();

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to update profile');
  },

  /**
   * Change password
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    const response = await api.post('auth/change-password', {
      json: { oldPassword, newPassword },
    }).json<ApiResponse<void>>();

    if (!response.success) {
      throw new Error(response.message || 'Failed to change password');
    }
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string): Promise<void> => {
    const response = await api.post('auth/forgot-password', {
      json: { email },
    }).json<ApiResponse<void>>();

    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset email');
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (token: string, password: string): Promise<void> => {
    const response = await api.post('auth/reset-password', {
      json: { token, password },
    }).json<ApiResponse<void>>();

    if (!response.success) {
      throw new Error(response.message || 'Failed to reset password');
    }
  },

  /**
   * Refresh token
   */
  refreshToken: async (): Promise<AuthResponse> => {
    // Refresh token is automatically sent via HttpOnly cookie
    const response = await api.post('auth/refresh').json<ApiResponse<LoginApiResponse>>();

    if (response.success && response.data) {
      return mapLoginApiResponse(response.data);
    }

    throw new Error(response.message || 'Failed to refresh token');
  },

  /**
   * Google OAuth Code Exchange
   */
  googleExchange: async (code: string, state: string, redirectUri?: string): Promise<AuthResponse> => {
    const payload: Record<string, string> = { code, state };
    if (redirectUri) {
      payload.redirect_uri = redirectUri;
    }
    const response = await api.post('auth/google/exchange', {
      json: payload,
    }).json<ApiResponse<LoginApiResponse>>();

    if (response.success && response.data) {
      return mapLoginApiResponse(response.data);
    }

    throw new Error(response.message || 'Google exchange failed');
  },
};
