import { MarketProviderFactory } from '../providers/MarketProviderFactory';
import { CacheService } from './cache.service';
import {
  StockQuote,
  HistoricalDataPoint,
  SearchResultItem,
  MarketOverviewData,
  MarketStatusData,
} from '../providers/IMarketDataProvider';

export const getStockQuoteService = async (symbol: string): Promise<StockQuote> => {
  const cacheKey = `market:quote:${symbol.toUpperCase()}`;
  const cached = CacheService.get<StockQuote>(cacheKey);
  if (cached) return cached;

  const provider = MarketProviderFactory.getProvider();
  const quote = await provider.getQuote(symbol);
  CacheService.set(cacheKey, quote, 10); // 10 seconds TTL
  return quote;
};

export const getHistoricalDataService = async (
  symbol: string,
  timeframe: string
): Promise<HistoricalDataPoint[]> => {
  const cacheKey = `market:history:${symbol.toUpperCase()}:${timeframe.toUpperCase()}`;
  const cached = CacheService.get<HistoricalDataPoint[]>(cacheKey);
  if (cached) return cached;

  const provider = MarketProviderFactory.getProvider();
  const history = await provider.getHistoricalData(symbol, timeframe);
  CacheService.set(cacheKey, history, 300); // 5 minutes TTL
  return history;
};

export const searchSymbolsService = async (query: string): Promise<SearchResultItem[]> => {
  const cacheKey = `market:search:${query.toLowerCase()}`;
  const cached = CacheService.get<SearchResultItem[]>(cacheKey);
  if (cached) return cached;

  const provider = MarketProviderFactory.getProvider();
  const results = await provider.searchSymbols(query);
  CacheService.set(cacheKey, results, 3600); // 1 hour TTL
  return results;
};

export const getMarketOverviewService = async (): Promise<MarketOverviewData> => {
  const cacheKey = 'market:overview';
  const cached = CacheService.get<MarketOverviewData>(cacheKey);
  if (cached) return cached;

  const provider = MarketProviderFactory.getProvider();
  const overview = await provider.getMarketOverview();
  CacheService.set(cacheKey, overview, 30); // 30 seconds TTL
  return overview;
};

export const getMarketStatusService = async (): Promise<MarketStatusData> => {
  const cacheKey = 'market:status';
  const cached = CacheService.get<MarketStatusData>(cacheKey);
  if (cached) return cached;

  const provider = MarketProviderFactory.getProvider();
  const status = await provider.getMarketStatus();
  CacheService.set(cacheKey, status, 60); // 1 minute TTL
  return status;
};
