import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token & Safe Logging
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
    console.log(`[API Request] Method: ${config.method?.toUpperCase()} | URL: ${fullUrl}`);
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error.message);
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling & Safe Diagnostic Logging
apiClient.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type'] || 'unknown';
    const keys = response.data && typeof response.data === 'object' ? Object.keys(response.data) : typeof response.data;
    console.log(
      `[API Response] Status: ${response.status} | Content-Type: ${contentType} | Response JSON Keys:`,
      keys
    );
    return response.data;
  },
  async (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error(`[API Response Error] Status: ${status || 'NETWORK_ERROR'} | Message: ${message}`);

    if (status === 401) {
      console.warn('Unauthorized access - session expired');
      toast.error('Session expired. Please log in again.');
    } else if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (status === 500) {
      toast.error('Server error. Please try again later.');
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);
