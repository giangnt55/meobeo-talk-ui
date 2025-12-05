import { AxiosError, type AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axiosInstance';
import type { ApiResponse, PaginationParams } from '../types/api';
import { ApiErrorHandler } from '../utils/apiErrorHandler';

export class ApiClient {
  /**
   * GET request
   */
  static async get<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.get<ApiResponse<T>>(url, {
        params,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error as AxiosError<ApiResponse>);
    }
  }

  /**
   * POST request
   */
  static async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error as AxiosError<ApiResponse>);
    }
  }

  /**
   * PUT request
   */
  static async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error as AxiosError<ApiResponse>);
    }
  }

  /**
   * PATCH request
   */
  static async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error as AxiosError<ApiResponse>);
    }
  }

  /**
   * DELETE request
   */
  static async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error as AxiosError<ApiResponse>);
    }
  }

  /**
   * Upload file with progress
   */
  static async upload<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      });

      return response.data;
    } catch (error) {
      throw ApiErrorHandler.handle(error as AxiosError<ApiResponse>);
    }
  }

  /**
   * GET request with pagination
   */
  static async getPaginated<T>(
    url: string,
    params?: PaginationParams & Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.get<T>(url, params, config);
  }

  /**
   * Download file
   */
  static async download(
    url: string,
    filename?: string
  ): Promise<void> {
    try {
      const response = await axiosInstance.get(url, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename || 'download';
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      throw ApiErrorHandler.handle(error as AxiosError<ApiResponse>);
    }
  }
}
