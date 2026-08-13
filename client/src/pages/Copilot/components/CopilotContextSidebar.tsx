import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { useCopilotContextStore } from '@/store/useCopilotContextStore';
import { Layers, PieChart, Eye, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CopilotContextSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { currentSymbol, selectedPortfolio, selectedWatchlist } = useCopilotContextStore();

  return (
    <div className="space-y-4">
      <GlassCard className="space-y-3 p-4">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider font-display">Active Copilot Context</h2>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Current Ticker</span>
            </span>
            <span
              className="font-extrabold text-emerald-400 font-mono cursor-pointer hover:underline"
              onClick={() => navigate(`/stocks/${currentSymbol}`)}
            >
              {currentSymbol}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <PieChart className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active Portfolio</span>
            </span>
            <span className="font-bold text-white font-mono">{selectedPortfolio}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5 text-purple-400" />
              <span>Watchlist Focus</span>
            </span>
            <span className="font-bold text-white font-mono">{selectedWatchlist}</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-4 space-y-2 text-xs">
        <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Supported Query Capabilities</h3>
        <ul className="space-y-1 text-slate-400 list-disc list-inside text-[11px]">
          <li>"Analyze my portfolio diversification"</li>
          <li>"Compare NVDA vs AAPL"</li>
          <li>"Summarize today's news for TSLA"</li>
          <li>"Explain RSI oversold signal"</li>
        </ul>
      </GlassCard>
    </div>
  );
};
