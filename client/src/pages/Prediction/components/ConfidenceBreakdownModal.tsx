import React from 'react';
import { Modal } from '@/components/modals/Modal';
import { useConfidenceStore } from '@/store/useConfidenceStore';

export interface ConfidenceBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
}

export const ConfidenceBreakdownModal: React.FC<ConfidenceBreakdownModalProps> = ({
  isOpen,
  onClose,
  symbol,
}) => {
  const { breakdown } = useConfidenceStore();

  const data = breakdown || {
    totalConfidence: 94.8,
    technicalWeight: 34.0,
    trendWeight: 24.5,
    volumeWeight: 19.8,
    volatilityWeight: 16.5,
  };

  const weights = [
    { label: 'Technical Indicators (RSI, MACD, Moving Averages)', score: data.technicalWeight, max: 35, color: '#10b981' },
    { label: 'Market Trend Structure (Higher Highs / Lows)', score: data.trendWeight, max: 25, color: '#3b82f6' },
    { label: 'Institutional Volume & Dark Pool Flow', score: data.volumeWeight, max: 20, color: '#8b5cf6' },
    { label: 'Volatility & ATR Risk Factor', score: data.volatilityWeight, max: 20, color: '#f59e0b' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Neural Confidence Breakdown: ${symbol}`}>
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-center space-y-1">
          <span className="text-[10px] text-purple-300 font-bold uppercase">Aggregate Model Probability Score</span>
          <div className="text-4xl font-black text-purple-400 font-display">{data.totalConfidence}%</div>
        </div>

        <div className="space-y-3 pt-2">
          {weights.map((w) => (
            <div key={w.label} className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>{w.label}</span>
                <span className="font-bold font-mono">{w.score} / {w.max} pts</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(w.score / w.max) * 100}%`, backgroundColor: w.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
