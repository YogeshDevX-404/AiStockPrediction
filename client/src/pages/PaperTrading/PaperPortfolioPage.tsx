import React from 'react';
import { OpenPositionsTable } from './components/OpenPositionsTable';
import { Button } from '@/components/buttons/Button';
import { PieChart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PaperPortfolioPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Virtual Holdings & Allocation</h1>
          </div>
          <p className="text-xs text-muted-foreground">Detailed breakdown of active simulated positions, entry vs current market price, and unrealized ROI.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/paper-trading')}>
          Trading Hub
        </Button>
      </div>

      <OpenPositionsTable />
    </div>
  );
};
