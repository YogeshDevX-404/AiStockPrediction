import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ProviderItem } from '@/services/api/adminApi';
import { useAdminStore } from '@/store/useAdminStore';
import { Server, ToggleLeft, ToggleRight } from 'lucide-react';

export interface ProviderStatusCardProps {
  provider: ProviderItem;
}

export const ProviderStatusCard: React.FC<ProviderStatusCardProps> = ({ provider }) => {
  const { toggleProvider } = useAdminStore();

  return (
    <GlassCard className="p-4 space-y-3 flex items-center justify-between hover:border-white/20 transition-all">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
          <Server className="w-4.5 h-4.5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-white font-display">{provider.name}</h3>
            <Badge variant="emerald">{provider.providerType}</Badge>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Priority Order: {provider.priority} • Status: {provider.status}</span>
        </div>
      </div>

      <button
        onClick={() => toggleProvider(provider.id, !provider.isEnabled)}
        className="cursor-pointer"
        title={provider.isEnabled ? 'Disable Provider' : 'Enable Provider'}
      >
        {provider.isEnabled ? (
          <ToggleRight className="w-7 h-7 text-emerald-400" />
        ) : (
          <ToggleLeft className="w-7 h-7 text-slate-500" />
        )}
      </button>
    </GlassCard>
  );
};
