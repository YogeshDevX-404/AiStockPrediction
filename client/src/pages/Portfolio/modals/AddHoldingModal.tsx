import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/modals/Modal';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Select } from '@/components/inputs/Select';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { HoldingItem } from '@/services/api/portfolioApi';
import { toast } from 'react-hot-toast';

export interface AddHoldingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHolding?: HoldingItem | null;
}

export const AddHoldingModal: React.FC<AddHoldingModalProps> = ({
  isOpen,
  onClose,
  initialHolding,
}) => {
  const { addHolding } = usePortfolioStore();

  const [symbol, setSymbol] = useState(initialHolding?.symbol || 'NVDA');
  const [exchange, setExchange] = useState(initialHolding?.exchange || 'NASDAQ');
  const [quantity, setQuantity] = useState<number>(initialHolding?.quantity || 10);
  const [avgBuyPrice, setAvgBuyPrice] = useState<number>(initialHolding?.avgBuyPrice || 120.0);
  const [purchaseDate, setPurchaseDate] = useState(
    initialHolding?.purchaseDate || new Date().toISOString().split('T')[0]
  );
  const [broker, setBroker] = useState(initialHolding?.broker || 'Zerodha');
  const [notes, setNotes] = useState(initialHolding?.notes || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialHolding) {
      setSymbol(initialHolding.symbol);
      setExchange(initialHolding.exchange);
      setQuantity(initialHolding.quantity);
      setAvgBuyPrice(initialHolding.avgBuyPrice);
      setPurchaseDate(initialHolding.purchaseDate);
      setBroker(initialHolding.broker);
      setNotes(initialHolding.notes || '');
    }
  }, [initialHolding]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0 || avgBuyPrice <= 0) {
      toast.error('Please enter valid positive quantity and buy price.');
      return;
    }

    setIsLoading(true);
    try {
      await addHolding({
        symbol: symbol.toUpperCase(),
        name: `${symbol.toUpperCase()} Position`,
        exchange,
        quantity,
        avgBuyPrice,
        purchaseDate,
        broker,
        notes,
      });
      setIsLoading(false);
      onClose();
      toast.success(`${initialHolding ? 'Updated' : 'Added'} position for ${symbol.toUpperCase()}`);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialHolding ? `Edit Position: ${initialHolding.symbol}` : 'Add Portfolio Position'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Stock Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="e.g. NVDA, AAPL"
            disabled={!!initialHolding}
            required
          />
          <Select
            label="Exchange"
            value={exchange}
            onChange={(e) => setExchange(e.target.value)}
            options={[
              { value: 'NASDAQ', label: 'NASDAQ' },
              { value: 'NYSE', label: 'NYSE' },
              { value: 'NSE', label: 'NSE (India)' },
              { value: 'BSE', label: 'BSE (India)' },
              { value: 'CRYPTO', label: 'Crypto Spot' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Quantity Shares"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            required
          />
          <Input
            label="Average Buy Price ($)"
            type="number"
            step="0.01"
            value={avgBuyPrice}
            onChange={(e) => setAvgBuyPrice(parseFloat(e.target.value) || 0)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Purchase Date"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            required
          />
          <Select
            label="Broker Account (Optional)"
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
            options={[
              { value: 'Zerodha', label: 'Zerodha Kite' },
              { value: 'Groww', label: 'Groww' },
              { value: 'INDmoney', label: 'INDmoney' },
              { value: 'Robinhood', label: 'Robinhood' },
              { value: 'Interactive Brokers', label: 'Interactive Brokers' },
              { value: 'Manual', label: 'Manual Entry' },
            ]}
          />
        </div>

        <Input
          label="Position Notes / Rationale"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. AI hardware thesis, 3-year horizon"
        />

        <div className="flex items-center justify-end space-x-3 pt-2">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
            {initialHolding ? 'Save Changes' : 'Add Position'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
