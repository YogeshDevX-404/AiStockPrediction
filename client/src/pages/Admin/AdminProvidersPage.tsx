import React, { useEffect } from 'react';
import { ProviderStatusCard } from './components/ProviderStatusCard';
import { useAdminStore } from '@/store/useAdminStore';
import { Button } from '@/components/buttons/Button';
import { Server, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminProvidersPage: React.FC = () => {
  const navigate = useNavigate();
  const { providers, fetchAdminData } = useAdminStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Server className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">API Provider Adapter Management</h1>
          </div>
          <p className="text-xs text-slate-400">Configure Market Data, News, AI LLM, and Vision OCR provider failovers and priority order.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin')}>
          Console Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {providers.map((p) => (
          <ProviderStatusCard key={p.id} provider={p} />
        ))}
      </div>
    </div>
  );
};
