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

export class FinnhubProvider implements IMarketDataProvider {
  readonly name = 'FinnhubProvider';
  private fallbackProvider = new MockMarketProvider();
  private apiKey = process.env.FINNHUB_API_KEY || '';

  async getQuote(symbol: string): Promise<StockQuote> {
    if (!this.apiKey) {
      logger.warn('[FinnhubProvider] FINNHUB_API_KEY missing - falling back to MockMarketProvider');
      return this.fallbackProvider.getQuote(symbol);
    }
    // Implementation placeholder for real Finnhub HTTP call with fallback safety
    try {
      return await this.fallbackProvider.getQuote(symbol);
    } catch {
      return this.fallbackProvider.getQuote(symbol);
    }
  }

  async getHistoricalData(symbol: string, timeframe: string): Promise<HistoricalDataPoint[]> {
    return this.fallbackProvider.getHistoricalData(symbol, timeframe);
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
