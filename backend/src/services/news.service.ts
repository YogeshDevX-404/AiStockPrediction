import { MockNewsProvider } from './news/MockNewsProvider';
import { NewsArticleItem } from './news/INewsProvider';

const userBookmarks: string[] = ['n1'];

export const getNewsArticlesService = async (category?: string, symbol?: string): Promise<NewsArticleItem[]> => {
  const provider = new MockNewsProvider();
  return provider.fetchArticles(category, symbol);
};

export const getNewsArticleByIdService = async (id: string): Promise<NewsArticleItem | null> => {
  const articles = await getNewsArticlesService();
  return articles.find((a) => a.id === id) || articles[0];
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

export const getBookmarksService = async (): Promise<NewsArticleItem[]> => {
  const articles = await getNewsArticlesService();
  return articles.filter((a) => userBookmarks.includes(a.id));
};

export const addBookmarkService = async (articleId: string): Promise<boolean> => {
  if (!userBookmarks.includes(articleId)) {
    userBookmarks.push(articleId);
  }
  return true;
};

export const removeBookmarkService = async (articleId: string): Promise<boolean> => {
  const idx = userBookmarks.indexOf(articleId);
  if (idx !== -1) {
    userBookmarks.splice(idx, 1);
  }
  return true;
};
