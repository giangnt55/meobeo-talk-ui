import { ApiClient } from '../apiClient';
import type { ApiResponse } from '../../types/api';
import type { User, LoginCredentials, SignupData } from '../../types/auth';

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  /**
   * Login
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await ApiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Store tokens
    if (response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response;
  },

  /**
   * Signup
   */
  signup: async (data: SignupData): Promise<ApiResponse<AuthResponse>> => {
    const response = await ApiClient.post<AuthResponse>('/auth/signup', data);
    
    if (response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response;
  },

  /**
   * Logout
   */
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await ApiClient.post<void>('/auth/logout');
    
    // Clear tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    return response;
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return ApiClient.get<User>('/auth/me');
  },

  /**
   * Update profile
   */
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    return ApiClient.patch<User>('/auth/profile', data);
  },

  /**
   * Change password
   */
  changePassword: async (
    oldPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> => {
    return ApiClient.post<void>('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    return ApiClient.post<void>('/auth/forgot-password', { email });
  },

  /**
   * Reset password
   */
  resetPassword: async (
    token: string,
    password: string
  ): Promise<ApiResponse<void>> => {
    return ApiClient.post<void>('/auth/reset-password', { token, password });
  },
};