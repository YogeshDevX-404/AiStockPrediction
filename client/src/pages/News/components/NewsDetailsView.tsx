import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { NewsArticle, NewsApi } from '@/services/api/newsApi';
import { Sparkles, ArrowLeft, ExternalLink, Bookmark, CheckCircle2, AlertTriangle, LineChart } from 'lucide-react';
import { useBookmarkStore } from '@/store/useBookmarkStore';

export const NewsDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark } = useBookmarkStore();

  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    if (id) {
      NewsApi.getArticleById(id).then(setArticle);
    }
  }, [id]);

  if (!article) return null;

  const isBookmarked = bookmarks.some((b) => b.id === article.id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/news')}>
        Back to News Feed
      </Button>

      <GlassCard glow className="p-8 border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-[#0a0e24] to-[#060914] space-y-6">
        {/* Header */}
        <div className="space-y-3 border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={article.sentiment === 'BULLISH' ? 'emerald' : 'purple'}>{article.sentiment}</Badge>
              <Badge variant="emerald">IMPACT: {article.marketImpact}</Badge>
              <span className="text-xs text-slate-400 font-mono">{article.source}</span>
            </div>

            <Button variant="glass" size="sm" onClick={() => toggleBookmark(article)}>
              {isBookmarked ? 'Bookmarked' : 'Bookmark Article'}
            </Button>
          </div>

          <h1 className="text-2xl font-black text-white font-display leading-tight">{article.title}</h1>
          <span className="text-xs text-slate-500 font-mono">Published: {new Date(article.publishedAt).toLocaleString()}</span>
        </div>

        {/* AI Synthesis Summary Box */}
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-sm font-bold text-white font-display">AI Financial Synthesis Executive Summary</h2>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">{article.summary}</p>
        </div>

        {/* Detailed Body Text */}
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
          <h2 className="text-sm font-bold text-white font-display">Article Deep Dive</h2>
          <p className="whitespace-pre-line">{article.detailedBody || article.summary}</p>
        </div>

        {/* Impacted Tickers & Sectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">Impacted Asset Symbols:</span>
            <div className="flex flex-wrap gap-2">
              {article.relatedSymbols.map((sym) => (
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

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">Associated Industry Sectors:</span>
            <div className="flex flex-wrap gap-2">
              {article.relatedSectors.map((sec) => (
                <span key={sec} className="px-3 py-1 rounded-xl bg-white/5 text-slate-300 font-bold">
                  {sec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* External Link Footer */}
        <div className="flex justify-end pt-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs text-purple-400 font-bold hover:underline"
          >
            <span>Read Original Publisher Source</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </GlassCard>
    </div>
  );
};
