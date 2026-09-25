import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useSavedScreenerStore } from '@/store/useSavedScreenerStore';
import { History, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ScannerHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, fetchPresetsAndHistory } = useSavedScreenerStore();

  useEffect(() => {
    fetchPresetsAndHistory();
  }, [fetchPresetsAndHistory]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Scanner Execution Audit History</h1>
          </div>
          <p className="text-xs text-muted-foreground">Historical record of executed technical and fundamental market scans.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/screener')}>
          Back to Screener
        </Button>
      </div>

      <GlassCard className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-border/50 text-muted-foreground uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">Scan Type</th>
                <th className="pb-3 font-semibold">Matched Tickers Count</th>
                <th className="pb-3 font-semibold text-right font-sans">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-foreground/5">
                  <td className="py-3 font-bold text-foreground font-sans">{h.scanType}</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400 font-bold">{h.matchedCount} Candidates</td>
                  <td className="py-3 text-right text-muted-foreground font-sans">{new Date(h.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
