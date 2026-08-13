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
    const summaryData: PortfolioSummary = response.data?.[0] || {
      id: 'p1',
      name: 'Primary Portfolio',
      isDefault: true,
      cashBalance: 10000.0,
      totalValue: 17084.0,
      totalInvestment: 14260.0,
      todayProfit: 245.5,
      todayProfitPercent: 1.45,
      overallProfit: 2824.0,
      overallProfitPercent: 19.8,
      totalHoldings: 2,
      riskScore: 2.1,
      diversificationScore: 88,
    };
    const holdingsData: HoldingItem[] = [
      { id: 'h1', symbol: 'NVDA', name: 'NVIDIA Corp', exchange: 'NASDAQ', quantity: 20, avgBuyPrice: 110.0, currentPrice: 135.5, totalValue: 2710.0, profit: 510.0, profitPercent: 23.18, changePercent: 4.25, broker: 'Manual', notes: '', purchaseDate: '2026-01-15', signal: 'STRONG_BUY' },
      { id: 'h2', symbol: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ', quantity: 15, avgBuyPrice: 205.0, currentPrice: 224.3, totalValue: 3364.5, profit: 289.5, profitPercent: 9.41, changePercent: 0.95, broker: 'Manual', notes: '', purchaseDate: '2026-02-01', signal: 'BUY' },
    ];
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
    return response.data || [
      { id: 'tx1', symbol: 'NVDA', type: 'BUY', quantity: 20, price: 110.0, totalAmount: 2200.0, broker: 'Manual', timestamp: '2026-01-15T10:00:00Z' },
    ];
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
