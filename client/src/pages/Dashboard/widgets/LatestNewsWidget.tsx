import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Newspaper, ExternalLink, Clock } from 'lucide-react';

export const LatestNewsWidget: React.FC = () => {
  const news = [
    {
      id: 'n1',
      title: 'NVIDIA Announces Quantum Acceleration Partnership',
      category: 'SEMICONDUCTORS',
      time: '15m ago',
      sentiment: 'BULLISH',
    },
    {
      id: 'n2',
      title: 'Federal Reserve Signals Potential Interest Rate Stabilization',
      category: 'MACRO',
      time: '1h ago',
      sentiment: 'BULLISH',
    },
    {
      id: 'n3',
      title: 'Asian Supply Chain Reports Minor Quarterly Delay',
      category: 'FOUNDRY',
      time: '2h ago',
      sentiment: 'BEARISH',
    },
  ];

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Newspaper className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold font-display text-white">Latest Financial News</h2>
        </div>
        <Badge variant="blue">NLP SENTIMENT</Badge>
      </div>

      <div className="space-y-3 text-xs">
        {news.map((item) => (
          <div key={item.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1.5 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase">{item.category} • {item.time}</span>
              <Badge variant={item.sentiment === 'BULLISH' ? 'emerald' : 'red'} className="text-[9px]">
                {item.sentiment}
              </Badge>
            </div>
            <h3 className="font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer">{item.title}</h3>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
