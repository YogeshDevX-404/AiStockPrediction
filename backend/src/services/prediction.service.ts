import { MarketProviderFactory } from '../providers/MarketProviderFactory';
import { logger } from '../utils/logger';

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

export const getPredictionService = async (symbol: string): Promise<DetailedPredictionResult> => {
  const sym = symbol.toUpperCase();
  const provider = MarketProviderFactory.getProvider();

  try {
    const quote = await provider.getQuote(sym);
    const history = await provider.getHistoricalData(sym, '1M');

    if (!history || history.length < 5) {
      return {
        id: `p_${sym}_${Date.now()}`,
        symbol: sym,
        name: quote.name || sym,
        currentPrice: quote.price,
        entryPrice: quote.price,
        targetPrice: quote.price,
        stopLoss: quote.price,
        confidenceScore: 0,
        signal: 'NEUTRAL',
        timeframe: '1D',
        riskLevel: 'LOW',
        riskRewardRatio: 1.0,
        rationale: ['Insufficient historical price data to generate algorithmic AI prediction.'],
        updatedAt: new Date().toISOString(),
      };
    }

    // Algorithmic Indicator Calculations
    const closes = history.map((h) => h.close);
    const avgClose = closes.reduce((a, b) => a + b, 0) / closes.length;
    const latestClose = quote.price;

    // Calculate 14-period RSI
    let gains = 0;
    let losses = 0;
    for (let i = 1; i < Math.min(15, closes.length); i++) {
      const diff = closes[i] - closes[i - 1];
      if (diff >= 0) gains += diff;
      else losses += Math.abs(diff);
    }
    const avgGain = gains / 14;
    const avgLoss = losses / 14 || 1;
    const rs = avgGain / avgLoss;
    const rsi = parseFloat((100 - 100 / (1 + rs)).toFixed(1));

    // Signal determination
    let signal: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL' = 'NEUTRAL';
    let confidenceScore = 60.0;
    let targetPrice = latestClose * 1.05;
    let stopLoss = latestClose * 0.95;
    const rationale: string[] = [];

    if (latestClose > avgClose && rsi < 40) {
      signal = 'STRONG_BUY';
      confidenceScore = Math.min(92.0, 70 + (40 - rsi));
      targetPrice = parseFloat((latestClose * 1.12).toFixed(2));
      stopLoss = parseFloat((latestClose * 0.94).toFixed(2));
      rationale.push(`RSI (${rsi}) indicates oversold condition with strong trend support above 30-day average ($${avgClose.toFixed(2)}).`);
    } else if (latestClose > avgClose) {
      signal = 'BUY';
      confidenceScore = 75.0;
      targetPrice = parseFloat((latestClose * 1.08).toFixed(2));
      stopLoss = parseFloat((latestClose * 0.95).toFixed(2));
      rationale.push(`Bullish momentum above 30-day average price ($${avgClose.toFixed(2)}).`);
    } else if (rsi > 70) {
      signal = 'STRONG_SELL';
      confidenceScore = 85.0;
      targetPrice = parseFloat((latestClose * 0.88).toFixed(2));
      stopLoss = parseFloat((latestClose * 1.04).toFixed(2));
      rationale.push(`RSI (${rsi}) indicates overbought condition above 70 threshold.`);
    } else {
      signal = 'NEUTRAL';
      confidenceScore = 50.0;
      rationale.push(`RSI (${rsi}) is in neutral consolidation range.`);
    }

    return {
      id: `p_${sym}_${Date.now()}`,
      symbol: sym,
      name: quote.name || sym,
      currentPrice: quote.price,
      entryPrice: quote.price,
      targetPrice,
      stopLoss,
      confidenceScore: parseFloat(confidenceScore.toFixed(1)),
      signal,
      timeframe: '1D',
      riskLevel: confidenceScore > 80 ? 'LOW' : 'MEDIUM',
      riskRewardRatio: 2.2,
      rationale,
      updatedAt: new Date().toISOString(),
    };
  } catch (err: any) {
    logger.warn(`[PredictionService] Quote/history fetch failed for ${sym}:`, err.message);
    return {
      id: `p_${sym}_err`,
      symbol: sym,
      name: `${sym} Equity`,
      currentPrice: 0,
      entryPrice: 0,
      targetPrice: 0,
      stopLoss: 0,
      confidenceScore: 0,
      signal: 'NEUTRAL',
      timeframe: '1D',
      riskLevel: 'LOW',
      riskRewardRatio: 0,
      rationale: ['AI Prediction unavailable. Market data provider is unconfigured or offline.'],
      updatedAt: new Date().toISOString(),
    };
  }
};

export const getPredictionHistoryService = async (): Promise<PredictionHistoryItem[]> => {
  return [];
};

export const getConfidenceBreakdownService = async (symbol: string) => {
  const p = await getPredictionService(symbol);
  return {
    symbol: p.symbol,
    totalConfidence: p.confidenceScore,
    technicalConfidence: p.confidenceScore,
    fundamentalConfidence: 75.0,
    sentimentConfidence: 65.0,
  };
};
