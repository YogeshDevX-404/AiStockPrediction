import { MarketProviderFactory } from '../providers/MarketProviderFactory';
import { CacheService } from './cache.service';
import {
  StockQuote,
  HistoricalDataPoint,
  SearchResultItem,
  MarketOverviewData,
  MarketStatusData,
} from '../providers/IMarketDataProvider';
import { logger } from '../utils/logger';

export const getStockQuoteService = async (symbol: string): Promise<StockQuote> => {
  const cacheKey = `market:quote:${symbol.toUpperCase()}`;
  const cached = CacheService.get<StockQuote>(cacheKey);
  if (cached) return cached;

  const provider = MarketProviderFactory.getProvider();
  const quote = await provider.getQuote(symbol);
  CacheService.set(cacheKey, quote, 10);
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
  CacheService.set(cacheKey, history, 300);
  return history;
};

export const searchSymbolsService = async (query: string): Promise<SearchResultItem[]> => {
  const cacheKey = `market:search:${query.toLowerCase()}`;
  const cached = CacheService.get<SearchResultItem[]>(cacheKey);
  if (cached) return cached;

  const provider = MarketProviderFactory.getProvider();
  const results = await provider.searchSymbols(query);
  CacheService.set(cacheKey, results, 3600);
  return results;
};

export const getMarketOverviewService = async (): Promise<MarketOverviewData> => {
  const cacheKey = 'market:overview';
  const cached = CacheService.get<MarketOverviewData>(cacheKey);
  if (cached) return cached;

  const provider = MarketProviderFactory.getProvider();
  const overview = await provider.getMarketOverview();
  CacheService.set(cacheKey, overview, 30);
  return overview;
};

export const getMarketStatusService = async (): Promise<MarketStatusData> => {
  const cacheKey = 'market:status';
  const cached = CacheService.get<MarketStatusData>(cacheKey);
  if (cached) return cached;

  const provider = MarketProviderFactory.getProvider();
  const status = await provider.getMarketStatus();
  CacheService.set(cacheKey, status, 60);
  return status;
};

export const getMarketMoversService = async (): Promise<{ gainers: any[]; losers: any[] }> => {
  try {
    const provider = MarketProviderFactory.getProvider();
    const symbols = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN', 'GOOGL', 'META', 'AMD'];
    const quotes = await Promise.all(
      symbols.map(async (s) => {
        try {
          return await provider.getQuote(s);
        } catch {
          return null;
        }
      })
    );

    const valid = quotes.filter((q): q is StockQuote => q !== null);
    const sorted = [...valid].sort((a, b) => b.changePercent - a.changePercent);

    return {
      gainers: sorted.filter((q) => q.changePercent >= 0).slice(0, 4),
      losers: sorted.filter((q) => q.changePercent < 0).slice(0, 4),
    };
  } catch {
    return { gainers: [], losers: [] };
  }
};

export const getMarketHeatmapService = async (): Promise<any[]> => {
  try {
    const provider = MarketProviderFactory.getProvider();
    const symbols = ['NVDA', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 'AMD'];
    const quotes = await Promise.all(
      symbols.map(async (s) => {
        try {
          return await provider.getQuote(s);
        } catch {
          return null;
        }
      })
    );

    return quotes
      .filter((q): q is StockQuote => q !== null)
      .map((q) => ({
        symbol: q.symbol,
        name: q.name,
        sector: q.sector || 'Equity',
        changePercent: q.changePercent,
        price: q.price,
      }));
  } catch {
    return [];
  }
};

export const getMarketInsightsService = async (): Promise<any[]> => {
  const cacheKey = 'market:insights';
  const cached = CacheService.get<any[]>(cacheKey);
  if (cached) return cached;

  try {
    const provider = MarketProviderFactory.getProvider();
    const coreSymbols = ['NVDA', 'AAPL', 'MSFT', 'TSLA', 'AMZN', 'GOOGL', 'META', 'AMD'];

    const quotes = await Promise.all(
      coreSymbols.map(async (sym) => {
        try {
          return await provider.getQuote(sym);
        } catch {
          return null;
        }
      })
    );

    const validQuotes = quotes.filter((q): q is StockQuote => q !== null);
    const insights: any[] = [];

    // 1. Identify Top Gainer / Bullish Momentum
    const gainers = [...validQuotes].sort((a, b) => b.changePercent - a.changePercent);
    if (gainers.length > 0) {
      const top = gainers[0];
      const isPos = top.changePercent >= 0;
      insights.push({
        title: `${top.symbol} ${isPos ? 'Bullish Surge' : 'Consolidation Phase'}`,
        summary: `${top.name} trades at $${top.price.toFixed(2)} (${isPos ? '+' : ''}${top.changePercent.toFixed(2)}%), leading active market volume momentum.`,
        badge: isPos ? 'BULLISH RADAR' : 'MARKET CONSOLIDATION',
        symbols: [top.symbol],
      });
    }

    // 2. Identify AI Leadership Asset
    const nvda = validQuotes.find((q) => q.symbol === 'NVDA');
    if (nvda) {
      insights.push({
        title: 'AI Hardware & Semiconductor Momentum',
        summary: `NVIDIA (${nvda.symbol}) holding key trend level at $${nvda.price.toFixed(2)} (${nvda.changePercent >= 0 ? '+' : ''}${nvda.changePercent.toFixed(2)}%), backed by strong institutional demand.`,
        badge: 'AI LEADERSHIP',
        symbols: ['NVDA', 'AMD'],
      });
    }

    // 3. Mega-Cap Tech Capital Flow
    const aapl = validQuotes.find((q) => q.symbol === 'AAPL');
    const msft = validQuotes.find((q) => q.symbol === 'MSFT');
    if (aapl || msft) {
      const main = aapl || msft!;
      insights.push({
        title: 'Mega-Cap Institutional Balance',
        summary: `Capital flow consolidation observed across core tech assets. ${main.symbol} holding level at $${main.price.toFixed(2)} (${main.changePercent >= 0 ? '+' : ''}${main.changePercent.toFixed(2)}%).`,
        badge: 'CAPITAL FLOW',
        symbols: ['AAPL', 'MSFT'],
      });
    }

    // 4. Volatility Radar
    const losers = [...validQuotes].sort((a, b) => a.changePercent - b.changePercent);
    if (losers.length > 0) {
      const item = losers[0];
      insights.push({
        title: 'Volatility & Pullback Radar',
        summary: `${item.symbol} showing volatility (${item.changePercent.toFixed(2)}% at $${item.price.toFixed(2)}). Monitor RSI support zones for entry triggers.`,
        badge: 'RISK RADAR',
        symbols: [item.symbol],
      });
    }

    CacheService.set(cacheKey, insights, 60);
    return insights;
  } catch (err: any) {
    logger.warn('[MarketService] Failed to generate market insights:', err.message);
    return [];
  }
};

export const getEconomicCalendarService = async (): Promise<any[]> => {
  return [];
};
