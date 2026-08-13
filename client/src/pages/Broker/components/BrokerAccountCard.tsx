import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { LinkedBrokerItem } from '@/services/api/brokerApi';
import { formatCurrency } from '@/utils/cn';
import { Building2, CheckCircle2 } from 'lucide-react';

export interface BrokerAccountCardProps {
  account: LinkedBrokerItem;
}

export const BrokerAccountCard: React.FC<BrokerAccountCardProps> = ({ account }) => {
  return (
    <GlassCard className="p-5 space-y-4 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-display">{account.brokerName}</h2>
            <span className="text-[11px] text-slate-400 font-mono">{account.accountName} ({account.accountNumber})</span>
          </div>
        </div>

        <Badge variant={account.status === 'CONNECTED' ? 'emerald' : 'red'}>
          {account.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-white/5 space-y-0.5">
          <span className="text-[10px] text-slate-400 block font-sans">Cash Balance</span>
          <span className="font-extrabold text-white">{formatCurrency(account.cashBalance)}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 space-y-0.5">
          <span className="text-[10px] text-slate-400 block font-sans">Buying Power</span>
          <span className="font-extrabold text-purple-400">{formatCurrency(account.buyingPower)}</span>
        </div>
      </div>
    </GlassCard>
  );
};
