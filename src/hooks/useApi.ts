import { useState, useCallback } from 'react';
import type { ApiError } from '../types/api';
import { useToastContext } from '../contexts/ToastContext';

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
}

export function useApi<T extends (...args: any[]) => Promise<any>>(
  apiFunction: T,
  options: UseApiOptions = {}
) {
  const [data, setData] = useState<Awaited<ReturnType<T>>['data'] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { success, error: showError } = useToastContext();

  const execute = useCallback(
    async (...args: Parameters<T>) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiFunction(...args);
        setData(response.data);

        if (options.showSuccessToast) {
          success(
            'Success',
            options.successMessage || response.message || 'Operation completed'
          );
        }

        return response;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);

        if (options.showErrorToast !== false) {
          showError('Error', apiError.message);
        }

        throw apiError;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, options, success, showError]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    error,
    isLoading,
    execute,
    reset,
  };
}