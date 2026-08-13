import { create } from 'zustand';

interface SentimentState {
  overallMarketSentiment: 'VERY_BULLISH' | 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'VERY_BEARISH';
  sentimentIndexScore: number; // 0 - 100
  bullishPercentage: number;
  bearishPercentage: number;
  neutralPercentage: number;
}

export const useSentimentStore = create<SentimentState>(() => ({
  overallMarketSentiment: 'BULLISH',
  sentimentIndexScore: 78.4,
  bullishPercentage: 68,
  bearishPercentage: 18,
  neutralPercentage: 14,
}));
