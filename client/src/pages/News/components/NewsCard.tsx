import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { NewsArticle } from '@/services/api/newsApi';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { Bookmark, BookmarkCheck, ExternalLink, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark } = useBookmarkStore();
  const isBookmarked = bookmarks.some((b) => b.id === article.id);

  return (
    <GlassCard className="p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
      <div className="space-y-3">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant={article.sentiment === 'BULLISH' ? 'emerald' : article.sentiment === 'BEARISH' ? 'red' : 'purple'}>
              {article.sentiment} ({article.sentimentScore}%)
            </Badge>
            <span className="text-[10px] text-slate-400 font-mono">{article.source}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(article);
            }}
            className="text-slate-400 hover:text-amber-400 transition-colors p-1 cursor-pointer"
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Title & Summary */}
        <div className="space-y-1 cursor-pointer" onClick={() => navigate(`/news/${article.id}`)}>
          <h3 className="text-base font-extrabold text-white font-display hover:text-emerald-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{article.summary}</p>
        </div>
      </div>

      {/* Footer Tags & Actions */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <div className="flex flex-wrap gap-1.5">
          {article.relatedSymbols.map((sym) => (
            <span
              key={sym}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/stocks/${sym}`);
              }}
              className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-400 font-mono font-bold text-[10px] cursor-pointer"
            >
              ${sym}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-slate-500 font-mono">{new Date(article.publishedAt).toLocaleDateString()}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-slate-400 hover:text-white transition-colors"
            title="Open Original Source"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
};
