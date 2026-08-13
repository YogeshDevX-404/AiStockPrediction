import { apiClient } from '@/api';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  detailedBody?: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  sentimentScore: number;
  marketImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  relatedSymbols: string[];
  relatedSectors: string[];
  category: string;
  isBreaking?: boolean;
}

export const NewsApi = {
  getFeed: async (category?: string, symbol?: string): Promise<NewsArticle[]> => {
    const response: any = await apiClient.get('/news', { params: { category, symbol } });
    return response.data;
  },

  getCompanyNews: async (symbol: string): Promise<NewsArticle[]> => {
    const response: any = await apiClient.get(`/news/company/${symbol}`);
    return response.data;
  },

  search: async (query: string): Promise<NewsArticle[]> => {
    const response: any = await apiClient.get('/news/search', { params: { q: query } });
    return response.data;
  },

  getArticleById: async (id: string): Promise<NewsArticle> => {
    const response: any = await apiClient.get(`/news/${id}`);
    return response.data;
  },

  getBookmarks: async (): Promise<NewsArticle[]> => {
    const response: any = await apiClient.get('/news/bookmarks');
    return response.data;
  },

  addBookmark: async (articleId: string): Promise<boolean> => {
    const response: any = await apiClient.post('/news/bookmarks', { articleId });
    return response.data.bookmarked;
  },

  removeBookmark: async (articleId: string): Promise<boolean> => {
    const response: any = await apiClient.delete(`/news/bookmarks/${articleId}`);
    return response.data.removed;
  },
};
