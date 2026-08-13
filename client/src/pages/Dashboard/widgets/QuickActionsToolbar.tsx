import React, { useState } from 'react';
import { Button } from '@/components/buttons/Button';
import { Plus, Bell, Camera, Bot, Star } from 'lucide-react';
import { NewAlertModal } from '@/components/modals/NewAlertModal';
import { QuickTradeModal } from '@/components/modals/QuickTradeModal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const QuickActionsToolbar: React.FC = () => {
  const navigate = useNavigate();
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  return (
    <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
      <div className="space-y-0.5">
        <h3 className="text-sm font-bold text-white font-display">Trader Quick Actions</h3>
        <p className="text-[11px] text-slate-400">Launch orders, alerts, vision AI, or ask co-pilot</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setTradeModalOpen(true)}
        >
          Add Position
        </Button>
        <Button
          variant="glass"
          size="sm"
          leftIcon={<Star className="w-4 h-4 text-amber-400" />}
          onClick={() => navigate(ROUTES.WATCHLIST)}
        >
          Create Watchlist
        </Button>
        <Button
          variant="glass"
          size="sm"
          leftIcon={<Bell className="w-4 h-4 text-purple-400" />}
          onClick={() => setAlertModalOpen(true)}
        >
          New Alert
        </Button>
        <Button
          variant="glass"
          size="sm"
          leftIcon={<Camera className="w-4 h-4 text-emerald-400" />}
          onClick={() => navigate(ROUTES.STOCK_DETAILS)}
        >
          Analyze Screenshot
        </Button>
        <Button
          variant="accent"
          size="sm"
          leftIcon={<Bot className="w-4 h-4 text-white" />}
          onClick={() => navigate(ROUTES.CHAT)}
        >
          Ask AI
        </Button>
      </div>

      <QuickTradeModal isOpen={tradeModalOpen} onClose={() => setTradeModalOpen(false)} />
      <NewAlertModal isOpen={alertModalOpen} onClose={() => setAlertModalOpen(false)} />
    </div>
  );
};
