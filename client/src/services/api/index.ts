import { apiClient } from '@/api';

export const AuthService = {
  register: async (userData: Record<string, unknown>) => {
    return apiClient.post('/auth/register', userData);
  },
  login: async (credentials: Record<string, unknown>) => {
    return apiClient.post('/auth/login', credentials);
  },
  logout: async () => {
    return apiClient.post('/auth/logout');
  },
  refreshToken: async () => {
    return apiClient.post('/auth/refresh-token');
  },
  forgotPassword: async (email: string) => {
    return apiClient.post('/auth/forgot-password', { email });
  },
  resetPassword: async (payload: Record<string, unknown>) => {
    return apiClient.post('/auth/reset-password', payload);
  },
  verifyEmail: async (token: string) => {
    return apiClient.post('/auth/verify-email', { token });
  },
  resendVerification: async (email: string) => {
    return apiClient.post('/auth/resend-verification', { email });
  },
  getGoogleAuthUrl: async () => {
    return apiClient.get('/auth/google');
  },
  exchangeGoogleCode: async (code: string) => {
    return apiClient.post('/auth/google/exchange', { code });
  },
  getProfile: async () => {
    return apiClient.get('/auth/profile');
  },
  updateProfile: async (data: Record<string, unknown>) => {
    return apiClient.put('/auth/profile', data);
  },
  changePassword: async (passwords: Record<string, unknown>) => {
    return apiClient.put('/auth/change-password', passwords);
  },
  deleteAccount: async () => {
    return apiClient.delete('/auth/delete-account');
  },
};

export const StockService = {
  getQuote: async (symbol: string) => {
    return apiClient.get(`/stocks/quote/${symbol}`);
  },
  getHistoricalData: async (symbol: string, timeframe: string) => {
    return apiClient.get(`/stocks/chart/${symbol}`, { params: { timeframe } });
  },
};

export const PortfolioService = {
  getSummary: async () => {
    return apiClient.get('/portfolio/summary');
  },
  getItems: async () => {
    return apiClient.get('/portfolio/items');
  },
};

export const PredictionService = {
  getPredictions: async () => {
    return apiClient.get('/predictions');
  },
};

export const NewsService = {
  getMarketNews: async () => {
    return apiClient.get('/news');
  },
};

export const ChatService = {
  sendMessage: async (message: string) => {
    return apiClient.post('/chat', { message });
  },
};
