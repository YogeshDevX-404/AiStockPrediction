import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { NewsCard } from './components/NewsCard';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { useNavigate } from 'react-router-dom';

export const NewsBookmarksPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookmarks, fetchBookmarks } = useBookmarkStore();

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <Bookmark className="w-6 h-6 text-amber-500 dark:text-amber-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Bookmarked News Library</h1>
          </div>
          <p className="text-xs text-muted-foreground">Personalized archive of saved financial news, earnings reports, and macroeconomic research.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/news')}>
          Back to News Feed
        </Button>
      </div>

      {bookmarks.length === 0 ? (
        <GlassCard className="p-10 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-muted-foreground mx-auto" />
          <h2 className="text-base font-bold text-foreground">No Bookmarked Articles Yet</h2>
          <p className="text-xs text-muted-foreground">Click the bookmark icon on any news card to save articles for offline reading.</p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};
