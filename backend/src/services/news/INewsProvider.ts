export interface NewsArticleItem {
  id: string;
  title: string;
  summary: string;
  detailedBody?: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  sentimentScore: number; // 0 - 100
  marketImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  relatedSymbols: string[];
  relatedSectors: string[];
  category: string;
  isBreaking?: boolean;
}

export interface INewsProvider {
  name: string;
  fetchArticles(category?: string, symbol?: string): Promise<NewsArticleItem[]>;
}
