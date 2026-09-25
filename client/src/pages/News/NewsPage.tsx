import React, { useEffect } from 'react';
import { BreakingNewsBanner } from './components/BreakingNewsBanner';
import { NewsCard } from './components/NewsCard';
import { useNewsStore } from '@/store/useNewsStore';
import { Button } from '@/components/buttons/Button';
import { Search, Newspaper, Bookmark, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { articles, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, fetchArticles } = useNewsStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const categories = ['All', 'Markets', 'Companies', 'Crypto', 'Economy', 'Technology'];

  const breakingArticle = articles.find((a) => a.isBreaking) || articles[0];
  const regularArticles = articles.filter((a) => a.id !== breakingArticle?.id);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Newspaper className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">AI Financial News Intelligence</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              NLP SENTIMENT ENGINE
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Aggregated macro market news with FinBERT sentiment scoring & market impact evaluations.</p>
        </div>

        <Button
          variant="glass"
          size="md"
          leftIcon={<Bookmark className="w-4 h-4 text-amber-500 dark:text-amber-400" />}
          onClick={() => navigate('/news/bookmarks')}
        >
          Saved Bookmarks
        </Button>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md glass-panel border border-border/50 rounded-xl px-3 py-2 flex items-center">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news by ticker, headline, topic..."
            className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto select-none pb-1 sm:pb-0">
          {categories.map((cat) => {
            const isActive = cat === selectedCategory;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-foreground shadow-lg shadow-purple-500/20'
                    : 'bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Breaking News Hero Banner */}
      {breakingArticle && <BreakingNewsBanner article={breakingArticle} />}

      {/* News Cards Grid Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {regularArticles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
