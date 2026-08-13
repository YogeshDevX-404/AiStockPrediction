import React, { useEffect } from 'react';
import { SectorDistributionChart } from './components/SectorDistributionChart';
import { useDiversificationStore } from '@/store/useDiversificationStore';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { PieChart, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PortfolioAnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { sectors, fetchDiversification } = useDiversificationStore();

  useEffect(() => {
    fetchDiversification();
  }, [fetchDiversification]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <PieChart className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Portfolio Asset & Sector Analytics</h1>
          </div>
          <p className="text-xs text-slate-400">Detailed diversification breakdown across industry sectors, market caps, and cash liquidity.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/portfolio/risk')}>
          Risk Center
        </Button>
      </div>

      <SectorDistributionChart sectors={sectors} />
    </div>
  );
};
