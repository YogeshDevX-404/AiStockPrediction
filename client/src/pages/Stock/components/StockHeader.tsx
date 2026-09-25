import React from 'react';
import { Button } from '@/components/buttons/Button';
import { Badge } from '@/components/ui/Badge';
import { Star, Plus, Share2, GitCompare, Building2, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { StockQuote } from '@/types';

export interface StockHeaderProps {
  quote: StockQuote;
  onOpenTrade: () => void;
}

export const StockHeader: React.FC<StockHeaderProps> = ({ quote, onOpenTrade }) => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Stock page URL copied to clipboard!');
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 border-border/50 rounded-[28px] bg-[#070b1a]/90">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-blue-500 to-purple-600 flex items-center justify-center font-mono font-black text-xl text-foreground shadow-xl shadow-emerald-500/20 shrink-0">
          {quote.symbol.slice(0, 2)}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-black text-foreground font-display">{quote.symbol}</h1>
            <Badge variant="emerald">{quote.exchange || 'NASDAQ'}</Badge>
            <Badge variant="purple">{quote.currency || 'USD'}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {quote.name} • {quote.sector || 'Technology'} ({quote.industry || 'Semiconductors'})
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="glass"
          size="sm"
          leftIcon={<Star className="w-4 h-4 text-amber-500 dark:text-amber-400" />}
          onClick={() => toast.success(`Added ${quote.symbol} to active Watchlist!`)}
        >
          Watchlist
        </Button>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={onOpenTrade}
        >
          Add to Portfolio
        </Button>

        <Button
          variant="glass"
          size="sm"
          leftIcon={<Share2 className="w-4 h-4 text-blue-400" />}
          onClick={handleShare}
        >
          Share
        </Button>

        <Button
          variant="glass"
          size="sm"
          leftIcon={<GitCompare className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
          onClick={() => toast.success(`Comparison matrix opened for ${quote.symbol}`)}
        >
          Compare
        </Button>
      </div>
    </div>
  );
};
