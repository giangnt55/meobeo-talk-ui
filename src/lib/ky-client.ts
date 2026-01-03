import ky from 'ky';

// Base URL configuration
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

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
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
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
            const refreshResponse = await ky.post(`${BASE_URL}/auth/refresh`).json<any>();

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
          } catch (error) {
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
        const { response } = error;

        if (response) {
          try {
            const body = (await response.json()) as {
              message?: string;
              errors?: Record<string, string[]> | unknown;
            };

            error.message = body.message || error.message;

            if (body.errors) {
              (error as any).errors = body.errors;
            }
          } catch {
            // Response body is not JSON
          }
        }

        return error;
      },
    ],
  },
});

export const apiGet = async <T>(url: string, options: any = {}) => {
  return api.get(url, options).json<T>();
};

export const apiPost = async <T>(url: string, data?: any, options: any = {}) => {
  const isForm = data instanceof FormData;

  return api
    .post(url, {
      ...options,
      ...(isForm ? { body: data } : { json: data })
    })
    .json<T>();
};

export const apiPut = async <T>(url: string, data?: any, options: any = {}) => {
  const isForm = data instanceof FormData;

  return api
    .put(url, {
      ...options,
      ...(isForm ? { body: data } : { json: data })
    })
    .json<T>();
};

export const apiPatch = async <T>(url: string, data?: any, options: any = {}) => {
  const isForm = data instanceof FormData;

  return api
    .patch(url, {
      ...options,
      ...(isForm ? { body: data } : { json: data })
    })
    .json<T>();
};

export const apiDelete = async <T>(url: string, options: any = {}) => {
  return api.delete(url, options).json<T>();
};

export const apiUpload = async <T>(url: string, formData: FormData, options: any = {}) => {
  return api
    .post(url, {
      ...options,
      body: formData
    })
    .json<T>();
};
