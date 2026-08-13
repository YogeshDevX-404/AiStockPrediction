import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { Newspaper, ExternalLink, GitCompare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/utils/cn';

export interface StockRelatedNewsProps {
  news: any[];
}

export const StockRelatedNews: React.FC<StockRelatedNewsProps> = ({ news }) => {
  const navigate = useNavigate();

  const related = [
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: 178.50, change: '+3.40%' },
    { symbol: 'TSM', name: 'Taiwan Semiconductor', price: 172.10, change: '+2.15%' },
    { symbol: 'INTC', name: 'Intel Corporation', price: 28.40, change: '-3.85%' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Related Stocks Card */}
      <GlassCard className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
          <GitCompare className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold font-display text-white">Related Industry Peers</h2>
        </div>

        <div className="space-y-2 text-xs">
          {related.map((peer) => (
            <div
              key={peer.symbol}
              onClick={() => navigate(`/stocks/${peer.symbol}`)}
              className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div>
                <span className="font-bold text-white font-mono">{peer.symbol}</span>
                <div className="text-[10px] text-slate-400">{peer.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">{formatCurrency(peer.price)}</div>
                <div className={`font-bold ${peer.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {peer.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Symbol Recent News Card */}
      <GlassCard className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
          <Newspaper className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold font-display text-white">Recent News & NLP Sentiment</h2>
        </div>

        <div className="space-y-2.5 text-xs">
          {news.map((item) => (
            <div key={item.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>{item.source} • {item.publishedAt}</span>
                <Badge variant="emerald" className="text-[9px]">{item.sentiment}</Badge>
              </div>
              <h3 className="font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer">{item.title}</h3>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
