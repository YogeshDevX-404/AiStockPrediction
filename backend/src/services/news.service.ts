import { prisma } from '../database';
import { logger } from '../utils/logger';

export interface NewsArticleItem {
  id: string;
  title: string;
  summary: string;
  detailedBody?: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  sentimentScore: number;
  marketImpact: 'HIGH' | 'MEDIUM' | 'LOW';
  relatedSymbols: string[];
  category: string;
  isBreaking?: boolean;
  isBookmarked?: boolean;
}

export const getNewsArticlesService = async (category?: string, symbol?: string): Promise<NewsArticleItem[]> => {
  const finnhubKey = process.env.FINNHUB_API_KEY || process.env.NEWS_API_KEY || '';

  if (finnhubKey) {
    try {
      const finnhubCategory = !category || category === 'All' ? 'general' : category.toLowerCase();
      const endpoint = symbol
        ? `https://finnhub.io/api/v1/company-news?symbol=${symbol.toUpperCase()}&from=2026-01-01&to=2026-12-31&token=${finnhubKey}`
        : `https://finnhub.io/api/v1/news?category=${finnhubCategory}&token=${finnhubKey}`;

      const res = await fetch(endpoint);
      if (res.ok) {
        const data: any = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.slice(0, 15).map((item: any, idx: number) => ({
            id: `n_${item.id || idx}`,
            title: item.headline || item.title || 'Market News Update',
            summary: item.summary || item.headline || '',
            detailedBody: item.summary || '',
            source: item.source || 'Financial News',
            url: item.url || '#',
            publishedAt: item.datetime ? new Date(item.datetime * 1000).toISOString() : new Date().toISOString(),
            sentiment: 'NEUTRAL' as const,
            sentimentScore: 50,
            marketImpact: 'MEDIUM' as const,
            relatedSymbols: item.related ? [item.related] : symbol ? [symbol.toUpperCase()] : [],
            category: category || 'Markets',
            isBreaking: idx === 0,
          }));
        }
      }
    } catch (err: any) {
      logger.warn('[NewsService] External news fetch error:', err.message);
    }
  }

  // Fallback to database news articles if present
  try {
    const whereClause: any = {};
    if (category && category !== 'All') {
      whereClause.category = category;
    }

    const dbArticles = await prisma.newsArticle.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      take: 15,
      orderBy: { publishedAt: 'desc' },
    });

    if (dbArticles && dbArticles.length > 0) {
      return dbArticles.map((a) => ({
        id: a.id,
        title: a.title,
        summary: a.summary,
        source: a.source,
        url: a.url,
        publishedAt: a.publishedAt.toISOString(),
        sentiment: a.sentiment as any,
        sentimentScore: a.sentimentScore,
        marketImpact: a.marketImpact as any,
        relatedSymbols: a.relatedSymbols,
        category: a.category,
      }));
    }
  } catch {
    // DB offline
  }

  return [];
};

export const getNewsArticleByIdService = async (id: string): Promise<NewsArticleItem | null> => {
  const articles = await getNewsArticlesService();
  return articles.find((a) => a.id === id) || null;
};

export const searchNewsArticlesService = async (query: string): Promise<NewsArticleItem[]> => {
  const articles = await getNewsArticlesService();
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.relatedSymbols.some((s) => s.toLowerCase().includes(q))
  );
};

export const getBookmarksService = async (userId: string): Promise<NewsArticleItem[]> => {
  try {
    const bookmarks = await prisma.newsBookmark.findMany({
      where: { userId },
      include: { article: true },
    });
    return bookmarks.map((b) => ({
      id: b.article.id,
      title: b.article.title,
      summary: b.article.summary,
      source: b.article.source,
      url: b.article.url,
      publishedAt: b.article.publishedAt.toISOString(),
      sentiment: b.article.sentiment as any,
      sentimentScore: b.article.sentimentScore,
      marketImpact: b.article.marketImpact as any,
      relatedSymbols: b.article.relatedSymbols,
      category: b.article.category,
      isBookmarked: true,
    }));
  } catch {
    return [];
  }
};

export const addBookmarkService = async (userId: string, articleId: string): Promise<boolean> => {
  try {
    await prisma.newsBookmark.create({
      data: { userId, articleId },
    });
    return true;
  } catch {
    return false;
  }
};

export const removeBookmarkService = async (userId: string, articleId: string): Promise<boolean> => {
  try {
    await prisma.newsBookmark.deleteMany({
      where: { userId, articleId },
    });
    return true;
  } catch {
    return false;
  }
};
