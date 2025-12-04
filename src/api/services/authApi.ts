import { axiosInstance } from '../axiosInstance';
import type { User, LoginCredentials, SignupData } from '../../types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  signup: async (data: SignupData): Promise<{ user: User; token: string }> => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  },

  socialLogin: async (provider: string, token: string): Promise<{ user: User; token: string }> => {
    const response = await axiosInstance.post(`/auth/${provider}`, { token });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.patch('/auth/profile', data);
    return response.data;
  },
};