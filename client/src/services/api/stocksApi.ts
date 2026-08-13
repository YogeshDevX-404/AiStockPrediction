import { apiClient } from '@/api';
import { StockQuote } from '@/types';

export interface KeyStatistics {
  marketCap: string;
  peRatio: number;
  eps: number;
  dividendYield: number;
  beta: number;
  roe: number;
  roce: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  bookValue: number;
  faceValue: number;
  enterpriseValue: string;
}

export interface FinancialsResponse {
  incomeStatement: { period: string; revenue: number; netIncome: number; ebitda: number; margin: number }[];
  balanceSheet: { period: string; assets: number; liabilities: number; equity: number }[];
  cashFlow: { period: string; operatingCashFlow: number; freeCashFlow: number }[];
  quarterlyResults: { quarter: string; revenue: number; profit: number; eps: number; margin: number; growth: number }[];
}

export interface CompanyProfileResponse {
  about: string;
  ceo: string;
  founded: string;
  employees: string;
  website: string;
  headquarters: string;
  sector: string;
  industry: string;
  shareholding: {
    promoters: number;
    fii: number;
    dii: number;
    retail: number;
    others: number;
  };
  dividendHistory: { exDate: string; recordDate: string; dividend: number; yield: number }[];
}

export interface AnalystRatingsResponse {
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
  consensusRating: string;
  targetPrice: number;
}

export const StocksApi = {
  getDetails: async (symbol: string): Promise<StockQuote> => {
    const response: any = await apiClient.get(`/stocks/${symbol}`);
    return response.data;
  },

  getStatistics: async (symbol: string): Promise<KeyStatistics> => {
    const response: any = await apiClient.get(`/stocks/${symbol}/statistics`);
    return response.data;
  },

  getFinancials: async (symbol: string): Promise<FinancialsResponse> => {
    const response: any = await apiClient.get(`/stocks/${symbol}/financials`);
    return response.data;
  },

  getProfile: async (symbol: string): Promise<CompanyProfileResponse> => {
    const response: any = await apiClient.get(`/stocks/${symbol}/profile`);
    return response.data;
  },

  getNews: async (symbol: string): Promise<any[]> => {
    const response: any = await apiClient.get(`/stocks/${symbol}/news`);
    return response.data;
  },

  getAnalystRatings: async (symbol: string): Promise<AnalystRatingsResponse> => {
    const response: any = await apiClient.get(`/stocks/${symbol}/analyst-ratings`);
    return response.data;
  },
};
