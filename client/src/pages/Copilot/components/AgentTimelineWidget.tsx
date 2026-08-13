import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { AgentExecutionStep } from '@/services/api/copilotApi';
import { Cpu, CheckCircle2 } from 'lucide-react';

export interface AgentTimelineWidgetProps {
  timeline: AgentExecutionStep[];
}

export const AgentTimelineWidget: React.FC<AgentTimelineWidgetProps> = ({ timeline }) => {
  return (
    <GlassCard className="p-5 space-y-4">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
        <Cpu className="w-5 h-5 text-purple-400" />
        <h2 className="text-base font-bold text-white font-display">Multi-Agent Reasoning Timeline & Pipeline</h2>
      </div>

      <div className="space-y-3">
        {timeline.map((step, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-purple-300 font-display">{step.agentName}</span>
              <Badge variant="emerald">{step.confidence}% CONFIDENCE</Badge>
            </div>
            <p className="text-white font-mono">{step.action}</p>
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{step.reasoning}</span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
