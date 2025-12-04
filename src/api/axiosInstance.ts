import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { rateLimiter } from '../utils/rateLimiter';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request queue for managing concurrent requests
const requestQueue: Map<string, Promise<any>> = new Map();
const MAX_CONCURRENT_REQUESTS = 5;
let activeRequests = 0;

// Request Deduplication
const getRequestKey = (config: InternalAxiosRequestConfig): string => {
  return `${config.method}-${config.url}-${JSON.stringify(config.params)}`;
};

// Request Interceptor with Rate Limiting
axiosInstance.interceptors.request.use(
  async (config) => {
    // Rate limiting check
    const endpoint = config.url || 'default';
    if (!rateLimiter.canMakeRequest(endpoint)) {
      const waitTime = rateLimiter.getRemainingTime(endpoint);
      throw new axios.Cancel(
        `Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`
      );
    }

    // Request deduplication - prevent duplicate requests
    const requestKey = getRequestKey(config);
    if (requestQueue.has(requestKey)) {
      return requestQueue.get(requestKey);
    }

    // Limit concurrent requests
    while (activeRequests >= MAX_CONCURRENT_REQUESTS) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    activeRequests++;

    // Attach token
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    activeRequests--;
    return Promise.reject(error);
  }
);

// Response Interceptor
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    activeRequests--;
    const requestKey = getRequestKey(response.config);
    requestQueue.delete(requestKey);
    return response;
  },
  async (error: AxiosError) => {
    activeRequests--;
    
    // Handle rate limit errors from backend
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
      
      console.warn(`Rate limited by server. Waiting ${waitTime}ms`);
      
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return axiosInstance.request(error.config!);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 - Token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = refreshResponse.data?.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        processQueue(null, newAccessToken);
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);

      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);