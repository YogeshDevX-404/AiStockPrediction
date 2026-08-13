import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { DetectedCandlestick } from '@/services/api/candlestickApi';
import { formatCurrency } from '@/utils/cn';
import { Sparkles, Zap, CheckCircle2, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CandlestickCardProps {
  candlestick: DetectedCandlestick;
  isPrimary?: boolean;
}

export const CandlestickCard: React.FC<CandlestickCardProps> = ({ candlestick, isPrimary = false }) => {
  const navigate = useNavigate();

  return (
    <GlassCard
      glow={isPrimary}
      className={`p-6 space-y-5 transition-all ${
        isPrimary
          ? 'border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-[#090f24] to-[#050814]'
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black text-white font-display">{candlestick.patternName}</h2>
              {isPrimary && <Badge variant="purple">PRIMARY CANDLE</Badge>}
              <Badge variant="emerald">{candlestick.type} CANDLE</Badge>
            </div>
            <p className="text-xs text-slate-400">Target Symbol: {candlestick.symbol} • Neural Conviction Engine</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xl font-black text-emerald-400 font-display flex items-center justify-end">
            <Zap className="w-4 h-4 mr-1" /> {candlestick.bias}
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Directional Bias</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-0.5">
          <span className="text-[10px] text-purple-300 font-bold uppercase">Neural Confidence</span>
          <div className="text-2xl font-black text-purple-400 font-display">{candlestick.confidenceScore}%</div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1">
            <div className="bg-purple-400 h-full" style={{ width: `${candlestick.confidenceScore}%` }} />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-0.5">
          <span className="text-[10px] text-emerald-300 font-bold uppercase">Target Price</span>
          <div className="text-xl font-black text-emerald-400 font-display">{formatCurrency(candlestick.targetPrice)}</div>
          <p className="text-[10px] text-emerald-400">Resistance Zone</p>
        </div>

        <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-0.5">
          <span className="text-[10px] text-red-300 font-bold uppercase">Stop Loss</span>
          <div className="text-xl font-black text-red-400 font-display">{formatCurrency(candlestick.stopLoss)}</div>
          <p className="text-[10px] text-red-400">Support Level</p>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Entry Zone</span>
          <div className="text-sm font-extrabold text-white font-mono">{candlestick.entryZone}</div>
          <p className="text-[10px] text-slate-400">Optimal Range</p>
        </div>
      </div>

      {/* Rationale Drivers */}
      <div className="space-y-1.5 text-xs border-t border-white/10 pt-3">
        <span className="font-bold text-white uppercase tracking-wider text-[11px]">Pattern Rationale Drivers:</span>
        <div className="space-y-1 text-slate-300">
          {candlestick.rationale.map((reason, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end space-x-3 pt-1">
        <Button
          variant="glass"
          size="sm"
          leftIcon={<LineChart className="w-4 h-4 text-blue-400" />}
          onClick={() => navigate(`/stocks/${candlestick.symbol}`)}
        >
          View Ticker Chart
        </Button>
      </div>
    </GlassCard>
  );
};
