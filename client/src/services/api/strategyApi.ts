import { apiClient } from '@/api';

export interface StrategyRuleItem {
  id: string;
  indicator: 'RSI' | 'EMA' | 'MACD' | 'VOLUME' | 'PATTERN' | 'SENTIMENT';
  operator: 'LESS_THAN' | 'GREATER_THAN' | 'CROSSES_ABOVE' | 'CROSSES_BELOW' | 'EQUALS';
  targetValue: string;
  ruleType: 'ENTRY' | 'EXIT' | 'RISK';
}

export interface StrategyDefinition {
  id: string;
  name: string;
  description: string;
  symbol: string;
  timeframe: string;
  rules: StrategyRuleItem[];
  winRate: number;
  netProfitPercent: number;
  sharpeRatio: number;
}

export interface BacktestTradeItem {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercent: number;
  reason: string;
}

export interface EquityCurvePoint {
  timestamp: string;
  equity: number;
  drawdownPercent: number;
}

export interface BacktestRunOutput {
  runId: string;
  strategyId: string;
  initialCapital: number;
  finalEquity: number;
  netProfit: number;
  netProfitPercent: number;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  sharpeRatio: number;
  sortinoRatio: number;
  totalTrades: number;
  winningTrades: number;
  trades: BacktestTradeItem[];
  equityCurve: EquityCurvePoint[];
}

export interface StrategyExecutiveReport {
  executiveSummary: string;
  strengths: string[];
  weaknesses: string[];
  overfittingRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendations: string[];
}

export const StrategyApi = {
  getStrategies: async (): Promise<StrategyDefinition[]> => {
    const response: any = await apiClient.get('/strategy');
    return response.data;
  },

  createStrategy: async (strategy: any): Promise<StrategyDefinition> => {
    const response: any = await apiClient.post('/strategy', strategy);
    return response.data;
  },

  runBacktest: async (strategyId: string, initialCapital: number): Promise<BacktestRunOutput> => {
    const response: any = await apiClient.post('/strategy/backtest', { strategyId, initialCapital });
    return response.data;
  },

  getReport: async (): Promise<StrategyExecutiveReport> => {
    const response: any = await apiClient.get('/strategy/report');
    return response.data;
  },
};
