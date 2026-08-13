import { TechnicalAnalysisEngine } from './ai/TechnicalAnalysisEngine';
import { ConfidenceEngine } from './ai/ConfidenceEngine';
import { ExplainabilityEngine } from './ai/ExplainabilityEngine';

export interface DetailedPredictionResult {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  confidenceScore: number;
  signal: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL';
  timeframe: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskRewardRatio: number;
  rationale: string[];
  updatedAt: string;
}

export interface PredictionHistoryItem {
  id: string;
  predictionId: string;
  symbol: string;
  signal: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL';
  confidenceScore: number;
  actualOutcome: 'WIN' | 'LOSS' | 'PENDING';
  pnlPercent: number;
  timestamp: string;
}

const mockPredictionsDatabase: Record<string, DetailedPredictionResult> = {
  NVDA: {
    id: 'p1',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    currentPrice: 132.40,
    entryPrice: 130.50,
    targetPrice: 155.00,
    stopLoss: 124.00,
    confidenceScore: 94.8,
    signal: 'STRONG_BUY',
    timeframe: '1D',
    riskLevel: 'LOW',
    riskRewardRatio: 2.5,
    rationale: ExplainabilityEngine.generateRationale('NVDA', 'STRONG_BUY'),
    updatedAt: new Date().toISOString(),
  },
  AAPL: {
    id: 'p2',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 224.50,
    entryPrice: 222.00,
    targetPrice: 245.00,
    stopLoss: 215.00,
    confidenceScore: 88.5,
    signal: 'BUY',
    timeframe: '1D',
    riskLevel: 'LOW',
    riskRewardRatio: 3.2,
    rationale: ExplainabilityEngine.generateRationale('AAPL', 'BUY'),
    updatedAt: new Date().toISOString(),
  },
  TSLA: {
    id: 'p3',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    currentPrice: 248.60,
    entryPrice: 245.00,
    targetPrice: 280.00,
    stopLoss: 232.00,
    confidenceScore: 91.2,
    signal: 'STRONG_BUY',
    timeframe: '4H',
    riskLevel: 'MEDIUM',
    riskRewardRatio: 2.7,
    rationale: ExplainabilityEngine.generateRationale('TSLA', 'STRONG_BUY'),
    updatedAt: new Date().toISOString(),
  },
};

export const getPredictionService = async (symbol: string): Promise<DetailedPredictionResult> => {
  const sym = symbol.toUpperCase();
  if (mockPredictionsDatabase[sym]) {
    return { ...mockPredictionsDatabase[sym], updatedAt: new Date().toISOString() };
  }

  // Dynamic calculation for unlisted tickers
  const technicals = TechnicalAnalysisEngine.analyze(sym);
  const confidence = ConfidenceEngine.calculateConfidence(sym);

  return {
    id: `p_${Date.now()}`,
    symbol: sym,
    name: `${sym} Equity`,
    currentPrice: 150.00,
    entryPrice: 148.50,
    targetPrice: 175.00,
    stopLoss: 140.00,
    confidenceScore: confidence.totalConfidence,
    signal: technicals.signal,
    timeframe: '1D',
    riskLevel: 'LOW',
    riskRewardRatio: 2.8,
    rationale: ExplainabilityEngine.generateRationale(sym, technicals.signal),
    updatedAt: new Date().toISOString(),
  };
};

export const getPredictionHistoryService = async (): Promise<PredictionHistoryItem[]> => {
  return [
    { id: 'ph1', predictionId: 'p1', symbol: 'NVDA', signal: 'STRONG_BUY', confidenceScore: 94.8, actualOutcome: 'WIN', pnlPercent: 18.4, timestamp: '2026-03-20' },
    { id: 'ph2', predictionId: 'p2', symbol: 'AAPL', signal: 'BUY', confidenceScore: 88.5, actualOutcome: 'WIN', pnlPercent: 12.1, timestamp: '2026-03-15' },
    { id: 'ph3', predictionId: 'p3', symbol: 'TSLA', signal: 'BUY', confidenceScore: 91.2, actualOutcome: 'WIN', pnlPercent: 15.2, timestamp: '2026-04-01' },
    { id: 'ph4', predictionId: 'p4', symbol: 'INTC', signal: 'SELL', confidenceScore: 82.4, actualOutcome: 'WIN', pnlPercent: -8.5, timestamp: '2026-02-18' },
  ];
};

export const getConfidenceBreakdownService = async (symbol: string) => {
  return ConfidenceEngine.calculateConfidence(symbol);
};
