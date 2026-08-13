export interface StockQuote {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: number;
  avgVolume?: number;
  marketCap?: string;
  peRatio?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  sector?: string;
  industry?: string;
  lastUpdated: string;
}

export interface HistoricalDataPoint {
  timestamp: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface SearchResultItem {
  symbol: string;
  name: string;
  exchange: string;
  type: string; // STOCK, ETF, INDEX, CRYPTO, FOREX, COMMODITY
  region: string;
  currency: string;
}

export interface MarketOverviewData {
  indices: { symbol: string; name: string; price: string; change: string; changePercent: number; isOpen: boolean }[];
  crypto: { symbol: string; name: string; price: string; changePercent: number }[];
  commodities: { symbol: string; name: string; price: string; changePercent: number }[];
}

export interface MarketStatusData {
  markets: { region: string; name: string; status: 'OPEN' | 'CLOSED' | 'PRE_MARKET' | 'AFTER_HOURS'; lastUpdated: string }[];
}

export interface IMarketDataProvider {
  name: string;
  getQuote(symbol: string): Promise<StockQuote>;
  getHistoricalData(symbol: string, timeframe: string): Promise<HistoricalDataPoint[]>;
  searchSymbols(query: string): Promise<SearchResultItem[]>;
  getMarketOverview(): Promise<MarketOverviewData>;
  getMarketStatus(): Promise<MarketStatusData>;
}
