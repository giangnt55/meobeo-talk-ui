import ky, { Options } from 'ky';

// Base URL configuration - support both env variable names for compatibility
const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api';

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

type RefreshResponse = {
  success: boolean;
  data?: {
    accessToken: string;
  };
  message?: string;
};

// Logging utility for debugging
const logApiCall = (type: 'REQUEST' | 'RESPONSE' | 'ERROR', data: unknown) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const timestamp = new Date().toISOString();

  const extraData = typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : {};

  const logData = {
    timestamp,
    type,
    device: isMobile ? 'MOBILE' : 'DESKTOP',
    userAgent: navigator.userAgent,
    online: navigator.onLine,
    ...extraData
  };

  // Always log to console for debugging
  console.log(`[API ${type}]`, logData);

  // Store logs in sessionStorage for later inspection (max 50 entries)
  try {
    const logs = JSON.parse(sessionStorage.getItem('api_logs') || '[]');
    logs.push(logData);
    if (logs.length > 50) logs.shift(); // Keep only last 50 logs
    sessionStorage.setItem('api_logs', JSON.stringify(logs));
  } catch (e) {
    console.warn('Failed to store API log:', e);
  }
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

export const api = ky.create({
  prefixUrl: BASE_URL,
  timeout: 30000,
  credentials: 'include',
  retry: {
    limit: 2,
    methods: ['get', 'put', 'delete'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Add access token
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }

        // Log request details
        logApiCall('REQUEST', {
          url: request.url,
          method: request.method,
          hasAuth: !!accessToken,
          baseUrl: BASE_URL,
          headers: Object.fromEntries(request.headers.entries()),
        });
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        // Log response details
        logApiCall('RESPONSE', {
          url: request.url,
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries()),
        });

        // Handle 401 Unauthorized - try to refresh token
        if (response.status === 401 && !request.url.includes('/auth/refresh')) {
          // If already refreshing, wait for it
          if (isRefreshing) {
            return new Promise((resolve) => {
              addRefreshSubscriber((newToken: string) => {
                request.headers.set('Authorization', `Bearer ${newToken}`);
                resolve(ky(request));
              });
            });
          }

          isRefreshing = true;

          try {
            // Try to refresh token - cookie is sent automatically
            const refreshResponse = await ky.post(`${BASE_URL}/auth/refresh`).json<RefreshResponse>();

            if (refreshResponse.success && refreshResponse.data) {
              const { accessToken: newAccessToken } = refreshResponse.data;

              // Save new access token
              localStorage.setItem('accessToken', newAccessToken);

              // Notify all waiting requests
              onTokenRefreshed(newAccessToken);

              // Retry original request with new token
              request.headers.set('Authorization', `Bearer ${newAccessToken}`);
              return ky(request);
            }
          } catch {
            // Refresh failed, clear tokens and redirect
            localStorage.clear();
            window.location.href = '/login';
          } finally {
            isRefreshing = false;
          }
        }

        // Log errors in development

        // Log errors in development
        if (!response.ok && import.meta.env.DEV) {
          console.error('API Error:', {
            url: request.url,
            status: response.status,
            statusText: response.statusText,
          });
        }

        return response;
      },
    ],
    beforeError: [
      async (error) => {
        const { response, request } = error;

        // Log error details
        const errorLog: Record<string, unknown> = {
          url: request?.url || 'unknown',
          method: request?.method || 'unknown',
          errorName: error.name,
          errorMessage: error.message,
        };

        if (response) {
          errorLog.status = response.status;
          errorLog.statusText = response.statusText;

          try {
            const body = (await response.json()) as {
              message?: string;
              error?: { code?: string; message?: string };
              errors?: Record<string, string[]> | unknown;
            };

            errorLog.responseBody = body;
            
            // Parse nested error object if present
            const backendMessage = body.error?.message || body.message;
            if (backendMessage) {
              error.message = backendMessage;
            }

            const enhancedError = error as Error & { code?: string; errors?: unknown };

            if (body.error?.code) {
              enhancedError.code = body.error.code;
            }

            if (body.errors) {
              enhancedError.errors = body.errors;
            }
          } catch {
            // Response body is not JSON
            errorLog.parseError = 'Failed to parse response as JSON';
          }
        } else {
          // Network error (no response)
          errorLog.networkError = true;
          errorLog.possibleCauses = [
            'CORS policy blocking request',
            'Network timeout',
            'Server unreachable',
            'Mixed content (HTTP/HTTPS)',
            'DNS resolution failure'
          ];
        }

        logApiCall('ERROR', errorLog);

        return error;
      },
    ],
  },
});

export const apiGet = async <T>(url: string, options: Options = {}) => {
  return api.get(url, options).json<T>();
};

export const apiPost = async <T>(url: string, data?: unknown, options: Options = {}) => {
  const isForm = data instanceof FormData;

  return api
    .post(url, {
      ...options,
      ...(isForm ? { body: data } : { json: data })
    })
    .json<T>();
};

export const apiPut = async <T>(url: string, data?: unknown, options: Options = {}) => {
  const isForm = data instanceof FormData;

  return api
    .put(url, {
      ...options,
      ...(isForm ? { body: data } : { json: data })
    })
    .json<T>();
};

export const apiPatch = async <T>(url: string, data?: unknown, options: Options = {}) => {
  const isForm = data instanceof FormData;

  return api
    .patch(url, {
      ...options,
      ...(isForm ? { body: data } : { json: data })
    })
    .json<T>();
};

export const apiDelete = async <T>(url: string, options: Options = {}) => {
  return api.delete(url, options).json<T>();
};

export const apiUpload = async <T>(url: string, formData: FormData, options: Options = {}) => {
  return api
    .post(url, {
      ...options,
      body: formData
    })
    .json<T>();
};
