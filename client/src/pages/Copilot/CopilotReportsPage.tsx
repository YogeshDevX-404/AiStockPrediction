import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { FileText, ArrowLeft, Download, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CopilotReportsPage: React.FC = () => {
  const navigate = useNavigate();

  const reports = [
    { id: 'rep-1', title: 'Executive Morning Market Briefing', reportType: 'MORNING_BRIEF', date: '2026-08-01', summary: 'Pre-market overview of tech equities, macro indicators, and earnings catalysts.' },
    { id: 'rep-2', title: 'Portfolio Health & Value-at-Risk Snapshot', reportType: 'PORTFOLIO_HEALTH', date: '2026-07-31', summary: 'Sharpe ratio (1.85), beta exposure (1.12), and sector allocation breakdown.' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">AI Executive Report Generator & Catalog</h1>
          </div>
          <p className="text-xs text-slate-400">Automated multi-agent financial briefings, portfolio health snapshots, and stock deep-dives.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/copilot')}>
          Copilot Hub
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((r) => (
          <GlassCard key={r.id} className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white font-display">{r.title}</h2>
              <Badge variant="purple">{r.reportType}</Badge>
            </div>
            <p className="text-xs text-slate-300">{r.summary}</p>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <span className="text-slate-400 font-mono">{r.date}</span>
              <button className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 font-bold cursor-pointer">
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
