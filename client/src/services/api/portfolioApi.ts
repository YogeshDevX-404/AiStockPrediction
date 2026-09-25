import { apiClient } from '@/api';

export interface PortfolioSummary {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  cashBalance: number;
  totalValue: number;
  totalInvestment: number;
  todayProfit: number;
  todayProfitPercent: number;
  overallProfit: number;
  overallProfitPercent: number;
  totalHoldings: number;
  riskScore?: number;
  diversificationScore?: number;
  totalGainLoss?: number;
  gainLossPercent?: number;
}

export interface HoldingItem {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  currentMarketValue?: number;
  totalValue: number;
  profit: number;
  profitPercent: number;
  changePercent: number;
  totalGainLoss?: number;
  gainLossPercent?: number;
  broker: string;
  notes: string;
  purchaseDate: string;
  signal: string;
}

export interface TransactionItem {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL' | 'DIVIDEND' | 'SPLIT' | 'BONUS';
  quantity: number;
  price: number;
  totalAmount: number;
  broker: string;
  timestamp: string;
}

export interface PortfolioAnalytics {
  healthScore: number;
  riskScore?: number;
  diversificationScore?: number;
  sectorConcentration?: number;
  sharpeRatio: number;
  beta: number;
  maxDrawdown: number;
  volatility: number;
  topHoldingsConcentration?: number;
  topPerformer?: { symbol: string; profitPercent: number };
  worstPerformer?: { symbol: string; profitPercent: number };
  rebalancingRecommendations?: Array<{ type: string; symbol: string; reason: string }>;
  rebalancingSuggestions: string[];
  sectors?: SectorExposureItem[];
  scenarios?: StressScenarioItem[];
}

export interface PortfolioRiskMetrics {
  healthScore: number;
  sharpeRatio: number;
  beta: number;
  maxDrawdown: number;
  volatility: number;
  sortinoRatio: number;
  treynorRatio: number;
  valueAtRisk95: number;
  expectedShortfall: number;
}

export interface SectorExposureItem {
  sector: string;
  percentage: number;
  value: number;
  color: string;
}

export interface StressScenarioItem {
  name: string;
  impactPercent: number;
  estimatedPnl: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface PortfolioAnalyticsOutput {
  healthScore: number;
  sharpeRatio: number;
  beta: number;
  maxDrawdown: number;
  volatility: number;
  rebalancingSuggestions: string[];
  sectors: SectorExposureItem[];
  scenarios: StressScenarioItem[];
}

export interface PerformanceReturnItem {
  period: string;
  portfolioReturn: number;
  benchmarkReturn: number;
}

export const PortfolioApi = {
  getSummary: async (): Promise<{ summary: PortfolioSummary; holdings: HoldingItem[] }> => {
    const response: any = await apiClient.get('/portfolio');
    const rawPortfolio = Array.isArray(response.data) ? response.data[0] : response.data?.summary || response.data;
    const summaryData: PortfolioSummary = rawPortfolio || {
      id: 'p_empty',
      name: 'Primary Portfolio',
      isDefault: true,
      cashBalance: 0.0,
      totalValue: 0.0,
      totalInvestment: 0.0,
      todayProfit: 0.0,
      todayProfitPercent: 0.0,
      overallProfit: 0.0,
      overallProfitPercent: 0.0,
      totalHoldings: 0,
      riskScore: 0,
      diversificationScore: 0,
    };
    const holdingsData: HoldingItem[] = rawPortfolio?.holdings || response.data?.holdings || [];
    return { summary: summaryData, holdings: holdingsData };
  },

  addHolding: async (holding: any): Promise<HoldingItem> => {
    const response: any = await apiClient.post('/portfolio/add', holding);
    return response.data;
  },

  deleteHolding: async (id: string): Promise<boolean> => {
    const response: any = await apiClient.delete(`/portfolio/${id}`);
    return response.data?.deleted || true;
  },

  getHistory: async (): Promise<TransactionItem[]> => {
    const response: any = await apiClient.get('/portfolio/history');
    return response.data || [];
  },

  getRiskMetrics: async (): Promise<PortfolioRiskMetrics> => {
    const response: any = await apiClient.get('/portfolio/risk');
    return response.data;
  },

  getAnalytics: async (): Promise<PortfolioAnalyticsOutput> => {
    const response: any = await apiClient.get('/portfolio/analytics');
    return response.data;
  },

  getDiversification: async (): Promise<SectorExposureItem[]> => {
    const response: any = await apiClient.get('/portfolio/diversification');
    return response.data;
  },

  getPerformance: async (): Promise<PerformanceReturnItem[]> => {
    const response: any = await apiClient.get('/portfolio/performance');
    return response.data;
  },
};
