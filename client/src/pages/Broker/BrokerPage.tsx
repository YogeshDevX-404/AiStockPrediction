import React, { useEffect } from 'react';
import { AggregatedBalanceWidget } from './components/AggregatedBalanceWidget';
import { BrokerAccountCard } from './components/BrokerAccountCard';
import { BrokerOrderTerminal } from './components/BrokerOrderTerminal';
import { useBrokerStore } from '@/store/useBrokerStore';
import { Button } from '@/components/buttons/Button';
import { Building2, Link, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BrokerPage: React.FC = () => {
  const navigate = useNavigate();
  const { accounts, fetchAccounts } = useBrokerStore();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Multi-Broker API Sync & Gateway</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SMART ROUTING ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">Connect Zerodha Kite, Upstox, Alpaca, & IBKR accounts with unified portfolio balances and live order dispatching.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="accent" size="sm" leftIcon={<Link className="w-4 h-4" />} onClick={() => navigate('/broker-sync/accounts')}>
            Link Account
          </Button>
          <Button variant="glass" size="sm" leftIcon={<Send className="w-4 h-4 text-purple-400" />} onClick={() => navigate('/broker-sync/terminal')}>
            Order Terminal
          </Button>
        </div>
      </div>

      <AggregatedBalanceWidget accounts={accounts} />

      {/* Grid: Linked Accounts & Order Terminal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Connected Broker Accounts</h2>
          {accounts.map((a) => (
            <BrokerAccountCard key={a.id} account={a} />
          ))}
        </div>

        <BrokerOrderTerminal />
      </div>
    </div>
  );
};
