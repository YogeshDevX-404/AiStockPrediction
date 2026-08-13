import React from 'react';
import { useDrawingToolStore, DrawingToolType } from '@/store/useDrawingToolStore';
import {
  MousePointer,
  TrendingUp,
  Minus,
  MoveVertical,
  Square,
  Circle,
  Type,
  ArrowRight,
  Percent,
  Trash2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ChartDrawingToolbar: React.FC = () => {
  const { activeTool, setActiveTool, clearDrawings } = useDrawingToolStore();

  const tools: { id: DrawingToolType; label: string; icon: React.ReactNode }[] = [
    { id: 'CURSOR', label: 'Crosshair Pointer', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'TRENDLINE', label: 'Trend Line', icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
    { id: 'HORIZONTAL', label: 'Horizontal Support Line', icon: <Minus className="w-4 h-4 text-purple-400" /> },
    { id: 'VERTICAL', label: 'Vertical Time Line', icon: <MoveVertical className="w-4 h-4 text-blue-400" /> },
    { id: 'RECTANGLE', label: 'Support / Resistance Zone', icon: <Square className="w-4 h-4 text-amber-400" /> },
    { id: 'CIRCLE', label: 'Circle Focus Area', icon: <Circle className="w-4 h-4 text-cyan-400" /> },
    { id: 'TEXT', label: 'Chart Note Text', icon: <Type className="w-4 h-4 text-slate-300" /> },
    { id: 'FIBONACCI', label: 'Fibonacci Retracement', icon: <Percent className="w-4 h-4 text-pink-400" /> },
  ];

  return (
    <div className="w-11 glass-panel border-r border-white/10 flex flex-col items-center py-2 space-y-1 select-none shrink-0">
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTool(t.id)}
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            activeTool === t.id
              ? 'bg-primary text-white shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title={t.label}
        >
          {t.icon}
        </button>
      ))}

      <div className="w-6 border-b border-white/10 my-1" />

      <button
        onClick={() => {
          clearDrawings();
          toast.success('Cleared all drawn chart objects.');
        }}
        className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
        title="Clear Chart Drawings"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
