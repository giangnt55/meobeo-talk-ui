export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  createdAt: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}