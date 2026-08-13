import React, { useEffect } from 'react';
import { SystemHealthWidget } from './components/SystemHealthWidget';
import { ProviderStatusCard } from './components/ProviderStatusCard';
import { useSystemHealthStore } from '@/store/useSystemHealthStore';
import { useAdminStore } from '@/store/useAdminStore';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { ShieldCheck, Users, Server, Activity, Settings, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { health, fetchHealth } = useSystemHealthStore();
  const { providers, fetchAdminData } = useAdminStore();

  useEffect(() => {
    fetchHealth();
    fetchAdminData();
  }, [fetchHealth, fetchAdminData]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Operations Console & Control Center</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SUPER ADMIN ONLINE
            </span>
          </div>
          <p className="text-xs text-slate-400">Platform infrastructure health, API provider failover, RBAC user security, and AI ops monitoring.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="glass" size="sm" leftIcon={<Users className="w-4 h-4 text-purple-400" />} onClick={() => navigate('/admin/users')}>
            Manage Users
          </Button>
          <Button variant="glass" size="sm" leftIcon={<Server className="w-4 h-4 text-emerald-400" />} onClick={() => navigate('/admin/providers')}>
            API Providers
          </Button>
        </div>
      </div>

      {/* System Infrastructure Health Widget */}
      <SystemHealthWidget health={health} />

      {/* Active API Provider Statuses */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Configured API Provider Adapters</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/providers')}>
            View All Providers <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {providers.slice(0, 4).map((p) => (
            <ProviderStatusCard key={p.id} provider={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
