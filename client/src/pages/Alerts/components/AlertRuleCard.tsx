import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { AlertRule } from '@/services/api/alertsApi';
import { useAlertStore } from '@/store/useAlertStore';
import { Bell, Trash2, Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface AlertRuleCardProps {
  rule: AlertRule;
}

export const AlertRuleCard: React.FC<AlertRuleCardProps> = ({ rule }) => {
  const navigate = useNavigate();
  const { toggleRule, deleteRule } = useAlertStore();

  return (
    <GlassCard className="p-4 space-y-3 hover:border-border transition-all flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div
          onClick={() => navigate(`/stocks/${rule.symbol}`)}
          className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 font-extrabold flex items-center justify-center cursor-pointer hover:bg-purple-500/30 transition-all font-mono"
        >
          ${rule.symbol}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-foreground font-display">{rule.triggerCondition}</h3>
            <Badge variant={rule.priority === 'URGENT' ? 'red' : 'purple'}>{rule.priority}</Badge>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">Triggered {rule.triggerCount} times • Created {rule.createdAt}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => toggleRule(rule.id)}
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title={rule.isEnabled ? 'Disable Alert' : 'Enable Alert'}
        >
          {rule.isEnabled ? (
            <ToggleRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <ToggleLeft className="w-6 h-6 text-muted-foreground" />
          )}
        </button>
        <button
          onClick={() => deleteRule(rule.id)}
          className="p-1 text-muted-foreground hover:text-red-600 dark:text-red-400 transition-colors cursor-pointer"
          title="Delete Rule"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </GlassCard>
  );
};
