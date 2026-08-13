export interface MarketTickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: number;
  isOpen: boolean;
  category: 'INDEX' | 'CRYPTO' | 'COMMODITY';
}

export interface GainerLoserItem {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  sparkline: number[];
}

export interface HeatmapItem {
  symbol: string;
  name: string;
  sector: string;
  marketCap: string;
  changePercent: number;
}

export interface EconomicEvent {
  id: string;
  title: string;
  country: string;
  flag: string;
  date: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  actual?: string;
  forecast: string;
  previous: string;
}

export interface CryptoItem {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  sparkline: number[];
}

export const mockMarketTickers: MarketTickerItem[] = [
  { symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: '24,850.40', change: '+142.10', changePercent: 0.58, isOpen: true, category: 'INDEX' },
  { symbol: 'BANK NIFTY', name: 'Nifty Bank Index', price: '52,340.80', change: '+320.50', changePercent: 0.62, isOpen: true, category: 'INDEX' },
  { symbol: 'SENSEX', name: 'BSE Sensex 30', price: '81,420.15', change: '+410.20', changePercent: 0.51, isOpen: true, category: 'INDEX' },
  { symbol: 'NASDAQ', name: 'Nasdaq Composite', price: '17,890.30', change: '+185.40', changePercent: 1.05, isOpen: true, category: 'INDEX' },
  { symbol: 'S&P 500', name: 'S&P 500 Index', price: '5,540.20', change: '+42.30', changePercent: 0.77, isOpen: true, category: 'INDEX' },
  { symbol: 'BTC/USD', price: '$67,450.00', change: '+$2,480.00', changePercent: 3.82, isOpen: true, category: 'CRYPTO', name: 'Bitcoin' },
  { symbol: 'ETH/USD', price: '$3,480.20', change: '+$89.50', changePercent: 2.64, isOpen: true, category: 'CRYPTO', name: 'Ethereum' },
  { symbol: 'GOLD', price: '$2,415.60', change: '+$14.20', changePercent: 0.59, isOpen: true, category: 'COMMODITY', name: 'Gold Spot' },
  { symbol: 'CRUDE OIL', price: '$78.40', change: '-$0.85', changePercent: -1.07, isOpen: true, category: 'COMMODITY', name: 'WTI Crude' },
];

export const mockTopGainers: GainerLoserItem[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 132.40, changePercent: 4.85, volume: '48.2M', sparkline: [122, 124, 126, 125, 129, 132.4] },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 248.60, changePercent: 4.25, volume: '32.1M', sparkline: [235, 238, 240, 242, 246, 248.6] },
  { symbol: 'PLTR', name: 'Palantir Tech', price: 28.90, changePercent: 3.92, volume: '22.4M', sparkline: [26, 27, 27.5, 28, 28.4, 28.9] },
  { symbol: 'AMD', name: 'Advanced Micro', price: 178.50, changePercent: 3.40, volume: '18.9M', sparkline: [170, 172, 174, 175, 176, 178.5] },
];

export const mockTopLosers: GainerLoserItem[] = [
  { symbol: 'INTC', name: 'Intel Corp', price: 28.40, changePercent: -3.85, volume: '29.4M', sparkline: [31, 30.5, 30, 29.5, 29, 28.4] },
  { symbol: 'XOM', name: 'Exxon Mobil', price: 114.20, changePercent: -2.45, volume: '14.2M', sparkline: [118, 117, 116.5, 115.5, 115, 114.2] },
  { symbol: 'CVX', name: 'Chevron Corp', price: 152.10, changePercent: -1.95, volume: '11.8M', sparkline: [156, 155, 154, 153.5, 153, 152.1] },
  { symbol: 'PFE', name: 'Pfizer Inc', price: 27.80, changePercent: -1.42, volume: '16.5M', sparkline: [29, 28.8, 28.5, 28.2, 28, 27.8] },
];

export const mockHeatmapItems: HeatmapItem[] = [
  { symbol: 'NVDA', name: 'NVIDIA', sector: 'Semiconductors', marketCap: '$3.2T', changePercent: 4.85 },
  { symbol: 'AAPL', name: 'Apple', sector: 'Consumer Electronics', marketCap: '$3.4T', changePercent: 1.84 },
  { symbol: 'MSFT', name: 'Microsoft', sector: 'Software & Cloud', marketCap: '$3.3T', changePercent: 1.12 },
  { symbol: 'AMZN', name: 'Amazon', sector: 'E-Commerce & Cloud', marketCap: '$1.9T', changePercent: 2.40 },
  { symbol: 'GOOGL', name: 'Alphabet', sector: 'Internet Services', marketCap: '$2.1T', changePercent: -0.45 },
  { symbol: 'META', name: 'Meta', sector: 'Social Media', marketCap: '$1.3T', changePercent: 2.10 },
  { symbol: 'TSLA', name: 'Tesla', sector: 'EV & Automotive', marketCap: '$780B', changePercent: 3.90 },
  { symbol: 'AMD', name: 'AMD', sector: 'Semiconductors', marketCap: '$280B', changePercent: 3.40 },
  { symbol: 'XOM', name: 'Exxon', sector: 'Oil & Gas', marketCap: '$450B', changePercent: -2.45 },
  { symbol: 'JPM', name: 'JPMorgan', sector: 'Banking & Finance', marketCap: '$580B', changePercent: 0.85 },
  { symbol: 'V', name: 'Visa', sector: 'Financial Services', marketCap: '$520B', changePercent: 0.42 },
  { symbol: 'LLY', name: 'Eli Lilly', sector: 'Healthcare', marketCap: '$840B', changePercent: 1.65 },
];

export const mockEconomicEvents: EconomicEvent[] = [
  { id: 'e1', title: 'Federal Reserve Interest Rate Decision', country: 'US', flag: '🇺🇸', date: 'Today, 2:00 PM EST', impact: 'HIGH', forecast: '5.25%', previous: '5.25%' },
  { id: 'e2', title: 'US Core CPI Inflation Data (YoY)', country: 'US', flag: '🇺🇸', date: 'Tomorrow, 8:30 AM EST', impact: 'HIGH', forecast: '3.0%', previous: '3.2%' },
  { id: 'e3', title: 'RBI Monetary Policy Committee Rate Decision', country: 'IN', flag: '🇮🇳', date: 'Aug 8, 10:00 AM IST', impact: 'HIGH', forecast: '6.50%', previous: '6.50%' },
  { id: 'e4', title: 'US Initial Jobless Claims', country: 'US', flag: '🇺🇸', date: 'Thursday, 8:30 AM EST', impact: 'MEDIUM', forecast: '235K', previous: '238K' },
];

export const mockCryptoItems: CryptoItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67450, changePercent: 3.82, sparkline: [63000, 64200, 65100, 64800, 66300, 67450] },
  { symbol: 'ETH', name: 'Ethereum', price: 3480.2, changePercent: 2.64, sparkline: [3300, 3350, 3400, 3380, 3440, 3480.2] },
  { symbol: 'BNB', name: 'Binance Coin', price: 585.4, changePercent: 1.45, sparkline: [570, 575, 578, 576, 582, 585.4] },
  { symbol: 'SOL', name: 'Solana', price: 184.2, changePercent: 5.12, sparkline: [170, 173, 176, 178, 181, 184.2] },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.134, changePercent: 4.80, sparkline: [0.12, 0.124, 0.128, 0.127, 0.131, 0.134] },
];
