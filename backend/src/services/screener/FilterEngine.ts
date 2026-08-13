export interface ScreenerFilterCriteria {
  minRsi?: number;
  maxRsi?: number;
  minPe?: number;
  maxPe?: number;
  minMarketCap?: number;
  goldenCrossOnly?: boolean;
  sector?: string;
  country?: string;
}

export interface StockCandidate {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  peRatio: number;
  rsi: number;
  sector: string;
  opportunityScore: number;
  recommendation: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL';
  confidenceScore: number;
  patternMatch?: string;
}

export class FilterEngine {
  public static filterUniverse(criteria: ScreenerFilterCriteria): StockCandidate[] {
    const mockUniverse: StockCandidate[] = [
      { symbol: 'NVDA', name: 'NVIDIA Corp', price: 135.50, changePercent: 4.25, volume: '48.2M', marketCap: '$3.34T', peRatio: 72.4, rsi: 64.2, sector: 'Technology', opportunityScore: 95.8, recommendation: 'STRONG_BUY', confidenceScore: 94.5, patternMatch: 'Bull Flag Breakout' },
      { symbol: 'TSM', name: 'Taiwan Semiconductor', price: 178.20, changePercent: 2.80, volume: '18.4M', marketCap: '$924B', peRatio: 28.5, rsi: 58.1, sector: 'Semiconductors', opportunityScore: 92.0, recommendation: 'BUY', confidenceScore: 91.0, patternMatch: 'Golden Cross' },
      { symbol: 'TSLA', name: 'Tesla Inc', price: 248.80, changePercent: 3.15, volume: '34.1M', marketCap: '$792B', peRatio: 64.8, rsi: 48.9, sector: 'Automotive', opportunityScore: 89.4, recommendation: 'BUY', confidenceScore: 88.0, patternMatch: 'Hammer Reversal' },
      { symbol: 'AAPL', name: 'Apple Inc', price: 224.30, changePercent: 0.95, volume: '29.5M', marketCap: '$3.42T', peRatio: 34.2, rsi: 52.4, sector: 'Technology', opportunityScore: 87.2, recommendation: 'BUY', confidenceScore: 89.2, patternMatch: 'Cup & Handle' },
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: 3020.50, changePercent: 0.95, volume: '8.4M', marketCap: '₹20.4T', peRatio: 26.8, rsi: 54.0, sector: 'Energy', opportunityScore: 86.0, recommendation: 'BUY', confidenceScore: 85.5, patternMatch: 'Ascending Triangle' },
      { symbol: 'AMD', name: 'Advanced Micro Devices', price: 156.40, changePercent: -1.20, volume: '22.1M', marketCap: '$252B', peRatio: 48.0, rsi: 41.2, sector: 'Semiconductors', opportunityScore: 82.5, recommendation: 'NEUTRAL', confidenceScore: 80.0, patternMatch: 'Double Bottom' },
    ];

    return mockUniverse.filter((item) => {
      if (criteria.minRsi && item.rsi < criteria.minRsi) return false;
      if (criteria.maxRsi && item.rsi > criteria.maxRsi) return false;
      if (criteria.maxPe && item.peRatio > criteria.maxPe) return false;
      if (criteria.sector && criteria.sector !== 'All' && item.sector !== criteria.sector) return false;
      return true;
    });
  }
}
