import { MarketProviderFactory } from '../providers/MarketProviderFactory';

export interface KeyStatisticsData {
  marketCap: string;
  peRatio: number;
  eps: number;
  dividendYield: number;
  beta: number;
  roe: number;
  roce: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  bookValue: number;
  faceValue: number;
  enterpriseValue: string;
}

export interface FinancialsData {
  incomeStatement: { period: string; revenue: number; netIncome: number; ebitda: number; margin: number }[];
  balanceSheet: { period: string; assets: number; liabilities: number; equity: number }[];
  cashFlow: { period: string; operatingCashFlow: number; freeCashFlow: number }[];
  quarterlyResults: { quarter: string; revenue: number; profit: number; eps: number; margin: number; growth: number }[];
}

export interface CompanyProfileData {
  about: string;
  ceo: string;
  founded: string;
  employees: string;
  website: string;
  headquarters: string;
  sector: string;
  industry: string;
  shareholding: {
    promoters: number;
    fii: number;
    dii: number;
    retail: number;
    others: number;
  };
  dividendHistory: { exDate: string; recordDate: string; dividend: number; yield: number }[];
}

export interface AnalystRatingsData {
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
  consensusRating: string;
  targetPrice: number;
}

export const getDetailedStockService = async (symbol: string) => {
  const provider = MarketProviderFactory.getProvider();
  return provider.getQuote(symbol);
};

export const getStockStatisticsService = async (symbol: string): Promise<KeyStatisticsData> => {
  const provider = MarketProviderFactory.getProvider();
  
  let stats: any = null;
  if (provider.getStatistics) {
    stats = await provider.getStatistics(symbol);
  }
  
  // Fallback to getQuote for some basic fields if getStatistics is unsupported or fails
  const quote = await provider.getQuote(symbol);

  const formatBillion = (val: number | undefined) => {
    if (!val) return null;
    return `$${(val / 1000).toFixed(2)}B`;
  };

  const m = stats?.metric || {};

  return {
    marketCap: m.marketCapitalization ? formatBillion(m.marketCapitalization) : quote.marketCap || null,
    peRatio: m.peTTM || m.peAnnual || quote.peRatio || null,
    eps: m.epsTTM || m.epsAnnual || null,
    dividendYield: m.dividendYieldIndicatedAnnual || m.currentDividendYieldTTM || null,
    beta: m.beta || null,
    roe: m.roeTTM || m.roe5Y || null,
    roce: m.roiTTM || m.roaTTM || null,
    fiftyTwoWeekHigh: m['52WeekHigh'] || quote.fiftyTwoWeekHigh || null,
    fiftyTwoWeekLow: m['52WeekLow'] || quote.fiftyTwoWeekLow || null,
    bookValue: m.bookValuePerShareQuarterly || m.bookValuePerShareAnnual || null,
    faceValue: null,
    enterpriseValue: m.enterpriseValue ? formatBillion(m.enterpriseValue) : null,
  } as any;
};

export const getStockFinancialsService = async (symbol: string): Promise<FinancialsData> => {
  return {
    incomeStatement: [],
    balanceSheet: [],
    cashFlow: [],
    quarterlyResults: [],
  };
};

export const getStockProfileService = async (symbol: string): Promise<CompanyProfileData> => {
  const provider = MarketProviderFactory.getProvider();
  
  let p: any = null;
  if (provider.getProfile) {
    p = await provider.getProfile(symbol);
  }

  if (!p) {
    p = {}; // Fallback
  }

  return {
    about: p.name ? `${p.name} is a publicly traded company in the ${p.finnhubIndustry || 'General'} sector.` : 'Company profile information unavailable.',
    ceo: 'N/A', // Finnhub free doesn't provide CEO
    founded: 'N/A', // Finnhub free doesn't provide founded date
    employees: 'N/A', 
    website: p.weburl || 'N/A',
    headquarters: p.country || 'N/A',
    sector: p.finnhubIndustry || 'N/A',
    industry: p.finnhubIndustry || 'N/A',
    shareholding: {
      promoters: 0,
      fii: 0,
      dii: 0,
      retail: 0,
      others: 0,
    },
    dividendHistory: [],
  };
};

export const getStockNewsService = async (symbol: string) => {
  const provider = MarketProviderFactory.getProvider();
  
  if (provider.getNews) {
    const d = new Date();
    const to = d.toISOString().split('T')[0];
    d.setDate(d.getDate() - 7);
    const from = d.toISOString().split('T')[0];
    
    const newsData = await provider.getNews(symbol, from, to);
    if (Array.isArray(newsData) && newsData.length > 0) {
      return newsData.slice(0, 5).map((n: any) => ({
        id: n.id.toString(),
        title: n.headline,
        source: n.source,
        publishedAt: new Date(n.datetime * 1000).toLocaleString(),
        sentiment: 'NEUTRAL', // We don't have sentiment from Finnhub directly
      }));
    }
  }

  return [];
};

export const getStockAnalystRatingsService = async (symbol: string): Promise<AnalystRatingsData> => {
  const provider = MarketProviderFactory.getProvider();
  
  let recs: any = null;
  if (provider.getAnalystRatings) {
    recs = await provider.getAnalystRatings(symbol);
  }
  
  // If we have an array, take the most recent month (index 0)
  if (Array.isArray(recs) && recs.length > 0) {
    const r = recs[0];
    
    // Calculate consensus
    const total = r.strongBuy + r.buy + r.hold + r.sell + r.strongSell;
    let consensusRating = 'HOLD';
    if (total > 0) {
      const score = (r.strongBuy * 5 + r.buy * 4 + r.hold * 3 + r.sell * 2 + r.strongSell * 1) / total;
      if (score >= 4.5) consensusRating = 'STRONG BUY';
      else if (score >= 3.5) consensusRating = 'BUY';
      else if (score >= 2.5) consensusRating = 'HOLD';
      else if (score >= 1.5) consensusRating = 'SELL';
      else consensusRating = 'STRONG SELL';
    }

    return {
      strongBuy: r.strongBuy || 0,
      buy: r.buy || 0,
      hold: r.hold || 0,
      sell: r.sell || 0,
      strongSell: r.strongSell || 0,
      consensusRating,
      targetPrice: 0, // Cannot get target price from recommendation endpoint
    };
  }

  return {
    strongBuy: 0,
    buy: 0,
    hold: 0,
    sell: 0,
    strongSell: 0,
    consensusRating: 'N/A',
    targetPrice: 0,
  };
};
