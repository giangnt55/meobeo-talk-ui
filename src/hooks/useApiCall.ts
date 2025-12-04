import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

interface UseApiCallOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: AxiosError) => void;
  showRateLimitWarning?: boolean;
}

export const useApiCall = <T = any>(options?: UseApiCallOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<any>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      setData(response.data);
      options?.onSuccess?.(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      
      // Handle rate limit errors
      if (errorMessage.includes('Rate limit exceeded')) {
        setError(errorMessage);
        if (options?.showRateLimitWarning) {
          // Show toast/notification
          alert(errorMessage);
        }
      } else {
        setError(errorMessage);
      }
      
      options?.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [options]);

  return { loading, error, data, execute };
};