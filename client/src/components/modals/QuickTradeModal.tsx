import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '@/utils/cn';
import { toast } from 'react-hot-toast';

export interface QuickTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol?: string;
  defaultType?: 'BUY' | 'SELL';
}

export const QuickTradeModal: React.FC<QuickTradeModalProps> = ({
  isOpen,
  onClose,
  symbol = 'NVDA',
  defaultType = 'BUY',
}) => {
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>(defaultType);
  const [shares, setShares] = useState(10);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [limitPrice, setLimitPrice] = useState(132.40);
  const [isLoading, setIsLoading] = useState(false);

  const price = 132.40;
  const totalValue = shares * (orderType === 'LIMIT' ? limitPrice : price);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onClose();
      toast.success(
        `Order Executed: ${tradeType} ${shares} shares of ${symbol} at ${formatCurrency(
          orderType === 'LIMIT' ? limitPrice : price
        )}`
      );
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Quick Trade: ${symbol}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Toggle Buy / Sell */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl glass-panel">
          <button
            type="button"
            onClick={() => setTradeType('BUY')}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tradeType === 'BUY' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            BUY {symbol}
          </button>
          <button
            type="button"
            onClick={() => setTradeType('SELL')}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tradeType === 'SELL' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            SELL {symbol}
          </button>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Quantity (Shares)"
            type="number"
            value={shares}
            onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
            required
          />
          <Input
            label="Est. Execution Price"
            value={formatCurrency(price)}
            disabled
          />
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Estimated Order Total</span>
          <span className="text-base font-extrabold text-white font-mono">{formatCurrency(totalValue)}</span>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant={tradeType === 'BUY' ? 'primary' : 'danger'}
            size="md"
            isLoading={isLoading}
          >
            Confirm {tradeType} Order
          </Button>
        </div>
      </form>
    </Modal>
  );
};
