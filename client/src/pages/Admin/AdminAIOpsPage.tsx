import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminAIOpsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">AI Operations & Inference Telemetry</h1>
          </div>
          <p className="text-xs text-slate-400">Monitor model latency, Copilot tool calls, Vision OCR execution speed, and token consumption.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin')}>
          Console Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <GlassCard className="p-5 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Avg Inference Latency</span>
          <div className="text-3xl font-black text-emerald-400 font-display">420ms</div>
        </GlassCard>
        <GlassCard className="p-5 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Model Accuracy Rating</span>
          <div className="text-3xl font-black text-purple-400 font-display">92.4%</div>
        </GlassCard>
        <GlassCard className="p-5 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Copilot Tool Dispatches</span>
          <div className="text-3xl font-black text-blue-400 font-display">45,120</div>
        </GlassCard>
      </div>
    </div>
  );
};
