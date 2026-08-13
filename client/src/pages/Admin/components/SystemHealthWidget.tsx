import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { SystemHealthMetrics } from '@/services/api/adminApi';
import { Cpu, HardDrive, Database, Activity, Wifi } from 'lucide-react';

export interface SystemHealthWidgetProps {
  health: SystemHealthMetrics;
}

export const SystemHealthWidget: React.FC<SystemHealthWidgetProps> = ({ health }) => {
  return (
    <GlassCard className="p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white font-display">System Infrastructure Health</h2>
        </div>
        <Badge variant="emerald">UPTIME: 99.98%</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>CPU Usage</span>
          </div>
          <div className="text-lg font-black text-emerald-400">{health.cpuUsagePercent}%</div>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Memory Usage</span>
          </div>
          <div className="text-lg font-black text-purple-400">{health.memoryUsagePercent}%</div>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400">
            <Database className="w-3.5 h-3.5" />
            <span>Database</span>
          </div>
          <div className="text-lg font-black text-emerald-400">{health.dbStatus}</div>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400">
            <Wifi className="w-3.5 h-3.5" />
            <span>WebSockets</span>
          </div>
          <div className="text-lg font-black text-blue-400">{health.activeWebsockets}</div>
        </div>
      </div>
    </GlassCard>
  );
};
