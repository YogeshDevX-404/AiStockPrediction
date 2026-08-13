import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockRiskMetrics } from '@/services/mock/mockAnalyticsService';
import { ShieldCheck, PieChart, Activity } from 'lucide-react';

export const RiskMeterWidget: React.FC = () => {
  const { overallRisk, riskScore, sharpeRatio, diversificationScore, sectorAllocations } = mockRiskMetrics;

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold font-display text-white">Risk Meter & Allocation</h2>
        </div>
        <Badge variant="emerald">OPTIMAL RISK</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side: Circular Risk Meter Representation */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center space-y-3 relative overflow-hidden">
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            {/* SVG Meter Arc */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#10b981"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - 0.21)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-emerald-400 font-display">{riskScore}</span>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Risk Score / 10</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-white">Risk Profile: {overallRisk} HAZARD</div>
            <div className="text-xs text-slate-400">Sharpe Ratio: <span className="text-emerald-400 font-bold">{sharpeRatio}</span></div>
          </div>
        </div>

        {/* Right Side: Sector Allocation Breakdown */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 uppercase">Sector Distribution</span>
            <span className="text-emerald-400 font-bold">Diversification: {diversificationScore}%</span>
          </div>

          <div className="space-y-2.5">
            {sectorAllocations.map((item) => (
              <div key={item.sector} className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>{item.sector}</span>
                  <span className="font-bold font-mono">{item.percentage}%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
