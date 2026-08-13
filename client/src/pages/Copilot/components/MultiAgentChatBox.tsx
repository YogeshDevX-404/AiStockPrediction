import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { useCopilotProStore } from '@/store/useCopilotProStore';
import { Send, Sparkles } from 'lucide-react';

export const MultiAgentChatBox: React.FC = () => {
  const { currentResponse, isLoading, dispatchQuery } = useCopilotProStore();
  const [prompt, setPrompt] = useState('Should I buy $NVDA?');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    await dispatchQuery(prompt);
  };

  return (
    <GlassCard className="p-6 space-y-6">
      {/* Response Box */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
          <div className="flex items-center space-x-2 text-purple-400 font-bold font-display">
            <Sparkles className="w-4 h-4" />
            <span>AI Copilot Pro Executive Synthesis</span>
          </div>
          <p className="text-white text-sm leading-relaxed">{currentResponse.executiveSummary}</p>

          <div className="pt-2 border-t border-white/10 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Empirical Evidence Sources:</span>
            <ul className="list-disc list-inside text-slate-300 space-y-0.5 font-mono">
              {currentResponse.evidenceSources.map((src, idx) => (
                <li key={idx}>{src}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Input Prompt Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 text-xs">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Copilot Pro (e.g. Analyze NVDA breakout, Evaluate TSLA risk...)"
          className="w-full glass-panel border border-white/10 rounded-xl px-4 py-3 text-white font-mono placeholder:text-slate-500 focus:outline-none"
        />
        <Button type="submit" variant="primary" size="md" isLoading={isLoading} leftIcon={<Send className="w-4 h-4" />}>
          Dispatch Query
        </Button>
      </form>
    </GlassCard>
  );
};
