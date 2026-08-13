import React from 'react';
import { useWatchlistStore } from '@/store/useWatchlistStore';
import { Button } from '@/components/buttons/Button';
import { Pin, Star, Plus, Layers } from 'lucide-react';

export interface WatchlistTabsBarProps {
  onOpenCreateModal: () => void;
}

export const WatchlistTabsBar: React.FC<WatchlistTabsBarProps> = ({ onOpenCreateModal }) => {
  const { watchlists, activeWatchlistId, setActiveWatchlistId, togglePinWatchlist } = useWatchlistStore();

  return (
    <div className="glass-panel p-2 rounded-2xl border border-white/10 flex items-center justify-between gap-2 overflow-x-auto select-none">
      <div className="flex items-center space-x-1 min-w-max">
        {watchlists.map((wl) => {
          const isActive = wl.id === activeWatchlistId;
          return (
            <div
              key={wl.id}
              onClick={() => setActiveWatchlistId(wl.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{wl.name}</span>
              {wl.isPinned && <Pin className="w-3 h-3 text-amber-400 shrink-0" />}
            </div>
          );
        })}
      </div>

      <Button
        variant="glass"
        size="sm"
        className="shrink-0 text-xs"
        leftIcon={<Plus className="w-4 h-4 text-emerald-400" />}
        onClick={onOpenCreateModal}
      >
        New List
      </Button>
    </div>
  );
};
