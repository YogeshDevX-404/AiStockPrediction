import { PortfolioRiskEngine, PortfolioRiskMetrics } from './portfolio/PortfolioRiskEngine';
import { DiversificationEngine, SectorExposureItem } from './portfolio/DiversificationEngine';
import { ScenarioAnalysisEngine, StressScenarioItem } from './portfolio/ScenarioAnalysisEngine';

export interface PerformanceReturnItem {
  period: string; // '1D' | '1W' | '1M' | '1Y' | 'ALL'
  portfolioReturn: number;
  benchmarkReturn: number;
}

export const getPortfolioRiskService = async (): Promise<PortfolioRiskMetrics> => {
  return PortfolioRiskEngine.calculateMetrics();
};

export const getPortfolioAnalyticsService = async () => {
  const metrics = PortfolioRiskEngine.calculateMetrics();
  const sectors = DiversificationEngine.getSectorBreakdown();
  const scenarios = ScenarioAnalysisEngine.getStressScenarios();
  return {
    healthScore: metrics.healthScore,
    rebalancingSuggestions: [
      'Reduce Semiconductor exposure by 8% to lock in +19.8% gains.',
      'Deploy 5% cash reserves into defensive Healthcare or High-Yield ETFs.',
    ],
    sectors,
    scenarios,
  };
};

export const getPortfolioDiversificationService = async (): Promise<SectorExposureItem[]> => {
  return DiversificationEngine.getSectorBreakdown();
};

export const getPortfolioPerformanceService = async (): Promise<PerformanceReturnItem[]> => {
  return [
    { period: '1D', portfolioReturn: 1.45, benchmarkReturn: 0.85 },
    { period: '1W', portfolioReturn: 3.20, benchmarkReturn: 1.10 },
    { period: '1M', portfolioReturn: 8.40, benchmarkReturn: 3.20 },
    { period: '1Y', portfolioReturn: 28.50, benchmarkReturn: 18.20 },
    { period: 'ALL', portfolioReturn: 42.80, benchmarkReturn: 24.50 },
  ];
};

export const getPortfoliosService = async (userId: string) => {
  return [
    {
      id: 'p1',
      name: 'Primary Portfolio',
      description: 'Long-term equity accumulation',
      isDefault: true,
      cashBalance: 10000.0,
      totalValue: 17084.0,
      totalGainLoss: 2824.0,
      gainLossPercent: 19.8,
    },
  ];
};

export const getPortfolioByIdService = async (portfolioId: string) => {
  return {
    id: portfolioId,
    name: 'Primary Portfolio',
    cashBalance: 10000.0,
    totalValue: 17084.0,
    holdings: [
      { id: 'h1', symbol: 'NVDA', name: 'NVIDIA Corp', quantity: 20, avgBuyPrice: 110.0, currentPrice: 135.5, currentMarketValue: 2710.0, totalGainLoss: 510.0, gainLossPercent: 23.18 },
      { id: 'h2', symbol: 'AAPL', name: 'Apple Inc', quantity: 15, avgBuyPrice: 205.0, currentPrice: 224.3, currentMarketValue: 3364.5, totalGainLoss: 289.5, gainLossPercent: 9.41 },
    ],
  };
};
