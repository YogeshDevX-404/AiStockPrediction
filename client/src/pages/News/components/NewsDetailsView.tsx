import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { NewsArticle, NewsApi } from '@/services/api/newsApi';
import { Sparkles, ArrowLeft, ExternalLink, LineChart, AlertTriangle } from 'lucide-react';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { useNewsStore } from '@/store/useNewsStore';

export const NewsDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark } = useBookmarkStore();

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const storeArticles = useNewsStore.getState().articles;
    const existingArticle = storeArticles.find((a) => a.id === id);
    
    if (existingArticle) {
      setArticle(existingArticle);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      NewsApi.getArticleById(id)
        .then((data) => {
          if (data && data.title) {
            setArticle(data);
          } else {
            setError(true);
          }
        })
        .catch(() => setError(true))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-24">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Loading AI Synthesis...</span>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-24 max-w-lg mx-auto text-center">
        <AlertTriangle className="w-10 h-10 text-amber-500" />
        <h2 className="text-foreground text-xl font-bold font-display">News Article Not Found</h2>
        <p className="text-muted-foreground text-sm">This article may have expired from the live feed or could not be loaded.</p>
        <Button variant="primary" size="md" onClick={() => navigate('/news')} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Market News
        </Button>
      </div>
    );
  }

  const isBookmarked = bookmarks.some((b) => b.id === article.id);
  const safeSymbols = Array.isArray(article.relatedSymbols) ? article.relatedSymbols : [];
  const safeSectors = Array.isArray(article.relatedSectors) ? article.relatedSectors : [];
  const safeDate = article.publishedAt ? new Date(article.publishedAt).toLocaleString() : 'Recent';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/news')}>
        Back to News Feed
      </Button>

      <GlassCard glow className="p-8 border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-[#0a0e24] to-[#060914] space-y-6">
        {/* Header */}
        <div className="space-y-3 border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={article.sentiment === 'BULLISH' ? 'emerald' : article.sentiment === 'BEARISH' ? 'red' : 'purple'}>
                {article.sentiment || 'NEUTRAL'}
              </Badge>
              {article.marketImpact && (
                <Badge variant="emerald">IMPACT: {article.marketImpact}</Badge>
              )}
              <span className="text-xs text-muted-foreground font-mono">{article.source || 'Financial News'}</span>
            </div>

            <Button variant="glass" size="sm" onClick={() => toggleBookmark(article)}>
              {isBookmarked ? 'Bookmarked' : 'Bookmark Article'}
            </Button>
          </div>

          <h1 className="text-2xl font-black text-foreground font-display leading-tight">{article.title || 'Market News'}</h1>
          <span className="text-xs text-muted-foreground font-mono">Published: {safeDate}</span>
        </div>

        {/* AI Synthesis Summary Box */}
        {article.summary && (
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-sm font-bold text-foreground font-display">AI Financial Synthesis Executive Summary</h2>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">{article.summary}</p>
          </div>
        )}

        {/* Detailed Body Text */}
        {(article.detailedBody || article.summary) && (
          <div className="space-y-3 text-xs text-muted-foreground leading-relaxed font-sans">
            <h2 className="text-sm font-bold text-foreground font-display">Article Deep Dive</h2>
            <p className="whitespace-pre-line">{article.detailedBody || article.summary}</p>
          </div>
        )}

        {/* Impacted Tickers & Sectors */}
        {(safeSymbols.length > 0 || safeSectors.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/50 pt-4 text-xs">
            {safeSymbols.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Impacted Asset Symbols:</span>
                <div className="flex flex-wrap gap-2">
                  {safeSymbols.map((sym) => (
                    <button
                      key={sym}
                      onClick={() => navigate(`/stocks/${sym}`)}
                      className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono font-bold hover:bg-emerald-500/30 transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <LineChart className="w-3.5 h-3.5 mr-1" />
                      <span>${sym}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {safeSectors.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Associated Industry Sectors:</span>
                <div className="flex flex-wrap gap-2">
                  {safeSectors.map((sec) => (
                    <span key={sec} className="px-3 py-1 rounded-xl bg-foreground/5 text-muted-foreground font-bold">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* External Link Footer */}
        {article.url && article.url !== '#' && (
          <div className="flex justify-end pt-2">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline"
            >
              <span>Read Original Publisher Source</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
