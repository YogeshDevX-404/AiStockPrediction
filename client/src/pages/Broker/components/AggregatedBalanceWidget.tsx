import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { LinkedBrokerItem } from '@/services/api/brokerApi';
import { formatCurrency } from '@/utils/cn';
import { Wallet } from 'lucide-react';

export interface AggregatedBalanceWidgetProps {
  accounts: LinkedBrokerItem[];
}

export const AggregatedBalanceWidget: React.FC<AggregatedBalanceWidgetProps> = ({ accounts }) => {
  const totalCash = accounts.reduce((acc, b) => acc + b.cashBalance, 0);
  const totalBuyingPower = accounts.reduce((acc, b) => acc + b.buyingPower, 0);

  return (
    <GlassCard glow className="p-6 space-y-4 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-card to-emerald-950/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-foreground font-display">Aggregated Multi-Broker Portfolio</h2>
            <p className="text-xs text-muted-foreground">Consolidated balance across Zerodha, Upstox, Alpaca, & IBKR accounts</p>
          </div>
        </div>

        <Badge variant="emerald">{accounts.length} BROKERS LINKED</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Combined Cash Funds</span>
          <div className="text-2xl font-black text-foreground font-mono">{formatCurrency(totalCash)}</div>
        </div>

        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Combined Buying Power</span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">{formatCurrency(totalBuyingPower)}</div>
        </div>
      </div>
    </GlassCard>
  );
};
