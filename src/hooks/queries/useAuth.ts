import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/services/authApi';
import { useAuth } from '@/hooks/useAuth';
import type { LoginCredentials, SignupData, AuthResponse } from '@/types/auth';

export const useLogin = () => {
  const { login: setAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      queryClient.setQueryData(['user'], data.user);
    },
  });
};

export const useSignup = () => {
  const { login: setAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupData) => authApi.signup(data),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      queryClient.setQueryData(['user'], data.user);
    },
  });
};

export const useLogout = () => {
  const { logout: clearAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });
};

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['user'],
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const { updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      updateUser(data);
      queryClient.setQueryData(['user'], data);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
      authApi.changePassword(oldPassword, newPassword),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.resetPassword(token, password),
  });
};

export const useRefreshToken = () => {
  const { login: setAuth } = useAuth();

  return useMutation({
    mutationFn: authApi.refreshToken,
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
    },
  });
};