import React from 'react';
import { BrokerOrderTerminal } from './components/BrokerOrderTerminal';
import { Button } from '@/components/buttons/Button';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BrokerTerminalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <Send className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Smart Broker Order Execution Terminal</h1>
          </div>
          <p className="text-xs text-muted-foreground">Direct live order routing gateway to Zerodha, Upstox, Alpaca, and Interactive Brokers.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/broker-sync')}>
          Broker Hub
        </Button>
      </div>

      <BrokerOrderTerminal />
    </div>
  );
};
