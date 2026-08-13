import { create } from 'zustand';
import { NewsArticle, NewsApi } from '@/services/api/newsApi';
import { toast } from 'react-hot-toast';

interface BookmarkState {
  bookmarks: NewsArticle[];
  isLoading: boolean;
  fetchBookmarks: () => Promise<void>;
  toggleBookmark: (article: NewsArticle) => Promise<void>;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [
    {
      id: 'n1',
      title: 'NVIDIA Surges +4.2% as Next-Gen Blackwell Ultra AI Chips Enter Mass Production',
      summary: 'NVIDIA Corporation announced full production scaling for its Blackwell Ultra GPU architecture across TSMC 4nm foundries.',
      source: 'Bloomberg Technology',
      url: 'https://bloomberg.com/news/nvda-blackwell-scaling',
      publishedAt: '2026-03-25T14:15:00Z',
      sentiment: 'BULLISH',
      sentimentScore: 94.8,
      marketImpact: 'VERY_HIGH',
      relatedSymbols: ['NVDA', 'TSM'],
      relatedSectors: ['Semiconductors'],
      category: 'Companies',
    },
  ],
  isLoading: false,

  fetchBookmarks: async () => {
    try {
      set({ isLoading: true });
      const bookmarks = await NewsApi.getBookmarks();
      set({ bookmarks, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  toggleBookmark: async (article) => {
    const exists = get().bookmarks.some((b) => b.id === article.id);
    if (exists) {
      set((state) => ({ bookmarks: state.bookmarks.filter((b) => b.id !== article.id) }));
      await NewsApi.removeBookmark(article.id);
      toast.success('Removed article from bookmarks.');
    } else {
      set((state) => ({ bookmarks: [...state.bookmarks, article] }));
      await NewsApi.addBookmark(article.id);
      toast.success('Bookmarked news article!');
    }
  },
}));
