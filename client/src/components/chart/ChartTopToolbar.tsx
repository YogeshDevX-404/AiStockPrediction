import React, { useState } from 'react';
import { useChartStore } from '@/store/useChartStore';
import { useChartTimeframeStore, TimeframePeriod } from '@/store/useChartTimeframeStore';
import { ChartType } from './providers/IChartAdapter';
import { Dropdown } from '../ui/Dropdown';
import { SearchModal } from '../modals/SearchModal';
import { ChartIndicatorsModal } from './ChartIndicatorsModal';
import { ChartCompareModal } from './ChartCompareModal';
import { ChartSettingsModal } from './ChartSettingsModal';
import {
  Search,
  CandlestickChart,
  LineChart,
  BarChart2,
  Sliders,
  GitCompare,
  Maximize2,
  Minimize2,
  Camera,
  RefreshCw,
  Settings,
  Sparkles,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ChartTopToolbar: React.FC = () => {
  const { symbol, chartType, compareSymbol, isFullscreen, setChartType, toggleFullscreen } = useChartStore();
  const { activeTimeframe, setTimeframe } = useChartTimeframeStore();

  // Modal states
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [indicatorsModalOpen, setIndicatorsModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const timeframes: TimeframePeriod[] = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'];

  const chartTypeItems = [
    { label: 'Candlestick', icon: <CandlestickChart className="w-4 h-4 text-emerald-400" />, onClick: () => setChartType('CANDLESTICK') },
    { label: 'Line Chart', icon: <LineChart className="w-4 h-4 text-blue-400" />, onClick: () => setChartType('LINE') },
    { label: 'Area Chart', icon: <BarChart2 className="w-4 h-4 text-purple-400" />, onClick: () => setChartType('AREA') },
    { label: 'Bar Chart', icon: <BarChart2 className="w-4 h-4 text-amber-400" />, onClick: () => setChartType('BAR') },
    { label: 'Baseline', icon: <LineChart className="w-4 h-4 text-cyan-400" />, onClick: () => setChartType('BASELINE') },
  ];

  const handleExportScreenshot = () => {
    toast.success(`Chart screenshot exported for ${symbol}! Download starting...`);
  };

  return (
    <>
      <div className="glass-panel px-3 py-2 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 select-none">
        {/* Left Side: Symbol & Timeframe & Type */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Symbol Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl glass-panel hover:bg-white/10 border border-white/10 font-mono font-extrabold text-xs text-white cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span>{symbol}</span>
            {compareSymbol && <span className="text-purple-400 text-[10px]">vs {compareSymbol}</span>}
          </button>

          {/* Timeframe Pills */}
          <div className="hidden sm:flex items-center space-x-0.5 glass-panel p-1 rounded-xl text-xs">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                  activeTimeframe === tf ? 'bg-primary text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Dropdown */}
          <Dropdown
            trigger={
              <button className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl glass-panel hover:bg-white/10 text-xs text-slate-300 cursor-pointer">
                <CandlestickChart className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline font-semibold">{chartType}</span>
              </button>
            }
            items={chartTypeItems}
          />
        </div>

        {/* Right Side: Tools & Actions */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setIndicatorsModalOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl glass-panel hover:bg-white/10 text-xs text-slate-300 cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline font-bold">Indicators</span>
          </button>

          <button
            onClick={() => setCompareModalOpen(true)}
            className="p-2 rounded-xl glass-panel hover:bg-white/10 text-slate-300 cursor-pointer"
            title="Compare Overlay Symbol"
          >
            <GitCompare className="w-4 h-4 text-blue-400" />
          </button>

          <button
            onClick={handleExportScreenshot}
            className="p-2 rounded-xl glass-panel hover:bg-white/10 text-slate-300 cursor-pointer"
            title="Export Chart Image PNG"
          >
            <Camera className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl glass-panel hover:bg-white/10 text-slate-300 cursor-pointer"
            title="Toggle Fullscreen Mode"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setSettingsModalOpen(true)}
            className="p-2 rounded-xl glass-panel hover:bg-white/10 text-slate-300 cursor-pointer"
            title="Chart Display Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <ChartIndicatorsModal isOpen={indicatorsModalOpen} onClose={() => setIndicatorsModalOpen(false)} />
      <ChartCompareModal isOpen={compareModalOpen} onClose={() => setCompareModalOpen(false)} />
      <ChartSettingsModal isOpen={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
    </>
  );
};
