import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useReportStore } from '@/store/useReportStore';
import { FileText, ArrowLeft, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StrategyReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const { report, fetchReport } = useReportStore();

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">AI Strategy Executive Report</h1>
            <Badge variant="emerald">OVERFITTING RISK: {report.overfittingRisk}</Badge>
          </div>
          <p className="text-xs text-slate-400">Automated AI evaluation auditing strategy strengths, weaknesses, and optimization suggestions.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/strategy')}>
          Strategy Hub
        </Button>
      </div>

      <GlassCard glow className="p-6 space-y-6 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-card to-emerald-950/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white font-display">Executive Summary Digest</h2>
            <p className="text-xs text-slate-300">{report.executiveSummary}</p>
          </div>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] block">Key Strategy Strengths</span>
            {report.strengths.map((s, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{s}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] block">Identified Weaknesses & Risk</span>
            {report.weaknesses.map((w, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{w}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-2 text-xs border-t border-white/10 pt-4">
          <span className="font-bold text-white uppercase tracking-wider text-[11px] block">AI Optimization Guidance:</span>
          {report.recommendations.map((rec, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-200">
              💡 {rec}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
