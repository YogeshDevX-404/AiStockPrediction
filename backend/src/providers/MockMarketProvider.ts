import {
  IMarketDataProvider,
  StockQuote,
  HistoricalDataPoint,
  SearchResultItem,
  MarketOverviewData,
  MarketStatusData,
} from './IMarketDataProvider';

export class MockMarketProvider implements IMarketDataProvider {
  readonly name = 'MockMarketProvider';

  private quotesDatabase: Record<string, StockQuote> = {
    NVDA: {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      exchange: 'NASDAQ',
      currency: 'USD',
      price: 132.40,
      change: 4.42,
      changePercent: 3.45,
      open: 128.50,
      high: 133.10,
      low: 127.80,
      previousClose: 127.98,
      volume: 48200000,
      avgVolume: 52000000,
      marketCap: '$3.25 Trillion',
      peRatio: 72.4,
      fiftyTwoWeekHigh: 140.76,
      fiftyTwoWeekLow: 39.23,
      sector: 'Technology',
      industry: 'Semiconductors',
      lastUpdated: new Date().toISOString(),
    },
    AAPL: {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      price: 224.50,
      change: 4.05,
      changePercent: 1.84,
      open: 221.00,
      high: 225.20,
      low: 220.50,
      previousClose: 220.45,
      volume: 38400000,
      avgVolume: 45000000,
      marketCap: '$3.44 Trillion',
      peRatio: 34.2,
      fiftyTwoWeekHigh: 237.23,
      fiftyTwoWeekLow: 164.08,
      sector: 'Technology',
      industry: 'Consumer Electronics',
      lastUpdated: new Date().toISOString(),
    },
    TSLA: {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      exchange: 'NASDAQ',
      currency: 'USD',
      price: 248.60,
      change: 10.15,
      changePercent: 4.25,
      open: 240.00,
      high: 250.00,
      low: 238.50,
      previousClose: 238.45,
      volume: 62100000,
      avgVolume: 78000000,
      marketCap: '$792 Billion',
      peRatio: 64.8,
      fiftyTwoWeekHigh: 271.00,
      fiftyTwoWeekLow: 138.80,
      sector: 'Consumer Cyclical',
      industry: 'Auto Manufacturers',
      lastUpdated: new Date().toISOString(),
    },
    RELIANCE: {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      exchange: 'NSE',
      currency: 'INR',
      price: 3020.50,
      change: 28.50,
      changePercent: 0.95,
      open: 2995.00,
      high: 3035.00,
      low: 2990.00,
      previousClose: 2992.00,
      volume: 8400000,
      avgVolume: 10200000,
      marketCap: '₹20.4 Trillion',
      peRatio: 28.6,
      fiftyTwoWeekHigh: 3217.90,
      fiftyTwoWeekLow: 2220.30,
      sector: 'Energy',
      industry: 'Oil & Gas Integrated',
      lastUpdated: new Date().toISOString(),
    },
  };

  async getQuote(symbol: string): Promise<StockQuote> {
    const uppercaseSymbol = symbol.toUpperCase();
    if (this.quotesDatabase[uppercaseSymbol]) {
      return {
        ...this.quotesDatabase[uppercaseSymbol],
        lastUpdated: new Date().toISOString(),
      };
    }

    // Default fallback quote generator for any unlisted symbol
    return {
      symbol: uppercaseSymbol,
      name: `${uppercaseSymbol} Equity Corp`,
      exchange: 'NASDAQ',
      currency: 'USD',
      price: 150.00,
      change: 2.50,
      changePercent: 1.69,
      open: 148.00,
      high: 151.50,
      low: 147.20,
      previousClose: 147.50,
      volume: 12000000,
      avgVolume: 15000000,
      marketCap: '$45 Billion',
      peRatio: 24.5,
      fiftyTwoWeekHigh: 180.00,
      fiftyTwoWeekLow: 110.00,
      sector: 'General Market',
      industry: 'Diversified',
      lastUpdated: new Date().toISOString(),
    };
  }

  async getHistoricalData(symbol: string, timeframe: string): Promise<HistoricalDataPoint[]> {
    const pointsCount = timeframe === '1D' ? 24 : timeframe === '5D' ? 40 : 60;
    const basePrice = (await this.getQuote(symbol)).price;
    const data: HistoricalDataPoint[] = [];

    let current = basePrice * 0.9;
    const now = Date.now();

    for (let i = pointsCount; i >= 0; i--) {
      const time = new Date(now - i * 3600000 * (timeframe === '1D' ? 0.5 : 24)).toISOString();
      const delta = (Math.random() - 0.48) * (basePrice * 0.02);
      current = Math.max(1, current + delta);
      const high = current + Math.random() * 1.5;
      const low = Math.max(0.5, current - Math.random() * 1.5);

      data.push({
        timestamp: time,
        date: time.split('T')[0],
        open: parseFloat((current - delta).toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(current.toFixed(2)),
        volume: Math.floor(Math.random() * 500000 + 100000),
      });
    }

    return data;
  }

  async searchSymbols(query: string): Promise<SearchResultItem[]> {
    const allItems: SearchResultItem[] = [
      { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', type: 'STOCK', region: 'US', currency: 'USD' },
      { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'STOCK', region: 'US', currency: 'USD' },
      { symbol: 'TSLA', name: 'Tesla, Inc.', exchange: 'NASDAQ', type: 'STOCK', region: 'US', currency: 'USD' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'STOCK', region: 'US', currency: 'USD' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'STOCK', region: 'US', currency: 'USD' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'STOCK', region: 'US', currency: 'USD' },
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE', type: 'STOCK', region: 'IN', currency: 'INR' },
      { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', type: 'STOCK', region: 'IN', currency: 'INR' },
      { symbol: 'INFY', name: 'Infosys Limited', exchange: 'NSE', type: 'STOCK', region: 'IN', currency: 'INR' },
      { symbol: 'BTC/USD', name: 'Bitcoin Spot', exchange: 'CRYPTO', type: 'CRYPTO', region: 'GLOBAL', currency: 'USD' },
      { symbol: 'ETH/USD', name: 'Ethereum Spot', exchange: 'CRYPTO', type: 'CRYPTO', region: 'GLOBAL', currency: 'USD' },
      { symbol: 'GOLD', name: 'Gold Spot Commodity', exchange: 'COMEX', type: 'COMMODITY', region: 'GLOBAL', currency: 'USD' },
    ];

    if (!query.trim()) return allItems.slice(0, 6);

    const q = query.toLowerCase();
    return allItems.filter(
      (item) => item.symbol.toLowerCase().includes(q) || item.name.toLowerCase().includes(q)
    );
  }

  async getMarketOverview(): Promise<MarketOverviewData> {
    return {
      indices: [
        { symbol: 'NIFTY 50', name: 'Nifty 50', price: '24,850.40', change: '+142.10', changePercent: 0.58, isOpen: true },
        { symbol: 'BANK NIFTY', name: 'Bank Nifty', price: '52,340.80', change: '+320.50', changePercent: 0.62, isOpen: true },
        { symbol: 'SENSEX', name: 'BSE Sensex', price: '81,420.15', change: '+410.20', changePercent: 0.51, isOpen: true },
        { symbol: 'NASDAQ', name: 'Nasdaq Composite', price: '17,890.30', change: '+185.40', changePercent: 1.05, isOpen: true },
        { symbol: 'S&P 500', name: 'S&P 500', price: '5,540.20', change: '+42.30', changePercent: 0.77, isOpen: true },
      ],
      crypto: [
        { symbol: 'BTC/USD', name: 'Bitcoin', price: '$67,450.00', changePercent: 3.82 },
        { symbol: 'ETH/USD', name: 'Ethereum', price: '$3,480.20', changePercent: 2.64 },
      ],
      commodities: [
        { symbol: 'GOLD', name: 'Gold Spot', price: '$2,415.60', changePercent: 0.59 },
        { symbol: 'CRUDE OIL', name: 'WTI Crude', price: '$78.40', changePercent: -1.07 },
      ],
    };
  }

  async getMarketStatus(): Promise<MarketStatusData> {
    return {
      markets: [
        { region: 'US', name: 'NYSE & NASDAQ', status: 'OPEN', lastUpdated: new Date().toISOString() },
        { region: 'IN', name: 'NSE & BSE', status: 'OPEN', lastUpdated: new Date().toISOString() },
        { region: 'UK', name: 'LSE London', status: 'CLOSED', lastUpdated: new Date().toISOString() },
        { region: 'CRYPTO', name: 'Global Crypto', status: 'OPEN', lastUpdated: new Date().toISOString() },
      ],
    };
  }
}
