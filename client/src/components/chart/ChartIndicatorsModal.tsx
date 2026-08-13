import React, { useState } from 'react';
import { Modal } from '../modals/Modal';
import { useIndicatorStore } from '@/store/useIndicatorStore';
import { Badge } from '../ui/Badge';
import { Search, Check } from 'lucide-react';

export interface ChartIndicatorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChartIndicatorsModal: React.FC<ChartIndicatorsModalProps> = ({ isOpen, onClose }) => {
  const { indicators, toggleIndicator } = useIndicatorStore();
  const [search, setSearch] = useState('');

  const filtered = indicators.filter((ind) =>
    ind.name.toLowerCase().includes(search.toLowerCase()) || ind.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Technical Indicators & Overlays">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative flex items-center border-b border-white/10 pb-2">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search indicators (e.g. RSI, EMA, Bollinger...)"
            className="w-full bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        {/* Indicators List */}
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {filtered.map((ind) => (
            <div
              key={ind.id}
              onClick={() => toggleIndicator(ind.id)}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                ind.enabled
                  ? 'bg-purple-500/10 border-purple-500/40 text-white'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ind.color }} />
                <div>
                  <div className="font-bold text-xs">{ind.name}</div>
                  <div className="text-[10px] text-slate-500">{ind.category}</div>
                </div>
              </div>

              {ind.enabled && <Check className="w-4 h-4 text-emerald-400" />}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
