import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Bot } from 'lucide-react';

export interface AgentContributionCardProps {
  agents: string[];
  overallConfidence: number;
}

export const AgentContributionCard: React.FC<AgentContributionCardProps> = ({ agents, overallConfidence }) => {
  return (
    <GlassCard glow className="p-5 space-y-4 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-card to-emerald-950/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold text-white font-display">Specialized Agent Entourage</h2>
        </div>

        <Badge variant="purple">{overallConfidence}% SYNTHESIS CONFIDENCE</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {agents.map((ag) => (
          <span key={ag} className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-xs font-bold text-slate-200">
            🤖 {ag}
          </span>
        ))}
      </div>
    </GlassCard>
  );
};
