import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useScannerStore } from '@/store/useScannerStore';
import { Radar, Sparkles, TrendingUp, Zap, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const ScannerPage: React.FC = () => {
  const navigate = useNavigate();
  const { radars, fetchRadars } = useScannerStore();

  useEffect(() => {
    fetchRadars();
  }, [fetchRadars]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Radar className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Real-Time Market Scanner Radar</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              RADAR ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">Automated radar tracking Top Gainers, Volume Surges, Breakout Formations, and Oversold Reversals.</p>
        </div>

        <Button variant="glass" size="md" onClick={() => navigate('/screener')}>
          Open Multi-Filter Screener
        </Button>
      </div>

      {/* Radar Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {radars.map((radar) => (
          <GlassCard key={radar.title} className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h2 className="text-sm font-bold text-white font-display">{radar.title}</h2>
              </div>
              <Badge variant="purple">{radar.tickers.length} TICKERS</Badge>
            </div>

            <div className="space-y-2">
              {radar.tickers.map((t) => (
                <div
                  key={t.symbol}
                  onClick={() => navigate(`/stocks/${t.symbol}`)}
                  className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-white font-mono">{t.symbol}</span>
                      <Badge variant="emerald">{t.signal}</Badge>
                    </div>
                    <span className="text-[11px] text-purple-300 font-bold">AI Score: {t.aiScore}</span>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-white font-mono">${t.price}</div>
                    <span className={`text-xs font-bold ${t.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {t.changePercent >= 0 ? '+' : ''}{t.changePercent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
