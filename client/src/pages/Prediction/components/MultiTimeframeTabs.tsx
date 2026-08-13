import React from 'react';
import { usePredictionStore } from '@/store/usePredictionStore';

export const MultiTimeframeTabs: React.FC = () => {
  const { activeTimeframeFilter, setActiveTimeframeFilter } = usePredictionStore();
  const timeframes = ['15m', '30m', '1H', '4H', '1D', '1W', '1M'];

  return (
    <div className="glass-panel p-2 rounded-2xl border border-white/10 flex items-center justify-between gap-2 overflow-x-auto select-none">
      <div className="flex items-center space-x-1 min-w-max">
        <span className="text-[10px] text-slate-400 font-bold uppercase px-3">Horizon Filter:</span>
        {timeframes.map((tf) => {
          const isActive = tf === activeTimeframeFilter;
          return (
            <button
              key={tf}
              onClick={() => setActiveTimeframeFilter(tf)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
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
