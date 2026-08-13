import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useTradeStore } from '@/store/useTradeStore';
import { History, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PaperHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { trades, fetchTrades } = useTradeStore();

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-black font-display text-white">Paper Trade Audit Log & Performance</h1>
          </div>
          <p className="text-xs text-slate-400">Audit log recording realized P&L, entry/exit prices, and AI conviction agreement scores.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/paper-trading')}>
          Trading Hub
        </Button>
      </div>

      <GlassCard className="p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">Symbol</th>
                <th className="pb-3 font-semibold">Side</th>
                <th className="pb-3 font-semibold">Qty</th>
                <th className="pb-3 font-semibold">Entry Price</th>
                <th className="pb-3 font-semibold">Exit Price</th>
                <th className="pb-3 font-semibold">AI Conviction Score</th>
                <th className="pb-3 font-semibold text-right font-sans">Realized P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {trades.map((t) => (
                <tr key={t.id} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white">${t.symbol}</td>
                  <td className="py-3 font-sans">
                    <Badge variant={t.side === 'BUY' ? 'emerald' : 'red'}>{t.side}</Badge>
                  </td>
                  <td className="py-3 text-slate-300">{t.quantity}</td>
                  <td className="py-3 text-slate-300">${t.entryPrice}</td>
                  <td className="py-3 text-white font-bold">${t.exitPrice}</td>
                  <td className="py-3 font-sans">
                    <Badge variant="purple">{t.aiAgreementScore}% AI ALIGNED</Badge>
                  </td>
                  <td className="py-3 text-right font-sans font-bold">
                    <Badge variant="emerald">+${t.realizedPnl} (+{t.pnlPercent}%)</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
