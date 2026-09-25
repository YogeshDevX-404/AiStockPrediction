import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { useAdminStore } from '@/store/useAdminStore';
import { Button } from '@/components/buttons/Button';
import { Settings, ToggleLeft, ToggleRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { flags, fetchAdminData, toggleFlag } = useAdminStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Feature Flags & System Announcements</h1>
          </div>
          <p className="text-xs text-muted-foreground">Toggle experimental beta features and publish system-wide maintenance banners.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin')}>
          Console Dashboard
        </Button>
      </div>

      <GlassCard className="p-6 space-y-4 text-xs">
        <h2 className="text-sm font-bold text-foreground font-display border-b border-border/50 pb-3">Active Feature Flags</h2>
        <div className="space-y-3">
          {flags.map((flag) => (
            <div key={flag.id} className="p-4 rounded-2xl bg-foreground/5 border border-border/50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground font-display">{flag.name}</h3>
                <p className="text-muted-foreground text-[11px] font-mono">{flag.key} • {flag.description}</p>
              </div>
              <button onClick={() => toggleFlag(flag.id)} className="cursor-pointer">
                {flag.isEnabled ? (
                  <ToggleRight className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-muted-foreground" />
                )}
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
