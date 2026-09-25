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

export class TwelveDataProvider implements IMarketDataProvider {
  readonly name = 'TwelveDataProvider';
  private fallbackProvider = new MockMarketProvider();

  private getApiKey(): string {
    const key = process.env.TWELVEDATA_API_KEY || '';
    if (!key || key === 'your_twelvedata_api_key_here' || key === 'demo') return '';
    return key;
  }

  async getQuote(symbol: string): Promise<StockQuote> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      logger.warn('[TwelveDataProvider] TWELVEDATA_API_KEY missing');
      return this.fallbackProvider.getQuote(symbol);
    }
    return this.fallbackProvider.getQuote(symbol);
  }

  async getHistoricalData(symbol: string, timeframe: string): Promise<HistoricalDataPoint[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      logger.warn('[TwelveDataProvider] TWELVEDATA_API_KEY missing - returning empty history');
      return [];
    }

    try {
      const upperSymbol = symbol.toUpperCase();
      const res = await fetch(`https://api.twelvedata.com/time_series?symbol=${upperSymbol}&interval=1day&outputsize=100&apikey=${apiKey}`);
      if (!res.ok) throw new Error(`TwelveData HTTP ${res.status}`);
      const data: any = await res.json();

      if (!data || !Array.isArray(data.values)) {
        if (data.message) {
          logger.warn('[TwelveDataProvider] API response message:', data.message);
        }
        return [];
      }

      const points: HistoricalDataPoint[] = data.values
        .slice()
        .reverse()
        .map((v: any) => ({
          timestamp: new Date(v.datetime).toISOString(),
          date: v.datetime.split(' ')[0],
          open: parseFloat(v.open),
          high: parseFloat(v.high),
          low: parseFloat(v.low),
          close: parseFloat(v.close),
          volume: parseInt(v.volume, 10) || 0,
        }));

      return points;
    } catch (err: any) {
      logger.error(`[TwelveDataProvider] Failed to fetch historical data for ${symbol}:`, err.message);
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
