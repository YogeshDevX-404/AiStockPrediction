import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { NewsArticle } from '@/services/api/newsApi';
import { Zap, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface BreakingNewsBannerProps {
  article: NewsArticle;
}

export const BreakingNewsBanner: React.FC<BreakingNewsBannerProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <GlassCard
      glow
      className="p-5 border-red-500/40 bg-gradient-to-r from-red-950/40 via-card to-purple-950/30 space-y-3 cursor-pointer hover:border-red-500/70 transition-all"
      onClick={() => navigate(`/news/${article.id}`)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="red" className="animate-pulse flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 mr-1 fill-red-400" /> BREAKING NEWS
          </Badge>
          <span className="text-[10px] text-muted-foreground font-mono">{new Date(article.publishedAt).toLocaleTimeString()}</span>
        </div>

        <Badge variant="purple">IMPACT: {article.marketImpact}</Badge>
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-black text-foreground font-display hover:text-red-600 dark:text-red-400 transition-colors">
          {article.title}
        </h2>
        <p className="text-xs text-muted-foreground line-clamp-2">{article.summary}</p>
      </div>

      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="flex items-center space-x-2">
          {article.relatedSymbols.map((sym) => (
            <span key={sym} className="px-2 py-0.5 rounded-lg bg-foreground/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[10px]">
              ${sym}
            </span>
          ))}
        </div>

        <span className="text-xs text-purple-600 dark:text-purple-400 font-bold flex items-center hover:underline">
          Read Full AI Synthesis <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </span>
      </div>
    </GlassCard>
  );
};
