import React from 'react';
import { MultiAgentChatBox } from './components/MultiAgentChatBox';
import { AgentTimelineWidget } from './components/AgentTimelineWidget';
import { AgentContributionCard } from './components/AgentContributionCard';
import { useCopilotProStore } from '@/store/useCopilotProStore';
import { Button } from '@/components/buttons/Button';
import { Bot, Layout, FileText, Settings, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CopilotPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentResponse } = useCopilotProStore();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">AI Trading Copilot Pro</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              15 SPECIALIZED AGENTS ONLINE
            </span>
          </div>
          <p className="text-xs text-slate-400">Enterprise multi-agent financial intelligence platform synthesizing quantitative research, technical signals, and risk analysis.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="accent" size="sm" leftIcon={<Layout className="w-4 h-4" />} onClick={() => navigate('/copilot/workspace')}>
            Workspace
          </Button>
          <Button variant="glass" size="sm" leftIcon={<FileText className="w-4 h-4 text-purple-400" />} onClick={() => navigate('/copilot/reports')}>
            AI Reports
          </Button>
          <Button variant="glass" size="sm" leftIcon={<Settings className="w-4 h-4 text-emerald-400" />} onClick={() => navigate('/copilot/settings')}>
            Settings
          </Button>
        </div>
      </div>

      <AgentContributionCard
        agents={currentResponse.agentsParticipated}
        overallConfidence={currentResponse.overallConfidence}
      />

      {/* Grid: Multi-Agent Chat & Agent Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MultiAgentChatBox />
        <AgentTimelineWidget timeline={currentResponse.executionTimeline} />
      </div>
    </div>
  );
};
