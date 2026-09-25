import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { DetectedPattern } from '@/services/api/patternApi';
import { Sparkles, TrendingUp, CheckCircle2, LineChart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface PatternPanelProps {
  pattern: DetectedPattern;
  isPrimary?: boolean;
}

export const PatternPanel: React.FC<PatternPanelProps> = ({ pattern, isPrimary = false }) => {
  const navigate = useNavigate();

  return (
    <GlassCard
      glow={isPrimary}
      className={`p-6 space-y-5 transition-all ${
        isPrimary
          ? 'border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-[#090f24] to-[#050814]'
          : 'border-border/50 bg-foreground/5'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black text-foreground font-display">{pattern.patternName}</h2>
              {isPrimary && <Badge variant="purple">PRIMARY PATTERN</Badge>}
              <Badge variant="emerald">{pattern.category}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Timeframe: {pattern.timeframe} • Strength: {pattern.strength}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-display flex items-center justify-end">
            <Zap className="w-4 h-4 mr-1" /> {pattern.direction}
          </span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Directional Bias</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-0.5">
          <span className="text-[10px] text-purple-300 font-bold uppercase">Pattern Confidence</span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-display">{pattern.confidenceScore}%</div>
          <div className="w-full bg-foreground/10 h-1 rounded-full overflow-hidden mt-1">
            <div className="bg-purple-400 h-full" style={{ width: `${pattern.confidenceScore}%` }} />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-0.5">
          <span className="text-[10px] text-emerald-300 font-bold uppercase">Projected Breakout Move</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-display">+{pattern.targetMovePercent}%</div>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Target Upside</p>
        </div>

        <div className="p-3 rounded-2xl bg-foreground/5 border border-border/50 space-y-0.5 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Signal Reliability</span>
          <div className="text-xl font-extrabold text-foreground font-mono">HIGH CONVICTION</div>
          <p className="text-[10px] text-muted-foreground">Volume Confirmed</p>
        </div>
      </div>

      {/* Rationale Timeline */}
      <div className="space-y-1.5 text-xs border-t border-border/50 pt-3">
        <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Pattern Rationale Drivers:</span>
        <div className="space-y-1 text-muted-foreground">
          {pattern.rationale.map((reason, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="flex justify-end space-x-3 pt-1">
        <Button
          variant="glass"
          size="sm"
          leftIcon={<LineChart className="w-4 h-4 text-blue-400" />}
          onClick={() => navigate(`/stocks/${pattern.symbol}`)}
        >
          View Chart & Ticker
        </Button>
      </div>
    </GlassCard>
  );
};
