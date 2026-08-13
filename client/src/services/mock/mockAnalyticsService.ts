export interface RiskMetrics {
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore: number; // 0 - 10
  sharpeRatio: number;
  maxDrawdown: number;
  diversificationScore: number; // 0 - 100
  sectorAllocations: { sector: string; percentage: number; color: string }[];
}

export interface AIPerformanceMetrics {
  dailyAccuracy: number;
  weeklyAccuracy: number;
  monthlyAccuracy: number;
  totalSignalsGenerated: number;
  winningSignals: number;
  losingSignals: number;
}

export interface TradingStats {
  winRate: number;
  totalTrades: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
  monthlyProfitLossHistory: { month: string; profit: number; loss: number }[];
}

export const mockRiskMetrics: RiskMetrics = {
  overallRisk: 'LOW',
  riskScore: 2.1,
  sharpeRatio: 2.84,
  maxDrawdown: 4.2,
  diversificationScore: 88,
  sectorAllocations: [
    { sector: 'Technology', percentage: 42, color: '#10b981' },
    { sector: 'Semiconductors', percentage: 28, color: '#3b82f6' },
    { sector: 'E-Commerce & Cloud', percentage: 18, color: '#8b5cf6' },
    { sector: 'Cash Reserve', percentage: 12, color: '#f59e0b' },
  ],
};

export const mockAIPerformance: AIPerformanceMetrics = {
  dailyAccuracy: 96.2,
  weeklyAccuracy: 94.8,
  monthlyAccuracy: 93.5,
  totalSignalsGenerated: 1420,
  winningSignals: 1324,
  losingSignals: 96,
};

export const mockTradingStats: TradingStats = {
  winRate: 78.4,
  totalTrades: 342,
  profitFactor: 3.12,
  averageWin: 840.50,
  averageLoss: 260.00,
  monthlyProfitLossHistory: [
    { month: 'Feb', profit: 4200, loss: 800 },
    { month: 'Mar', profit: 5800, loss: 1200 },
    { month: 'Apr', profit: 6400, loss: 900 },
    { month: 'May', profit: 7200, loss: 1100 },
    { month: 'Jun', profit: 8900, loss: 1400 },
    { month: 'Jul', profit: 9400, loss: 1200 },
  ],
};
