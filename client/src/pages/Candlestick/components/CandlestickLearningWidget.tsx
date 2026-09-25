import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { useCandlestickLearningStore } from '@/store/useCandlestickLearningStore';
import { GraduationCap, AlertTriangle, CheckCircle2, BookOpen } from 'lucide-react';

export const CandlestickLearningWidget: React.FC = () => {
  const { topics, selectedTopic, setSelectedTopic } = useCandlestickLearningStore();

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-base font-bold font-display text-foreground">Candlestick Educational Learning Hub</h2>
        </div>
        <Badge variant="purple">LEARNING MODE</Badge>
      </div>

      {/* Topic Switcher Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {topics.map((t) => (
          <button
            key={t.name}
            onClick={() => setSelectedTopic(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              t.name === selectedTopic.name
                ? 'bg-purple-600 text-foreground shadow-lg shadow-purple-500/20'
                : 'bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Active Educational Card Content */}
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground font-display flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{selectedTopic.name} Setup</span>
            </h3>
            <Badge variant="emerald">{selectedTopic.bias}</Badge>
          </div>
          <p className="text-muted-foreground">{selectedTopic.meaning}</p>
          <p className="text-muted-foreground text-[11px] font-mono">Market Behavior: {selectedTopic.typicalBehavior}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Confirmation Rules */}
          <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border/50 space-y-2">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px] flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Strict Confirmation Rules:</span>
            </span>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              {selectedTopic.confirmationRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes & Warnings */}
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-2">
            <span className="font-bold text-red-600 dark:text-red-400 uppercase tracking-wider text-[11px] flex items-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Common Mistakes & Risk Warning:</span>
            </span>
            <ul className="space-y-1 text-muted-foreground list-disc list-inside">
              {selectedTopic.commonMistakes.map((mistake, idx) => (
                <li key={idx}>{mistake}</li>
              ))}
            </ul>
            <p className="text-red-600 dark:text-red-400 text-[10px] pt-1 font-bold">{selectedTopic.riskWarnings}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
