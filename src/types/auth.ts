export interface User {
  id: string;
  email: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  is_active: boolean;
  email_verified: boolean;
  post_count: number;
  follower_count: number;
  following_count: number;
  interests?: string[];
  following?: string[];
  followers?: string[];
  created_at: string;
  updated_at: string;
  last_seen_at?: string;
  onboardingCompleted?: boolean;
}

export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

export interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface OnboardingData {
  displayName: string;
  bio: string;
  avatar?: string;
  interests: string[];
  following: string[];
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  refreshProfile: () => Promise<User>;
  setAuth: (user: User, accessToken: string, refreshToken?: string) => void;
}