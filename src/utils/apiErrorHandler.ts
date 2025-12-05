import { AxiosError } from 'axios';
import type { ApiResponse, ApiError } from '../types/api';

export class ApiErrorHandler {
  private static errorMessages: Record<string, string> = {
    // Network errors
    NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timeout. Please try again.',
    
    // Auth errors
    UNAUTHORIZED: 'You are not authorized. Please login again.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    TOKEN_EXPIRED: 'Your session has expired. Please login again.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    
    // Validation errors
    VALIDATION_ERROR: 'Please check your input and try again.',
    REQUIRED_FIELD: 'This field is required.',
    INVALID_FORMAT: 'Invalid format.',
    
    // Resource errors
    NOT_FOUND: 'The requested resource was not found.',
    ALREADY_EXISTS: 'This resource already exists.',
    
    // Server errors
    SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
    SERVICE_UNAVAILABLE: 'Service is temporarily unavailable. Please try again later.',
    
    // Rate limiting
    RATE_LIMIT_EXCEEDED: 'Too many requests. Please slow down.',
    
    // Business logic errors
    INSUFFICIENT_PERMISSIONS: 'You do not have sufficient permissions.',
    OPERATION_FAILED: 'Operation failed. Please try again.',
  };

  static handle(error: AxiosError<ApiResponse>): ApiError {
    // Network errors
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return {
          code: 'TIMEOUT_ERROR',
          message: this.errorMessages.TIMEOUT_ERROR,
        };
      }
      return {
        code: 'NETWORK_ERROR',
        message: this.errorMessages.NETWORK_ERROR,
      };
    }

    const { status, data } = error.response;

    // Server returned error in standard format
    if (data?.error) {
      return {
        code: data.error.code,
        message: data.error.message || this.getDefaultMessage(status),
        details: data.error.details,
        field: data.error.field,
      };
    }

    // Server returned message in data
    if (data?.message) {
      return {
        code: this.getErrorCode(status),
        message: data.message,
      };
    }

    // Default error messages based on status code
    return {
      code: this.getErrorCode(status),
      message: this.getDefaultMessage(status),
    };
  }

  private static getErrorCode(status: number): string {
    const statusMap: Record<number, string> = {
      400: 'VALIDATION_ERROR',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'ALREADY_EXISTS',
      429: 'RATE_LIMIT_EXCEEDED',
      500: 'SERVER_ERROR',
      503: 'SERVICE_UNAVAILABLE',
    };
    return statusMap[status] || 'UNKNOWN_ERROR';
  }

  private static getDefaultMessage(status: number): string {
    const code = this.getErrorCode(status);
    return this.errorMessages[code] || 'An unexpected error occurred.';
  }

  static getFieldError(error: ApiError, field: string): string | undefined {
    if (error.field === field) {
      return error.message;
    }
    if (error.details?.[field]) {
      return error.details[field];
    }
    return undefined;
  }

  static isNetworkError(error: ApiError): boolean {
    return error.code === 'NETWORK_ERROR' || error.code === 'TIMEOUT_ERROR';
  }

  static isAuthError(error: ApiError): boolean {
    return ['UNAUTHORIZED', 'FORBIDDEN', 'TOKEN_EXPIRED'].includes(error.code);
  }

  static isValidationError(error: ApiError): boolean {
    return error.code === 'VALIDATION_ERROR' || error.code === 'REQUIRED_FIELD';
  }
}