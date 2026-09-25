import React, { useState, useEffect } from 'react';
import { PortfolioSummaryCards } from './components/PortfolioSummaryCards';
import { HoldingsTable } from './components/HoldingsTable';
import { AIPortfolioHealth } from './components/AIPortfolioHealth';
import { DividendTrackerWidget } from './components/DividendTrackerWidget';
import { SectorAllocationWidget } from './components/SectorAllocationWidget';
import { AddHoldingModal } from './modals/AddHoldingModal';
import { ConfirmDeleteHoldingModal } from './modals/ConfirmDeleteHoldingModal';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { HoldingItem } from '@/services/api/portfolioApi';
import { Button } from '@/components/buttons/Button';
import { History, Plus, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, fetchPortfolio } = usePortfolioStore();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingHolding, setEditingHolding] = useState<HoldingItem | null>(null);
  const [deletingHolding, setDeletingHolding] = useState<HoldingItem | null>(null);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleOpenEdit = (holding: HoldingItem) => {
    setEditingHolding(holding);
    setAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setEditingHolding(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-emerald-500/20 bg-gradient-to-r from-emerald-950/30 via-card to-purple-950/20">
        <div>
          <h1 className="text-2xl font-black font-display text-foreground">Portfolio Command Center</h1>
          <p className="text-xs text-muted-foreground">Track active holdings, asset allocation, passive dividend yield, and AI rebalancing.</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="glass"
            size="md"
            leftIcon={<History className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
            onClick={() => navigate('/portfolio/history')}
          >
            Transaction Log
          </Button>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setAddModalOpen(true)}
          >
            Add Holding
          </Button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <PortfolioSummaryCards />

      {/* Main Holdings Table */}
      <HoldingsTable
        holdings={items}
        onOpenAddModal={() => setAddModalOpen(true)}
        onEditHolding={handleOpenEdit}
        onDeleteHolding={(h) => setDeletingHolding(h)}
      />

      {/* AI Portfolio Health & Co-Pilot */}
      <AIPortfolioHealth />

      {/* Sector Allocation & Dividend Tracker Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectorAllocationWidget />
        <DividendTrackerWidget />
      </div>

      {/* Modals */}
      <AddHoldingModal
        isOpen={addModalOpen}
        onClose={handleCloseModal}
        initialHolding={editingHolding}
      />
      <ConfirmDeleteHoldingModal
        isOpen={!!deletingHolding}
        onClose={() => setDeletingHolding(null)}
        holding={deletingHolding}
      />
    </div>
  );
};
