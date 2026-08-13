import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { History, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CopilotHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const history = [
    { id: 'h1', query: 'Analyze NVDA breakout potential', date: '2026-08-01 10:15', confidence: 91.5, agents: 5 },
    { id: 'h2', query: 'Evaluate TSLA risk profile', date: '2026-07-31 16:30', confidence: 88.0, agents: 4 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Multi-Agent Conversation Audit Trail</h1>
          </div>
          <p className="text-xs text-slate-400">Execution history logging agent pipeline dispatches and synthesis confidence scores.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/copilot')}>
          Copilot Hub
        </Button>
      </div>

      <GlassCard className="p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">User Query</th>
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold">Agents Engaged</th>
                <th className="pb-3 font-semibold text-right font-sans">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white font-sans">{h.query}</td>
                  <td className="py-3 text-slate-300">{h.date}</td>
                  <td className="py-3 text-purple-300 font-bold">{h.agents} Specialized Agents</td>
                  <td className="py-3 text-right font-sans font-bold">
                    <Badge variant="emerald">{h.confidence}% CONFIDENCE</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
