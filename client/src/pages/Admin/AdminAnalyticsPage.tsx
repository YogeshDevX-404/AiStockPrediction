import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Platform Growth & Usage Analytics</h1>
          </div>
          <p className="text-xs text-muted-foreground">Daily Active Users (DAU), Monthly Active Users (MAU), prediction request throughput.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin')}>
          Console Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <GlassCard className="p-5 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Daily Active Users (DAU)</span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">1,420</div>
        </GlassCard>
        <GlassCard className="p-5 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Monthly Active Users (MAU)</span>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-display">18,450</div>
        </GlassCard>
        <GlassCard className="p-5 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">AI Predictions Served</span>
          <div className="text-3xl font-black text-blue-400 font-display">142,800</div>
        </GlassCard>
      </div>
    </div>
  );
};
