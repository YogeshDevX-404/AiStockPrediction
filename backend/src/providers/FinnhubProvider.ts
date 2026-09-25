import {
  IMarketDataProvider,
  StockQuote,
  HistoricalDataPoint,
  SearchResultItem,
  MarketOverviewData,
  MarketStatusData,
} from './IMarketDataProvider';
import { AlphaVantageProvider } from './AlphaVantageProvider';
import { TwelveDataProvider } from './TwelveDataProvider';
import { logger } from '../utils/logger';

export class FinnhubProvider implements IMarketDataProvider {
  readonly name = 'FinnhubProvider';
  private apiKey = process.env.FINNHUB_API_KEY || process.env.MARKET_DATA_API_KEY || '';
  private profileCache = new Map<string, any>();

  async getQuote(symbol: string): Promise<StockQuote> {
    if (!this.apiKey) {
      throw new Error('FINNHUB_API_KEY is not configured in environment variables.');
    }

    try {
      const upperSymbol = symbol.toUpperCase();
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${upperSymbol}&token=${this.apiKey}`);
      if (!res.ok) throw new Error(`Finnhub HTTP ${res.status}: ${res.statusText}`);
      const data: any = await res.json();

      if (!data || typeof data.c !== 'number' || data.c === 0) {
        throw new Error(`No quote data returned for symbol ${upperSymbol}`);
      }

      // Fetch profile info for name and sector (cached to minimize network requests)
      let companyName = `${upperSymbol} Inc`;
      let sector = 'Market Asset';
      let marketCap = 'N/A';

      if (this.profileCache.has(upperSymbol)) {
        const cachedProf = this.profileCache.get(upperSymbol);
        if (cachedProf.name) companyName = cachedProf.name;
        if (cachedProf.finnhubIndustry) sector = cachedProf.finnhubIndustry;
        if (cachedProf.marketCapitalization) marketCap = `$${(cachedProf.marketCapitalization / 1000).toFixed(2)}B`;
      } else {
        try {
          const profileRes = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${upperSymbol}&token=${this.apiKey}`);
          if (profileRes.ok) {
            const profile: any = await profileRes.json();
            if (profile && profile.name) {
              this.profileCache.set(upperSymbol, profile);
              companyName = profile.name;
              if (profile.finnhubIndustry) sector = profile.finnhubIndustry;
              if (profile.marketCapitalization) marketCap = `$${(profile.marketCapitalization / 1000).toFixed(2)}B`;
            }
          }
        } catch {
          // Optional enrichment failure ignored
        }
      }

      return {
        symbol: upperSymbol,
        name: companyName,
        exchange: 'NASDAQ',
        currency: 'USD',
        price: data.c,
        change: parseFloat((data.d || 0).toFixed(2)),
        changePercent: parseFloat((data.dp || 0).toFixed(2)),
        open: data.o || data.c,
        high: data.h || data.c,
        low: data.l || data.c,
        previousClose: data.pc || data.c,
        volume: 0,
        marketCap,
        sector,
        lastUpdated: new Date().toISOString(),
      };
    } catch (err: any) {
      logger.error(`[FinnhubProvider] Failed to fetch quote for ${symbol}:`, err.message);
      throw err;
    }
  }

  async getHistoricalData(symbol: string, timeframe: string): Promise<HistoricalDataPoint[]> {
    if (!this.apiKey) {
      throw new Error('FINNHUB_API_KEY is not configured.');
    }

    const upperSymbol = symbol.toUpperCase();
    const now = Math.floor(Date.now() / 1000);
    let from = now - 30 * 86400; // default 30 days
    let resolution = 'D';

    const upperTimeframe = timeframe.toUpperCase();

    if (timeframe === '1m') {
      from = now - 2 * 86400; // 2 days
      resolution = '1';
    } else if (timeframe === '5m') {
      from = now - 5 * 86400; // 5 days
      resolution = '5';
    } else if (timeframe === '15m') {
      from = now - 7 * 86400; // 7 days
      resolution = '15';
    } else if (timeframe === '30m') {
      from = now - 14 * 86400; // 14 days
      resolution = '30';
    } else if (timeframe === '1h') {
      from = now - 30 * 86400; // 30 days
      resolution = '60';
    } else if (timeframe === '4h') {
      logger.info(`[Historical Data] Finnhub does not support 4h resolution natively.`);
      return []; // Not natively supported by Finnhub stock/candle free tier
    } else if (upperTimeframe === '1D') {
      from = now - 90 * 86400; // 90 days
      resolution = 'D';
    } else if (upperTimeframe === '1W') {
      from = now - 365 * 86400; // 1 year
      resolution = 'W';
    } else if (timeframe === '1M') {
      from = now - 5 * 365 * 86400; // 5 years
      resolution = 'M';
    } else if (upperTimeframe === '1Y') {
      from = now - 365 * 86400;
      resolution = 'W';
    } else if (upperTimeframe === '5Y') {
      from = now - 5 * 365 * 86400;
      resolution = 'M';
    }

    // 1. Query Finnhub /stock/candle endpoint
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${upperSymbol}&resolution=${resolution}&from=${from}&to=${now}&token=${this.apiKey}`
      );

      if (res.ok) {
        const data: any = await res.json();
        if (data && data.s === 'ok' && Array.isArray(data.t) && data.t.length > 0) {
          const points = data.t.map((t: number, index: number) => {
            const dateStr = new Date(t * 1000).toISOString();
            return {
              timestamp: dateStr,
              date: dateStr.split('T')[0],
              open: data.o[index],
              high: data.h[index],
              low: data.l[index],
              close: data.c[index],
              volume: data.v ? data.v[index] : 0,
            };
          });
          logger.info(`[Historical Data] Source: Finnhub | Candles received: ${points.length} | Data quality: valid`);
          return points;
        }
      } else if (res.status === 403) {
        logger.info(`[Historical Data] Finnhub /stock/candle endpoint returned 403 Forbidden (Historical candles restricted on Finnhub free tier).`);
      }
    } catch (err: any) {
      logger.warn(`[Historical Data] Finnhub candle fetch error for ${upperSymbol}:`, err.message);
    }

    // 2. Query legitimate secondary historical provider (AlphaVantage or TwelveData) if configured in .env
    const avKey = process.env.ALPHA_VANTAGE_API_KEY || process.env.ALPHAVANTAGE_API_KEY;
    if (avKey && avKey !== 'your_alphavantage_api_key_here' && avKey !== 'demo') {
      try {
        const avProvider = new AlphaVantageProvider();
        const avPoints = await avProvider.getHistoricalData(upperSymbol, timeframe);
        if (avPoints && avPoints.length > 0) {
          logger.info(`[Historical Data] Source: AlphaVantage (Secondary Fallback) | Candles received: ${avPoints.length} | Data quality: valid`);
          return avPoints;
        }
      } catch (err: any) {
        logger.warn(`[Historical Data] AlphaVantage historical fallback error:`, err.message);
      }
    }

    const tdKey = process.env.TWELVEDATA_API_KEY;
    if (tdKey && tdKey !== 'your_twelvedata_api_key_here' && tdKey !== 'demo') {
      try {
        const tdProvider = new TwelveDataProvider();
        const tdPoints = await tdProvider.getHistoricalData(upperSymbol, timeframe);
        if (tdPoints && tdPoints.length > 0) {
          logger.info(`[Historical Data] Source: TwelveData (Secondary Fallback) | Candles received: ${tdPoints.length} | Data quality: valid`);
          return tdPoints;
        }
      } catch (err: any) {
        logger.warn(`[Historical Data] TwelveData historical fallback error:`, err.message);
      }
    }

    // 3. If no real historical candles are returned from any provider, return empty array without fabricating data
    logger.info(`[Historical Data] Source: None | Candles received: 0 | Data quality: insufficient`);
    return [];
  }

  async searchSymbols(query: string): Promise<SearchResultItem[]> {
    if (!this.apiKey) {
      throw new Error('FINNHUB_API_KEY is not configured.');
    }

    try {
      const res = await fetch(`https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${this.apiKey}`);
      if (!res.ok) throw new Error(`Finnhub Search HTTP ${res.status}`);
      const data: any = await res.json();

      if (!data || !Array.isArray(data.result)) return [];

      return data.result.slice(0, 10).map((item: any) => ({
        symbol: item.symbol,
        name: item.description || item.symbol,
        exchange: item.type || 'US',
        type: 'STOCK',
        region: 'US',
        currency: 'USD',
      }));
    } catch (err: any) {
      logger.error(`[FinnhubProvider] Failed symbol search for "${query}":`, err.message);
      throw err;
    }
  }

  async getMarketOverview(): Promise<MarketOverviewData> {
    if (!this.apiKey) {
      throw new Error('FINNHUB_API_KEY is not configured in environment variables.');
    }

    const indicesSymbols = ['SPY', 'QQQ', 'DIA', 'IWM'];
    const indexResults: any[] = [];

    for (const sym of indicesSymbols) {
      try {
        const q = await this.getQuote(sym);
        indexResults.push({
          symbol: sym,
          name: sym === 'SPY' ? 'S&P 500 (SPY)' : sym === 'QQQ' ? 'NASDAQ 100 (QQQ)' : sym === 'DIA' ? 'Dow Jones (DIA)' : 'Russell 2000 (IWM)',
          price: `$${q.price.toFixed(2)}`,
          change: `${q.change >= 0 ? '+' : ''}${q.change.toFixed(2)}`,
          changePercent: q.changePercent,
          isOpen: true,
        });
      } catch {
        // Skip unresolvable symbols
      }
    }

    // Try fetching public Crypto rates from CoinGecko (free public API)
    let cryptoResults: any[] = [];
    try {
      const cryptoRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true');
      if (cryptoRes.ok) {
        const cData: any = await cryptoRes.json();
        if (cData.bitcoin) {
          cryptoResults.push({
            symbol: 'BTC/USD',
            name: 'Bitcoin',
            price: `$${cData.bitcoin.usd.toLocaleString()}`,
            changePercent: parseFloat((cData.bitcoin.usd_24h_change || 0).toFixed(2)),
          });
        }
        if (cData.ethereum) {
          cryptoResults.push({
            symbol: 'ETH/USD',
            name: 'Ethereum',
            price: `$${cData.ethereum.usd.toLocaleString()}`,
            changePercent: parseFloat((cData.ethereum.usd_24h_change || 0).toFixed(2)),
          });
        }
      }
    } catch {
      // Crypto fallback
    }

    return {
      indices: indexResults,
      crypto: cryptoResults,
      commodities: [],
    };
  }

  async getMarketStatus(): Promise<MarketStatusData> {
    const now = new Date();
    const utcDay = now.getUTCDay();
    const utcHour = now.getUTCHours();
    const isWeekend = utcDay === 0 || utcDay === 6;
    const isUsMarketOpen = !isWeekend && utcHour >= 14 && utcHour < 21;

    return {
      markets: [
        { region: 'US', name: 'NYSE & NASDAQ', status: isUsMarketOpen ? 'OPEN' : 'CLOSED', lastUpdated: now.toISOString() },
        { region: 'CRYPTO', name: 'Global Crypto', status: 'OPEN', lastUpdated: now.toISOString() },
      ],
    };
  }

  async getStatistics(symbol: string): Promise<any> {
    if (!this.apiKey) {
      return null;
    }
    try {
      const upperSymbol = symbol.toUpperCase();
      const res = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${upperSymbol}&metric=all&token=${this.apiKey}`);
      if (!res.ok) return null;
      const data: any = await res.json();
      return data;
    } catch (err: any) {
      logger.warn(`[FinnhubProvider] Failed to fetch statistics for ${symbol}:`, err.message);
      return null;
    }
  }

  async getProfile(symbol: string): Promise<any> {
    if (!this.apiKey) return null;
    try {
      const upperSymbol = symbol.toUpperCase();
      // Check cache first
      if (this.profileCache.has(upperSymbol)) {
        return this.profileCache.get(upperSymbol);
      }
      const res = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${upperSymbol}&token=${this.apiKey}`);
      if (!res.ok) return null;
      const data: any = await res.json();
      if (data && data.name) {
        this.profileCache.set(upperSymbol, data);
      }
      return data;
    } catch (err: any) {
      logger.warn(`[FinnhubProvider] Failed to fetch profile for ${symbol}:`, err.message);
      return null;
    }
  }

  async getAnalystRatings(symbol: string): Promise<any> {
    if (!this.apiKey) return null;
    try {
      const upperSymbol = symbol.toUpperCase();
      const res = await fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${upperSymbol}&token=${this.apiKey}`);
      if (!res.ok) return null;
      const data: any = await res.json();
      return data;
    } catch (err: any) {
      logger.warn(`[FinnhubProvider] Failed to fetch analyst ratings for ${symbol}:`, err.message);
      return null;
    }
  }

  async getNews(symbol: string, from: string, to: string): Promise<any> {
    if (!this.apiKey) return null;
    try {
      const upperSymbol = symbol.toUpperCase();
      const res = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${upperSymbol}&from=${from}&to=${to}&token=${this.apiKey}`);
      if (!res.ok) return null;
      const data: any = await res.json();
      return data;
    } catch (err: any) {
      logger.warn(`[FinnhubProvider] Failed to fetch news for ${symbol}:`, err.message);
      return null;
    }
  }
}
