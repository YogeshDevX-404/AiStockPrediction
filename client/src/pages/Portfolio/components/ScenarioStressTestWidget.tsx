import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { StressScenarioItem } from '@/services/api/portfolioApi';
import { formatCurrency } from '@/utils/cn';
import { Activity, AlertTriangle, TrendingUp } from 'lucide-react';

export interface ScenarioStressTestWidgetProps {
  scenarios: StressScenarioItem[];
}

export const ScenarioStressTestWidget: React.FC<ScenarioStressTestWidgetProps> = ({ scenarios }) => {
  return (
    <GlassCard className="p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold text-white font-display">Macro Stress Test Scenarios</h2>
        </div>
        <Badge variant="purple">MONTE CARLO SIMULATION</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {scenarios.map((sc) => {
          const isNegative = sc.impactPercent < 0;
          return (
            <div key={sc.name} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-sans">{sc.name}</span>
                <Badge variant={sc.severity === 'HIGH' ? 'red' : 'purple'}>{sc.severity}</Badge>
              </div>
              <div className="flex justify-between items-center text-xs font-mono pt-1">
                <span className="text-slate-400">Impact Shift:</span>
                <span className={`font-extrabold ${isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
                  {isNegative ? '' : '+'}{sc.impactPercent}% ({formatCurrency(sc.estimatedPnl)})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
