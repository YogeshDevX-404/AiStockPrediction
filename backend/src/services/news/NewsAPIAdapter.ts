import { INewsProvider, NewsArticleItem } from './INewsProvider';

export class NewsAPIAdapter implements INewsProvider {
  readonly name = 'NewsAPILiveAdapter';

  async fetchArticles(_category?: string, _symbol?: string): Promise<NewsArticleItem[]> {
    return [];
  }
}
