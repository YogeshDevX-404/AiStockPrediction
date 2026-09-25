import React from 'react';
import { UploadWorkspace } from './components/UploadWorkspace';
import { AnalysisResultView } from './components/AnalysisResultView';
import { Button } from '@/components/buttons/Button';
import { History, Eye, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AnalysisPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">AI Vision Screenshot Chart Analysis</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              VISION v4.0 ACTIVE
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Upload chart screenshots from TradingView, Zerodha, Groww, or Upstox for automated neural pattern & OCR recognition.</p>
        </div>

        <Button
          variant="glass"
          size="md"
          leftIcon={<History className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
          onClick={() => navigate('/analysis/history')}
        >
          Scan History Log
        </Button>
      </div>

      {/* Upload & Workspace Module */}
      <UploadWorkspace />

      {/* Analysis Result Output View */}
      <AnalysisResultView />
    </div>
  );
};
