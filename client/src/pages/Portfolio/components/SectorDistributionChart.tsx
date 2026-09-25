import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { SectorExposureItem } from '@/services/api/portfolioApi';
import { formatCurrency } from '@/utils/cn';
import { PieChart } from 'lucide-react';

export interface SectorDistributionChartProps {
  sectors: SectorExposureItem[];
}

export const SectorDistributionChart: React.FC<SectorDistributionChartProps> = ({ sectors }) => {
  return (
    <GlassCard className="p-5 space-y-4">
      <div className="flex items-center space-x-2 border-b border-border/50 pb-3">
        <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h2 className="text-base font-bold text-foreground font-display">Sector Exposure Breakdown</h2>
      </div>

      <div className="space-y-3">
        {sectors.map((sec) => (
          <div key={sec.sector} className="space-y-1 text-xs">
            <div className="flex justify-between items-center font-bold">
              <span className="text-foreground flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sec.color }} />
                <span>{sec.sector}</span>
              </span>
              <span className="font-mono text-muted-foreground">
                {sec.percentage}% ({formatCurrency(sec.value)})
              </span>
            </div>
            <div className="w-full bg-foreground/10 h-2 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${sec.percentage}%`, backgroundColor: sec.color }} />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
