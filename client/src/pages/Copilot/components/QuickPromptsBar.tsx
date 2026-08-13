import React from 'react';
import { Button } from '@/components/buttons/Button';
import { PieChart, TrendingUp, Eye, GitCompare, Cpu, Upload } from 'lucide-react';

export interface QuickPromptsBarProps {
  onSelectPrompt: (prompt: string) => void;
}

export const QuickPromptsBar: React.FC<QuickPromptsBarProps> = ({ onSelectPrompt }) => {
  const prompts = [
    { label: 'Analyze Portfolio', icon: <PieChart className="w-3.5 h-3.5 text-emerald-400" />, prompt: 'Analyze my current portfolio allocation and risk exposure.' },
    { label: "Today's Market", icon: <TrendingUp className="w-3.5 h-3.5 text-blue-400" />, prompt: "Summarize today's market momentum and top breakout stocks." },
    { label: 'Review Watchlist', icon: <Eye className="w-3.5 h-3.5 text-purple-400" />, prompt: 'Review my active watchlist and identify breakout candidates.' },
    { label: 'Compare NVDA vs AAPL', icon: <GitCompare className="w-3.5 h-3.5 text-amber-400" />, prompt: 'Compare NVDA vs AAPL fundamentals and AI conviction scores.' },
    { label: 'Explain Prediction', icon: <Cpu className="w-3.5 h-3.5 text-purple-400" />, prompt: 'Explain the technical drivers behind NVDA STRONG_BUY prediction.' },
  ];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-1 select-none">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Quick Prompts:</span>
      {prompts.map((p) => (
        <button
          key={p.label}
          onClick={() => onSelectPrompt(p.prompt)}
          className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer"
        >
          {p.icon}
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  );
};
