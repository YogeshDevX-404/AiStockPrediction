import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Select } from '@/components/inputs/Select';
import { useBrokerStore } from '@/store/useBrokerStore';
import { Send, Building2 } from 'lucide-react';

export const BrokerOrderTerminal: React.FC = () => {
  const { accounts, isSubmittingOrder, submitOrder } = useBrokerStore();

  const [brokerAccountId, setBrokerAccountId] = useState(accounts[0]?.id || 'brk-1');
  const [symbol, setSymbol] = useState('NVDA');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [quantity, setQuantity] = useState('10');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOrder({
      brokerAccountId,
      symbol: symbol.toUpperCase(),
      side,
      orderType,
      quantity: parseInt(quantity) || 1,
    });
  };

  return (
    <GlassCard className="p-6 space-y-4">
      <div className="flex items-center space-x-2 border-b border-border/50 pb-3">
        <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h2 className="text-base font-bold text-foreground font-display">Smart Order Router Gateway Terminal</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Select
          label="Target Connected Broker Account"
          value={brokerAccountId}
          onChange={(e) => setBrokerAccountId(e.target.value)}
          options={accounts.map((a) => ({
            value: a.id,
            label: `${a.brokerName} (${a.accountNumber})`,
          }))}
        />

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSide('BUY')}
            className={`py-2 rounded-xl font-bold font-display cursor-pointer transition-all ${
              side === 'BUY' ? 'bg-emerald-500 text-foreground shadow-lg shadow-emerald-500/20' : 'bg-foreground/5 text-muted-foreground hover:text-foreground'
            }`}
          >
            BUY
          </button>
          <button
            type="button"
            onClick={() => setSide('SELL')}
            className={`py-2 rounded-xl font-bold font-display cursor-pointer transition-all ${
              side === 'SELL' ? 'bg-red-500 text-foreground shadow-lg shadow-red-500/20' : 'bg-foreground/5 text-muted-foreground hover:text-foreground'
            }`}
          >
            SELL
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-muted-foreground font-bold">Symbol Ticker</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="w-full glass-panel border border-border/50 rounded-xl px-3 py-2 text-foreground font-mono focus:outline-none"
            />
          </div>

          <Select
            label="Order Execution Type"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as any)}
            options={[
              { value: 'MARKET', label: 'Market Order' },
              { value: 'LIMIT', label: 'Limit Order' },
            ]}
          />

          <div className="space-y-1">
            <label className="text-muted-foreground font-bold">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full glass-panel border border-border/50 rounded-xl px-3 py-2 text-foreground font-mono focus:outline-none"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant={side === 'BUY' ? 'primary' : 'danger'}
          size="md"
          className="w-full"
          isLoading={isSubmittingOrder}
          leftIcon={<Send className="w-4 h-4" />}
        >
          Dispatch Order via Smart Gateway
        </Button>
      </form>
    </GlassCard>
  );
};
