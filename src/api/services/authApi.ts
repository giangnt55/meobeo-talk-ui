import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';
import type { User, LoginCredentials, SignupData, AuthResponse } from '@/types/auth';

// API response interface (snake_case from backend)
interface LoginApiResponse {
  user_id: string;
  email: string;
  username: string;
  display_name: string;
  access_token: string;
  refresh_token: string;
  onboarding_completed: boolean;
  avatar?: string;
  bio?: string;
  interests?: string[];
  following?: string[];
  followers?: string[];
  created_at?: string;
}

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

    // Map snake_case API response to camelCase
    if (response.success && response.data) {
      const apiData = response.data;

      const authResponse: AuthResponse = {
        user: {
          id: apiData.user_id,
          email: apiData.email,
          username: apiData.username,
          displayName: apiData.display_name,
          avatar: apiData.avatar,
          bio: apiData.bio,
          interests: apiData.interests || [],
          following: apiData.following || [],
          followers: apiData.followers || [],
          createdAt: apiData.created_at || new Date().toISOString(),
        },
        accessToken: apiData.access_token,
        refreshToken: apiData.refresh_token,
      };

      // Return mapped response - localStorage handled by AuthContext
      return authResponse;
    }

    throw new Error(response.message || 'Login failed');
  },

  /**
   * Signup
   */
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post('auth/register', {
      json: data,
    }).json<ApiResponse<AuthResponse>>();

    if (response.success && response.data) {
      // Return response - localStorage handled by calling context
      return response.data;
    }

    throw new Error(response.message || 'Signup failed');
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
    const response = await api.get('auth/me').json<ApiResponse<User>>();

    if (response.success && response.data) {
      return response.data;
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
      const apiData = response.data;

      const authResponse: AuthResponse = {
        user: {
          id: apiData.user_id,
          email: apiData.email,
          username: apiData.username,
          displayName: apiData.display_name,
          avatar: apiData.avatar,
          bio: apiData.bio,
          interests: apiData.interests || [],
          following: apiData.following || [],
          followers: apiData.followers || [],
          createdAt: apiData.created_at || new Date().toISOString(),
        },
        accessToken: apiData.access_token,
        refreshToken: apiData.refresh_token,
      };

      // Return mapped response - localStorage handled by calling context
      return authResponse;
    }

    throw new Error(response.message || 'Failed to refresh token');
  },
};