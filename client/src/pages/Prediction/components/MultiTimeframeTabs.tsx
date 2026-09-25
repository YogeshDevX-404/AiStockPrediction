import React from 'react';
import { usePredictionStore } from '@/store/usePredictionStore';

export const MultiTimeframeTabs: React.FC = () => {
  const { activeTimeframeFilter, setActiveTimeframeFilter } = usePredictionStore();
  const timeframes = ['15m', '30m', '1H', '4H', '1D', '1W', '1M'];

  return (
    <div className="glass-panel p-2 rounded-2xl border border-border/50 flex items-center justify-between gap-2 overflow-x-auto select-none">
      <div className="flex items-center space-x-1 min-w-max">
        <span className="text-[10px] text-muted-foreground font-bold uppercase px-3">Horizon Filter:</span>
        {timeframes.map((tf) => {
          const isActive = tf === activeTimeframeFilter;
          return (
            <button
              key={tf}
              onClick={() => setActiveTimeframeFilter(tf)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-foreground shadow-lg shadow-emerald-500/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              {tf}
            </button>
          );
        })}
      </div>
    </div>
  );
};
