import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useAnalysisHistoryStore } from '@/store/useAnalysisHistoryStore';
import { useImageAnalysisStore } from '@/store/useImageAnalysisStore';
import { History, Eye, Trash2, ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AnalysisHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, fetchHistory, deleteHistoryRecord } = useAnalysisHistoryStore();
  const { runAnalysis } = useImageAnalysisStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">AI Vision Screenshot Analysis Audit Log</h1>
          </div>
          <p className="text-xs text-muted-foreground">Historical archive of scanned chart screenshots, OCR detections, and AI signal predictions.</p>
        </div>

        <Button variant="primary" size="md" onClick={() => navigate('/analysis/upload')}>
          Upload New Chart
        </Button>
      </div>

      <GlassCard className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/50 text-muted-foreground uppercase font-mono">
              <tr>
                <th className="pb-3 font-semibold">Screenshot File</th>
                <th className="pb-3 font-semibold">Ticker</th>
                <th className="pb-3 font-semibold">Timeframe</th>
                <th className="pb-3 font-semibold">Signal</th>
                <th className="pb-3 font-semibold">Confidence</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold text-right font-sans">Timestamp</th>
                <th className="pb-3 font-semibold text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-foreground/5">
                  <td className="py-3 font-bold text-foreground flex items-center space-x-2">
                    <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span className="truncate max-w-[160px] font-sans">{item.imageName}</span>
                  </td>
                  <td className="py-3 font-extrabold text-emerald-600 dark:text-emerald-400">{item.ticker}</td>
                  <td className="py-3 text-muted-foreground">{item.timeframe}</td>
                  <td className="py-3 font-sans">
                    <Badge variant={item.signal === 'BUY' ? 'emerald' : 'purple'}>{item.signal}</Badge>
                  </td>
                  <td className="py-3 font-bold text-purple-600 dark:text-purple-400">{item.confidenceScore}%</td>
                  <td className="py-3 text-muted-foreground font-sans">{item.riskLevel}</td>
                  <td className="py-3 text-right text-muted-foreground font-sans">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-sans">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => navigate('/analysis')}
                        className="p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground cursor-pointer"
                        title="View Analysis"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteHistoryRecord(item.id)}
                        className="p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-red-600 dark:text-red-400 hover:text-red-300 cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
