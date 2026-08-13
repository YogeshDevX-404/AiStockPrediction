import { create } from 'zustand';
import { NewsArticle, NewsApi } from '@/services/api/newsApi';

interface NewsStoreState {
  articles: NewsArticle[];
  selectedCategory: string; // 'All' | 'Markets' | 'Companies' | 'Crypto' | 'Economy' | 'Technology'
  searchQuery: string;
  isLoading: boolean;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  fetchArticles: (category?: string, symbol?: string) => Promise<void>;
  searchNews: (query: string) => Promise<void>;
}

export const useNewsStore = create<NewsStoreState>((set, get) => ({
  articles: [
    {
      id: 'n1',
      title: 'NVIDIA Surges +4.2% as Next-Gen Blackwell Ultra AI Chips Enter Mass Production',
      summary: 'NVIDIA Corporation announced full production scaling for its Blackwell Ultra GPU architecture across TSMC 4nm foundries.',
      detailedBody: 'NVIDIA Corporation (NASDAQ: NVDA) experienced a significant institutional buying surge after confirming that its next-generation Blackwell Ultra GPU AI accelerators have entered mass volume production at Taiwan Semiconductor Manufacturing Company (TSMC). Major hyperscalers including Microsoft Azure, Amazon AWS, and Google Cloud have expanded multi-billion-dollar pre-orders.',
      source: 'Bloomberg Technology',
      url: 'https://bloomberg.com/news/nvda-blackwell-scaling',
      publishedAt: '2026-03-25T14:15:00Z',
      sentiment: 'BULLISH',
      sentimentScore: 94.8,
      marketImpact: 'VERY_HIGH',
      relatedSymbols: ['NVDA', 'TSM', 'MSFT', 'AMZN', 'GOOGL'],
      relatedSectors: ['Semiconductors', 'Artificial Intelligence', 'Cloud Infrastructure'],
      category: 'Companies',
      isBreaking: true,
    },
    {
      id: 'n2',
      title: 'Federal Reserve Signals Interest Rate Cut Pause Amid Stable 2.1% Inflation CPI Print',
      summary: 'Federal Reserve Chairman Jerome Powell indicated monetary policy will remain steady during upcoming FOMC sessions.',
      detailedBody: 'The Federal Open Market Committee (FOMC) released its latest monetary policy statement, maintaining the benchmark federal funds rate while highlighting solid GDP expansion and stabilizing CPI inflation trends at 2.1% year-over-year.',
      source: 'Reuters Macro Analysis',
      url: 'https://reuters.com/markets/fomc-policy-update',
      publishedAt: '2026-03-25T11:00:00Z',
      sentiment: 'NEUTRAL',
      sentimentScore: 65.0,
      marketImpact: 'HIGH',
      relatedSymbols: ['SPY', 'QQQ', 'US10Y'],
      relatedSectors: ['Global Banking', 'Treasury Debt'],
      category: 'Economy',
      isBreaking: false,
    },
    {
      id: 'n3',
      title: 'Tesla Robotaxi Autonomous Fleet Reaches 50 Million Driverless Miles',
      summary: 'Tesla Inc. announced a key milestone for its Cybercab autonomous taxi network across Texas and California.',
      detailedBody: 'Tesla Inc. (NASDAQ: TSLA) achieved 50 million fully autonomous commercial fleet miles across key pilot cities. Analysts at Morgan Stanley raised their price target on TSLA citing recurring mobility software subscription revenues.',
      source: 'Financial Times Tech',
      url: 'https://ft.com/content/tesla-robotaxi-milestone',
      publishedAt: '2026-03-24T18:30:00Z',
      sentiment: 'BULLISH',
      sentimentScore: 91.2,
      marketImpact: 'HIGH',
      relatedSymbols: ['TSLA', 'UBER'],
      relatedSectors: ['Automotive & EV', 'Autonomous Mobility'],
      category: 'Technology',
      isBreaking: false,
    },
    {
      id: 'n4',
      title: 'Reliance Industries Contracts $2.5B Green Hydrogen Plant Expansion',
      summary: 'Reliance Industries Ltd expands its Jamnagar renewable energy giga-complex.',
      detailedBody: 'Reliance Industries Ltd (NSE: RELIANCE) signed definitive EPC agreements for its green hydrogen electrolyzer giga-factory in Gujarat, targeting 10GW annual clean energy capacity.',
      source: 'Economic Times India',
      url: 'https://economictimes.indiatimes.com/reliance-green-energy',
      publishedAt: '2026-03-23T09:20:00Z',
      sentiment: 'BULLISH',
      sentimentScore: 88.0,
      marketImpact: 'MEDIUM',
      relatedSymbols: ['RELIANCE'],
      relatedSectors: ['Clean Energy', 'Conglomerates'],
      category: 'Companies',
      isBreaking: false,
    },
  ],
  selectedCategory: 'All',
  searchQuery: '',
  isLoading: false,

  setSelectedCategory: (selectedCategory) => {
    set({ selectedCategory });
    get().fetchArticles(selectedCategory);
  },

  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    if (searchQuery.trim()) {
      get().searchNews(searchQuery);
    } else {
      get().fetchArticles();
    }
  },

  fetchArticles: async (category, symbol) => {
    try {
      set({ isLoading: true });
      const articles = await NewsApi.getFeed(category || get().selectedCategory, symbol);
      set({ articles, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  searchNews: async (query) => {
    try {
      set({ isLoading: true });
      const articles = await NewsApi.search(query);
      set({ articles, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
