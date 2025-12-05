import ky, { type KyInstance, type Options } from 'ky';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create ky instance with default config
export const api: KyInstance = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30000,
  retry: {
    limit: 2,
    methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Add auth token
        const token = localStorage.getItem('accessToken');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    beforeRetry: [
      async ({ request, options, error, retryCount }) => {
        // Try to refresh token on 401
        if (error instanceof Error && 'response' in error) {
          const response = (error as any).response;
          if (response?.status === 401 && retryCount === 0) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
              request.headers.set('Authorization', `Bearer ${refreshed}`);
            }
          }
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // Handle rate limiting with retry-after
        if (response.status === 429) {
          const retryAfter = response.headers.get('retry-after');
          if (retryAfter) {
            const delay = parseInt(retryAfter) * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
        return response;
      },
    ],
  },
});

// Refresh token function
async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    const response = await ky.post(`${API_BASE_URL}/auth/refresh`, {
      json: { refreshToken },
    }).json<{ accessToken: string }>();

    localStorage.setItem('accessToken', response.accessToken);
    return response.accessToken;
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return null;
  }
}

// Type-safe wrapper functions
export async function apiGet<T>(url: string, options?: Options): Promise<T> {
  try {
    return await api.get(url, options).json<T>();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function apiPost<T>(url: string, data?: any, options?: Options): Promise<T> {
  try {
    return await api.post(url, { json: data, ...options }).json<T>();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function apiPut<T>(url: string, data?: any, options?: Options): Promise<T> {
  try {
    return await api.put(url, { json: data, ...options }).json<T>();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function apiPatch<T>(url: string, data?: any, options?: Options): Promise<T> {
  try {
    return await api.patch(url, { json: data, ...options }).json<T>();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function apiDelete<T>(url: string, options?: Options): Promise<T> {
  try {
    return await api.delete(url, options).json<T>();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

// Error handler
function handleApiError(error: unknown) {
  if (error instanceof Error) {
    const message = (error as any).response?.data?.message || error.message;
    toast.error(message);
  }
}