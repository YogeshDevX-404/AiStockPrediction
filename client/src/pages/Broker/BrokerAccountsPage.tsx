import React from 'react';
import { BrokerAccountCard } from './components/BrokerAccountCard';
import { useBrokerStore } from '@/store/useBrokerStore';
import { Button } from '@/components/buttons/Button';
import { Building2, ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BrokerAccountsPage: React.FC = () => {
  const navigate = useNavigate();
  const { accounts } = useBrokerStore();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Linked Broker Accounts Manager</h1>
          </div>
          <p className="text-xs text-slate-400">Manage OAuth credentials, API keys, and synchronization settings across connected brokers.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/broker-sync')}>
          Broker Hub
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accounts.map((a) => (
          <BrokerAccountCard key={a.id} account={a} />
        ))}
      </div>
    </div>
  );
};
