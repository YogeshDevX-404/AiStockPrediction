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
        <div className="relative flex items-center border-b border-border/50 pb-2">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search indicators (e.g. RSI, EMA, Bollinger...)"
            className="w-full bg-transparent text-foreground text-xs placeholder:text-muted-foreground focus:outline-none"
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
                  ? 'bg-purple-500/10 border-purple-500/40 text-foreground'
                  : 'bg-foreground/5 border-border/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ind.color }} />
                <div>
                  <div className="font-bold text-xs">{ind.name}</div>
                  <div className="text-[10px] text-muted-foreground">{ind.category}</div>
                </div>
              </div>

              {ind.enabled && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
