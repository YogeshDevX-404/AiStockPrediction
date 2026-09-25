import React, { useState, useEffect } from 'react';
import { WatchlistTabsBar } from './components/WatchlistTabsBar';
import { AIWatchlistRadar } from './components/AIWatchlistRadar';
import { SmartWatchlistTable } from './components/SmartWatchlistTable';
import { CreateWatchlistModal } from './modals/CreateWatchlistModal';
import { WatchlistCompareModal } from './modals/WatchlistCompareModal';
import { AlertManagerDrawer } from './components/AlertManagerDrawer';
import { SearchModal } from '@/components/modals/SearchModal';
import { useWatchlistStore } from '@/store/useWatchlistStore';
import { Button } from '@/components/buttons/Button';
import { Bell, Sparkles, Plus, GitCompare } from 'lucide-react';

export const WatchlistPage: React.FC = () => {
  const { items, fetchWatchlists, fetchWatchlistItems, deleteItem } = useWatchlistStore();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [alertDrawerOpen, setAlertDrawerOpen] = useState(false);
  const [selectedAlertSymbol, setSelectedAlertSymbol] = useState('NVDA');

  useEffect(() => {
    fetchWatchlists();
    fetchWatchlistItems();
  }, [fetchWatchlists, fetchWatchlistItems]);

  const handleOpenAlertDrawer = (symbol: string) => {
    setSelectedAlertSymbol(symbol);
    setAlertDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black font-display text-foreground">AI Smart Watchlist Monitor</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              RADAR ACTIVE
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Continuous neural scanner tracking momentum, RSI breakouts, and volume anomalies.</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="glass"
            size="md"
            leftIcon={<GitCompare className="w-4 h-4 text-amber-500 dark:text-amber-400" />}
            onClick={() => setCompareModalOpen(true)}
          >
            Compare Tickers
          </Button>

          <Button
            variant="glass"
            size="md"
            leftIcon={<Bell className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
            onClick={() => handleOpenAlertDrawer('NVDA')}
          >
            Alert Manager
          </Button>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setSearchModalOpen(true)}
          >
            Add Ticker
          </Button>
        </div>
      </div>

      {/* Multi-Watchlist Tabs Bar */}
      <WatchlistTabsBar onOpenCreateModal={() => setCreateModalOpen(true)} />

      {/* AI Watchlist Radar Cards */}
      <AIWatchlistRadar />

      {/* Smart Watchlist Table */}
      <SmartWatchlistTable
        items={items}
        onOpenSearchModal={() => setSearchModalOpen(true)}
        onDeleteItem={(id) => deleteItem(id)}
        onOpenCompareModal={() => setCompareModalOpen(true)}
        onOpenAlertDrawer={handleOpenAlertDrawer}
      />

      {/* Modals */}
      <CreateWatchlistModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <WatchlistCompareModal isOpen={compareModalOpen} onClose={() => setCompareModalOpen(false)} />
      <AlertManagerDrawer
        isOpen={alertDrawerOpen}
        onClose={() => setAlertDrawerOpen(false)}
        defaultSymbol={selectedAlertSymbol}
      />
    </div>
  );
};
