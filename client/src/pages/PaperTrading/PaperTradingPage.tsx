import React, { useEffect } from 'react';
import { VirtualAccountCard } from './components/VirtualAccountCard';
import { OrderExecutionPanel } from './components/OrderExecutionPanel';
import { OpenPositionsTable } from './components/OpenPositionsTable';
import { usePaperTradingStore } from '@/store/usePaperTradingStore';
import { useOrderStore } from '@/store/useOrderStore';
import { Button } from '@/components/buttons/Button';
import { ShoppingCart, PieChart, History, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PaperTradingPage: React.FC = () => {
  const navigate = useNavigate();
  const { account, fetchAccount } = usePaperTradingStore();
  const { fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchAccount();
    fetchOrders();
  }, [fetchAccount, fetchOrders]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Paper Trading Simulation Platform</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              $10,000 VIRTUAL FUND
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Practice trading strategies risk-free with simulated order execution and AI conviction alignment.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="glass" size="sm" leftIcon={<PieChart className="w-4 h-4 text-purple-600 dark:text-purple-400" />} onClick={() => navigate('/paper-trading/portfolio')}>
            Holdings
          </Button>
          <Button variant="glass" size="sm" leftIcon={<History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />} onClick={() => navigate('/paper-trading/history')}>
            Trade History
          </Button>
          <Button variant="accent" size="sm" leftIcon={<Trophy className="w-4 h-4" />} onClick={() => navigate('/paper-trading/leaderboard')}>
            Leaderboard
          </Button>
        </div>
      </div>

      {/* Main Virtual Account Card */}
      <VirtualAccountCard account={account} />

      {/* Grid: Order Panel & Open Positions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderExecutionPanel />
        <OpenPositionsTable />
      </div>
    </div>
  );
};
