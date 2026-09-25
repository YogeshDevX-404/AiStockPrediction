import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useAdminStore } from '@/store/useAdminStore';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminLogsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logs, fetchAdminData } = useAdminStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Security & Activity Audit Trail</h1>
          </div>
          <p className="text-xs text-muted-foreground">Immutable audit log recording admin dispatches, provider state changes, and RBAC actions.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin')}>
          Console Dashboard
        </Button>
      </div>

      <GlassCard className="p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-border/50 text-muted-foreground uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">User Email</th>
                <th className="pb-3 font-semibold">Action Dispatched</th>
                <th className="pb-3 font-semibold">Target Resource</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right font-sans">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-foreground/5">
                  <td className="py-3 font-bold text-foreground font-sans">{log.userEmail}</td>
                  <td className="py-3 font-mono text-purple-300 font-bold">{log.action}</td>
                  <td className="py-3 text-muted-foreground font-bold">{log.resource}</td>
                  <td className="py-3 font-sans">
                    <Badge variant={log.status === 'SUCCESS' ? 'emerald' : 'red'}>{log.status}</Badge>
                  </td>
                  <td className="py-3 text-right text-muted-foreground font-sans">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
