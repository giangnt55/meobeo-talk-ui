export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  interests: string[];
  following: string[];
  followers: string[];
  createdAt: string;
  onboardingCompleted?: boolean;
}

export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

export interface SignupData {
  name: string;
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

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
}