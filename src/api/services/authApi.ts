import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';
import type { User, LoginCredentials, SignupData, AuthResponse } from '@/types/auth';

export const authApi = {
  /**
   * Login
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('auth/login', {
      json: credentials,
    }).json<ApiResponse<AuthResponse>>();
    
    // Store tokens
    if (response.success && response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
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
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
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
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
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
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await api.post('auth/refresh', {
      json: { refreshToken },
    }).json<ApiResponse<AuthResponse>>();
    
    if (response.success && response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to refresh token');
  },
};