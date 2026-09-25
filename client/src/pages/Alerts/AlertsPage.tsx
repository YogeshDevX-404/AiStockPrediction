import React, { useEffect } from 'react';
import { AlertRuleCard } from './components/AlertRuleCard';
import { useAlertStore } from '@/store/useAlertStore';
import { Button } from '@/components/buttons/Button';
import { Bell, Plus, History, Settings, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const { rules, fetchRulesAndHistory } = useAlertStore();

  useEffect(() => {
    fetchRulesAndHistory();
  }, [fetchRulesAndHistory]);

  const activeRulesCount = rules.filter((r) => r.isEnabled).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Smart Alert & Event Trigger Engine</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {activeRulesCount} RULES ACTIVE
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Configure multi-condition triggers for Price Targets, RSI Technicians, AI Predictions, and Breaking News.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="accent" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={() => navigate('/alerts/create')}>
            Create Smart Alert Rule
          </Button>
          <Button variant="glass" size="md" leftIcon={<History className="w-4 h-4 text-purple-600 dark:text-purple-400" />} onClick={() => navigate('/alerts/history')}>
            Audit Log
          </Button>
        </div>
      </div>

      {/* Alert Rules Stream */}
      <div className="space-y-3">
        {rules.map((rule) => (
          <AlertRuleCard key={rule.id} rule={rule} />
        ))}
      </div>
    </div>
  );
};
