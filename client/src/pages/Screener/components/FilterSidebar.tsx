import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Select } from '@/components/inputs/Select';
import { Button } from '@/components/buttons/Button';
import { useScreenerStore } from '@/store/useScreenerStore';
import { Filter, RefreshCw, Sparkles } from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const { criteria, setCriteria, resetCriteria, runScreening, isScreening } = useScreenerStore();

  return (
    <GlassCard className="space-y-5 p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-bold text-white font-display">Multi-Criteria Filters</h2>
        </div>
        <button onClick={resetCriteria} className="text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer">
          Reset All
        </button>
      </div>

      <div className="space-y-4 text-xs">
        {/* RSI Range Filter */}
        <div className="space-y-1">
          <label className="text-slate-400 font-bold text-[11px] flex justify-between">
            <span>RSI Range</span>
            <span className="text-purple-400 font-mono">{criteria.minRsi} - {criteria.maxRsi}</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="100"
              value={criteria.minRsi}
              onChange={(e) => setCriteria({ minRsi: parseInt(e.target.value) })}
              className="w-full accent-purple-500"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={criteria.maxRsi}
              onChange={(e) => setCriteria({ maxRsi: parseInt(e.target.value) })}
              className="w-full accent-purple-500"
            />
          </div>
        </div>

        {/* Max P/E Ratio Filter */}
        <div className="space-y-1">
          <label className="text-slate-400 font-bold text-[11px] flex justify-between">
            <span>Max P/E Ratio</span>
            <span className="text-emerald-400 font-mono">&lt; {criteria.maxPe}</span>
          </label>
          <input
            type="range"
            min="5"
            max="120"
            value={criteria.maxPe}
            onChange={(e) => setCriteria({ maxPe: parseInt(e.target.value) })}
            className="w-full accent-emerald-500"
          />
        </div>

        {/* Industry Sector Filter */}
        <Select
          label="Industry Sector"
          value={criteria.sector}
          onChange={(e) => setCriteria({ sector: e.target.value })}
          options={[
            { value: 'All', label: 'All Sectors' },
            { value: 'Technology', label: 'Technology' },
            { value: 'Semiconductors', label: 'Semiconductors' },
            { value: 'Automotive', label: 'Automotive & EV' },
            { value: 'Energy', label: 'Energy & Renewables' },
          ]}
        />

        {/* Golden Cross Checkbox */}
        <label className="flex items-center space-x-2 text-slate-300 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={criteria.goldenCrossOnly}
            onChange={(e) => setCriteria({ goldenCrossOnly: e.target.checked })}
            className="w-4 h-4 rounded accent-purple-600"
          />
          <span className="font-bold">Require Golden Cross (50 EMA &gt; 200 EMA)</span>
        </label>
      </div>

      <Button
        variant="accent"
        size="md"
        className="w-full"
        isLoading={isScreening}
        leftIcon={<RefreshCw className="w-4 h-4" />}
        onClick={runScreening}
      >
        Execute Screener
      </Button>
    </GlassCard>
  );
};
