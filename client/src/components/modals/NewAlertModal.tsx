import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { Select } from '../inputs/Select';
import { toast } from 'react-hot-toast';

export interface NewAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewAlertModal: React.FC<NewAlertModalProps> = ({ isOpen, onClose }) => {
  const [symbol, setSymbol] = useState('NVDA');
  const [condition, setCondition] = useState('RISES_ABOVE');
  const [targetPrice, setTargetPrice] = useState('140.00');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onClose();
      toast.success(`Price alert created for ${symbol} when price ${condition.replace('_', ' ').toLowerCase()} $${targetPrice}`);
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Price Alert">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="e.g. NVDA, AAPL"
          required
        />

        <Select
          label="Trigger Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          options={[
            { value: 'RISES_ABOVE', label: 'Price Rises Above ($)' },
            { value: 'DROPS_BELOW', label: 'Price Drops Below ($)' },
            { value: 'AI_SIGNAL_CHANGE', label: 'AI Recommendation Changes' },
          ]}
        />

        <Input
          label="Target Trigger Price ($)"
          type="number"
          step="0.01"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          required
        />

        <div className="flex items-center justify-end space-x-3 pt-2">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
            Set Alert
          </Button>
        </div>
      </form>
    </Modal>
  );
};
