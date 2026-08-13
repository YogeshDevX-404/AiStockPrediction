import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useAgentStore } from '@/store/useAgentStore';
import { useMemoryStore } from '@/store/useMemoryStore';
import { Settings, ArrowLeft, Bot, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CopilotSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { agents, toggleAgent } = useAgentStore();
  const { learningMode, setLearningMode } = useMemoryStore();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Copilot Pro Settings & Agent Capabilities</h1>
          </div>
          <p className="text-xs text-slate-400">Configure active specialized agents, learning coach preferences, and memory retention.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/copilot')}>
          Copilot Hub
        </Button>
      </div>

      {/* Learning Mode Toggle */}
      <GlassCard className="p-5 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-white font-display">Interactive Financial Learning Coach Mode</h2>
          <p className="text-xs text-slate-400">Include educational breakdowns on technical indicators and portfolio construction.</p>
        </div>
        <button
          onClick={() => setLearningMode(!learningMode)}
          className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${learningMode ? 'bg-purple-600' : 'bg-white/10'}`}
        >
          <div className={`w-4 h-4 rounded-full bg-white transition-all ${learningMode ? 'translate-x-6' : ''}`} />
        </button>
      </GlassCard>

      {/* Specialized Agent Toggles */}
      <GlassCard className="p-5 space-y-4">
        <h2 className="text-base font-bold text-white font-display border-b border-white/10 pb-3">Specialized Domain Agent Activation Matrix</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {agents.map((ag) => (
            <div key={ag.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white">{ag.name}</span>
              </div>
              <button
                onClick={() => toggleAgent(ag.id)}
                className={`w-10 h-5 rounded-full p-0.5 transition-all cursor-pointer ${ag.enabled ? 'bg-emerald-500' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${ag.enabled ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
