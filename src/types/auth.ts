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
}

export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

export interface SignupData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface OnboardingData {
  displayName: string;
  bio: string;
  avatar?: string;
  interests: string[];
  following: string[];
}
