import { HTTPError } from 'ky';

export interface FormErrors {
  [key: string]: string;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Extract error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof HTTPError) {
    return error.message || 'An unexpected error occurred';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};

/**
 * Extract form validation errors from API error
 */
export const getFormErrors = (error: unknown): FormErrors => {
  const formErrors: FormErrors = {};
  
  if (error && typeof error === 'object' && 'errors' in error) {
    const apiErrors = (error as any).errors as Record<string, string[]>;
    
    Object.keys(apiErrors).forEach((field) => {
      const messages = apiErrors[field];
      if (messages && messages.length > 0) {
        formErrors[field] = messages[0]; // Take first error message
      }
    });
  }
  
  return formErrors;
};

/**
 * Check if error has validation errors
 */
export const hasValidationErrors = (error: unknown): boolean => {
  return Boolean(error && typeof error === 'object' && 'errors' in error);
};


/**
 * Format error for toast notification
 */
export const formatErrorForToast = (error: unknown): string => {
  const message = getErrorMessage(error);
  
  // If has validation errors, show first one
  if (hasValidationErrors(error)) {
    const formErrors = getFormErrors(error);
    const firstError = Object.values(formErrors)[0];
    if (firstError) {
      return firstError;
    }
  }
  
  return message;
};