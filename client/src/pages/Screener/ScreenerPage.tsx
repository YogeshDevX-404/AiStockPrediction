import React from 'react';
import { FilterSidebar } from './components/FilterSidebar';
import { ScreenerResultsTable } from './components/ScreenerResultsTable';
import { useScreenerStore } from '@/store/useScreenerStore';
import { Button } from '@/components/buttons/Button';
import { Filter, Radar, Bookmark, History, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ScreenerPage: React.FC = () => {
  const navigate = useNavigate();
  const { candidates } = useScreenerStore();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Filter className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">AI Stock Screener & Filter Engine</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              MULTI-PARAM SCANNER
            </span>
          </div>
          <p className="text-xs text-slate-400">Discover high-probability opportunities across technical indicators, valuation ratios, and AI conviction scores.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="accent" size="md" leftIcon={<Radar className="w-4 h-4" />} onClick={() => navigate('/scanner')}>
            Radar Scanner
          </Button>
          <Button variant="glass" size="md" leftIcon={<Bookmark className="w-4 h-4 text-purple-400" />} onClick={() => navigate('/scanner/saved')}>
            Saved Presets
          </Button>
          <Button variant="ghost" size="md" leftIcon={<History className="w-4 h-4 text-slate-400" />} onClick={() => navigate('/scanner/history')}>
            History
          </Button>
        </div>
      </div>

      {/* Main Workspace (Filter Sidebar + Results Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>
        <div className="lg:col-span-3">
          <ScreenerResultsTable candidates={candidates} />
        </div>
      </div>
    </div>
  );
};
