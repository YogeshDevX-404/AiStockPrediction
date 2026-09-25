import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Select } from '@/components/inputs/Select';
import { Badge } from '@/components/ui/Badge';
import { useOrderStore } from '@/store/useOrderStore';
import { ShoppingCart, Sparkles, TrendingUp } from 'lucide-react';

export const OrderExecutionPanel: React.FC = () => {
  const { isSubmitting, submitOrder } = useOrderStore();

  const [symbol, setSymbol] = useState('NVDA');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState('MARKET');
  const [quantity, setQuantity] = useState('10');
  const [price, setPrice] = useState('135.50');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOrder({
      symbol: symbol.toUpperCase(),
      side,
      orderType,
      quantity: parseInt(quantity) || 1,
      price: parseFloat(price) || 100.0,
    });
  };

  return (
    <GlassCard className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-base font-bold text-foreground font-display">Virtual Order Execution Panel</h2>
        </div>
        <div className="flex items-center space-x-1">
          <Badge variant="purple">92.5% AI CONVICTION: BUY</Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSide('BUY')}
            className={`py-2 rounded-xl font-bold font-display cursor-pointer transition-all ${
              side === 'BUY' ? 'bg-emerald-500 text-foreground shadow-lg shadow-emerald-500/20' : 'bg-foreground/5 text-muted-foreground hover:text-foreground'
            }`}
          >
            BUY / LONG
          </button>
          <button
            type="button"
            onClick={() => setSide('SELL')}
            className={`py-2 rounded-xl font-bold font-display cursor-pointer transition-all ${
              side === 'SELL' ? 'bg-red-500 text-foreground shadow-lg shadow-red-500/20' : 'bg-foreground/5 text-muted-foreground hover:text-foreground'
            }`}
          >
            SELL / SHORT
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-muted-foreground font-bold">Symbol Ticker</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="w-full glass-panel border border-border/50 rounded-xl px-3 py-2 text-foreground font-mono placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          <Select
            label="Order Type"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            options={[
              { value: 'MARKET', label: 'Market Order (Instant Fill)' },
              { value: 'LIMIT', label: 'Limit Order (Target Price)' },
            ]}
          />

          <div className="space-y-1">
            <label className="text-muted-foreground font-bold">Quantity (Shares)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full glass-panel border border-border/50 rounded-xl px-3 py-2 text-foreground font-mono focus:outline-none"
            />
          </div>
        </div>

        {orderType === 'LIMIT' && (
          <div className="space-y-1">
            <label className="text-muted-foreground font-bold">Target Limit Price ($)</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full glass-panel border border-border/50 rounded-xl px-3 py-2 text-foreground font-mono focus:outline-none"
            />
          </div>
        )}

        <Button
          type="submit"
          variant={side === 'BUY' ? 'primary' : 'danger'}
          size="md"
          className="w-full"
          isLoading={isSubmitting}
        >
          Submit Virtual {side} Order
        </Button>
      </form>
    </GlassCard>
  );
};
