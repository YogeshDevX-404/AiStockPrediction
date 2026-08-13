export interface RadarCategory {
  title: string;
  category: 'TOP_GAINERS' | 'BREAKOUTS' | 'OVERSOLD' | 'HIGH_VOLUME';
  tickers: Array<{
    symbol: string;
    price: number;
    changePercent: number;
    aiScore: number;
    signal: string;
  }>;
}

export class AIOpportunityEngine {
  public static getMarketRadars(): RadarCategory[] {
    return [
      {
        title: 'Top AI Growth Gainers',
        category: 'TOP_GAINERS',
        tickers: [
          { symbol: 'NVDA', price: 135.50, changePercent: 4.25, aiScore: 95.8, signal: 'STRONG_BUY' },
          { symbol: 'TSLA', price: 248.80, changePercent: 3.15, aiScore: 89.4, signal: 'BUY' },
          { symbol: 'TSM', price: 178.20, changePercent: 2.80, aiScore: 92.0, signal: 'BUY' },
        ],
      },
      {
        title: 'Technical Volume Breakouts',
        category: 'BREAKOUTS',
        tickers: [
          { symbol: 'AAPL', price: 224.30, changePercent: 0.95, aiScore: 87.2, signal: 'BUY' },
          { symbol: 'RELIANCE', price: 3020.50, changePercent: 0.95, aiScore: 86.0, signal: 'BUY' },
        ],
      },
      {
        title: 'Oversold RSI Reversals',
        category: 'OVERSOLD',
        tickers: [
          { symbol: 'AMD', price: 156.40, changePercent: -1.20, aiScore: 82.5, signal: 'NEUTRAL' },
        ],
      },
    ];
  }
}
