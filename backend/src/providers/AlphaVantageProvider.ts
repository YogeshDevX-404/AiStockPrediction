import {
  IMarketDataProvider,
  StockQuote,
  HistoricalDataPoint,
  SearchResultItem,
  MarketOverviewData,
  MarketStatusData,
} from './IMarketDataProvider';
import { MockMarketProvider } from './MockMarketProvider';
import { logger } from '../utils/logger';

export class AlphaVantageProvider implements IMarketDataProvider {
  readonly name = 'AlphaVantageProvider';
  private fallbackProvider = new MockMarketProvider();

  private getApiKey(): string {
    const key = process.env.ALPHA_VANTAGE_API_KEY || process.env.ALPHAVANTAGE_API_KEY || '';
    if (!key || key === 'your_alphavantage_api_key_here' || key === 'demo') return '';
    return key;
  }

  async getQuote(symbol: string): Promise<StockQuote> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      logger.warn('[AlphaVantageProvider] ALPHA_VANTAGE_API_KEY missing');
      return this.fallbackProvider.getQuote(symbol);
    }
    return this.fallbackProvider.getQuote(symbol);
  }

  async getHistoricalData(symbol: string, timeframe: string): Promise<HistoricalDataPoint[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      logger.warn('[AlphaVantageProvider] ALPHA_VANTAGE_API_KEY missing - returning empty history');
      return [];
    }

    try {
      const upperSymbol = symbol.toUpperCase();
      const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${upperSymbol}&apikey=${apiKey}`);
      if (!res.ok) throw new Error(`AlphaVantage HTTP ${res.status}`);
      const data: any = await res.json();
      const timeSeries = data['Time Series (Daily)'];

      if (!timeSeries) {
        if (data['Note'] || data['Information']) {
          logger.warn('[AlphaVantageProvider] API Limit/Note:', data['Note'] || data['Information']);
        }
        return [];
      }

      const points: HistoricalDataPoint[] = Object.keys(timeSeries)
        .sort()
        .map((dateStr) => {
          const item = timeSeries[dateStr];
          return {
            timestamp: new Date(dateStr).toISOString(),
            date: dateStr,
            open: parseFloat(item['1. open']),
            high: parseFloat(item['2. high']),
            low: parseFloat(item['3. low']),
            close: parseFloat(item['4. close']),
            volume: parseInt(item['5. volume'], 10) || 0,
          };
        });

      return points;
    } catch (err: any) {
      logger.error(`[AlphaVantageProvider] Failed to fetch historical data for ${symbol}:`, err.message);
      return [];
    }
  }

  async searchSymbols(query: string): Promise<SearchResultItem[]> {
    return this.fallbackProvider.searchSymbols(query);
  }

  async getMarketOverview(): Promise<MarketOverviewData> {
    return this.fallbackProvider.getMarketOverview();
  }

  async getMarketStatus(): Promise<MarketStatusData> {
    return this.fallbackProvider.getMarketStatus();
  }
}
