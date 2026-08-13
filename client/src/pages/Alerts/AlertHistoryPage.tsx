import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useAlertStore } from '@/store/useAlertStore';
import { History, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AlertHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, fetchRulesAndHistory } = useAlertStore();

  useEffect(() => {
    fetchRulesAndHistory();
  }, [fetchRulesAndHistory]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Alert Execution Audit Log</h1>
          </div>
          <p className="text-xs text-slate-400">Audit trail recording past alert triggers and delivery dispatch statuses.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/alerts')}>
          Back to Alerts
        </Button>
      </div>

      <GlassCard className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">Symbol</th>
                <th className="pb-3 font-semibold">Alert Rule Type</th>
                <th className="pb-3 font-semibold">Triggered Value</th>
                <th className="pb-3 font-semibold">Delivery Status</th>
                <th className="pb-3 font-semibold text-right font-sans">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white">${item.symbol}</td>
                  <td className="py-3 font-sans text-purple-300 font-bold">{item.alertType}</td>
                  <td className="py-3 text-emerald-400 font-bold">{item.triggerValue}</td>
                  <td className="py-3 font-sans font-bold">
                    <span className="flex items-center text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {item.deliveryStatus}
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-400 font-sans">{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
