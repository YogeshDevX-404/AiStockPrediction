import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { VirtualAccountSummary } from '@/services/api/paperApi';
import { formatCurrency } from '@/utils/cn';
import { Wallet, ShieldCheck, TrendingUp, Award } from 'lucide-react';

export interface VirtualAccountCardProps {
  account: VirtualAccountSummary;
}

export const VirtualAccountCard: React.FC<VirtualAccountCardProps> = ({ account }) => {
  return (
    <GlassCard glow className="p-6 space-y-6 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-card to-emerald-950/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white font-display">Virtual Paper Trading Account</h2>
            <p className="text-xs text-slate-400">Risk-Free Simulated Trading Engine ($10,000 Initial Fund)</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black text-emerald-400 font-display">{formatCurrency(account.portfolioValue)}</div>
          <Badge variant="emerald">+{account.overallPnlPercent}% OVERALL P&L</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Virtual Cash</span>
          <div className="text-xl font-black text-white font-mono">{formatCurrency(account.virtualCash)}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Buying Power</span>
          <div className="text-xl font-black text-purple-400 font-mono">{formatCurrency(account.buyingPower)}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Today's P&L</span>
          <div className="text-xl font-black text-emerald-400 font-mono">+{formatCurrency(account.todayPnl)}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Win Rate %</span>
          <div className="text-xl font-black text-emerald-400 font-mono">{account.winRate}%</div>
        </div>
      </div>
    </GlassCard>
  );
};
