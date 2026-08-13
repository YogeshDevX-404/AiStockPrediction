import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Activity, ArrowUpRight, ArrowDownRight, Bell, RefreshCw } from 'lucide-react';

export const RecentActivityWidget: React.FC = () => {
  const activities = [
    {
      id: 'a1',
      title: 'Order Executed: BUY 10 NVDA',
      time: '12 mins ago',
      type: 'TRADE',
      details: 'Executed at $132.40 limit order',
      isPos: true,
    },
    {
      id: 'a2',
      title: 'Price Alert Triggered: TSLA > $245.00',
      time: '45 mins ago',
      type: 'ALERT',
      details: 'TSLA crossed resistance target of $245.00',
      isPos: true,
    },
    {
      id: 'a3',
      title: 'Trailing Stop Updated: AAPL',
      time: '2 hours ago',
      type: 'PORTFOLIO',
      details: 'Stop loss raised to $218.50',
      isPos: false,
    },
  ];

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold font-display text-white">Recent Activity & Logs</h2>
        </div>
        <Badge variant="outline">REALTIME</Badge>
      </div>

      <div className="space-y-3 text-xs">
        {activities.map((item) => (
          <div key={item.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center space-x-1.5">
                {item.isPos ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{item.title}</span>
              </span>
              <span className="text-[10px] text-slate-400">{item.time}</span>
            </div>
            <p className="text-slate-400 pl-5">{item.details}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
