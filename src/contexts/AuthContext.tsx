import { createContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType } from '@/types/auth';
import { authApi } from '@/api/services/authApi';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // INIT AUTH
  useEffect(() => {
    try {
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');

      // Refresh token is in HttpOnly cookie, so we only check access token and user
      if (storedAccessToken && storedUser) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedAccessToken);
      }
    } catch (err) {
      console.error('Failed to initialize auth:', err);
      localStorage.clear();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    const res = await authApi.login({ emailOrUsername, password });

    // Set state
    setUser(res.user);
    setAccessToken(res.accessToken);

    // Store to localStorage (only user and access token)
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('accessToken', res.accessToken);
    // DO NOT store refresh token - it's in HttpOnly cookie

    return res;
  };

  const setAuth = (user: User, accessToken: string) => {
    setUser(user);
    setAccessToken(accessToken);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
  };


  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      // Refresh token is cleared by backend (HttpOnly cookie)
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken: null, // Refresh token is handled by cookie
    isAuthenticated: !!user && !!accessToken,
    isLoading,
    login,
    logout,
    updateUser,
    setAuth: (user, token) => setAuth(user, token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
