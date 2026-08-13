import React, { useEffect } from 'react';
import { SystemHealthWidget } from './components/SystemHealthWidget';
import { useSystemHealthStore } from '@/store/useSystemHealthStore';
import { Button } from '@/components/buttons/Button';
import { Activity, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminSystemHealthPage: React.FC = () => {
  const navigate = useNavigate();
  const { health, fetchHealth } = useSystemHealthStore();

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-black font-display text-white">System Infrastructure & Server Health</h1>
          </div>
          <p className="text-xs text-slate-400">Real-time resource utilization, database latency, and WebSocket connection pools.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin')}>
          Console Dashboard
        </Button>
      </div>

      <SystemHealthWidget health={health} />
    </div>
  );
};
