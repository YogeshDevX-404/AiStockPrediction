import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useSavedScreenerStore } from '@/store/useSavedScreenerStore';
import { Bookmark, Play, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SavedScreenerPage: React.FC = () => {
  const navigate = useNavigate();
  const { presets, fetchPresetsAndHistory, deletePreset } = useSavedScreenerStore();

  useEffect(() => {
    fetchPresetsAndHistory();
  }, [fetchPresetsAndHistory]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <Bookmark className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Saved Screener Presets Library</h1>
          </div>
          <p className="text-xs text-muted-foreground">Custom technical & fundamental scanner presets saved for rapid execution.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/screener')}>
          Back to Screener
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {presets.map((p) => (
          <GlassCard key={p.id} className="p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground font-display">{p.name}</h2>
                {p.isPinned && <Badge variant="purple">PINNED</Badge>}
              </div>
              <p className="text-xs text-muted-foreground">{p.description}</p>
              <span className="text-[10px] text-muted-foreground font-mono">Created: {p.createdAt}</span>
            </div>

            <div className="flex items-center justify-between border-t border-border/50 pt-3">
              <Button
                variant="accent"
                size="sm"
                leftIcon={<Play className="w-3.5 h-3.5" />}
                onClick={() => navigate('/screener')}
              >
                Run Scan
              </Button>
              <button
                onClick={() => deletePreset(p.id)}
                className="text-muted-foreground hover:text-red-600 dark:text-red-400 p-1 cursor-pointer"
                title="Delete Preset"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
