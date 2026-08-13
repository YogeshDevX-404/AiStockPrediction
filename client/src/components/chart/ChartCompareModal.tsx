import React, { useState } from 'react';
import { Modal } from '../modals/Modal';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { useChartStore } from '@/store/useChartStore';
import { toast } from 'react-hot-toast';

export interface ChartCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChartCompareModal: React.FC<ChartCompareModalProps> = ({ isOpen, onClose }) => {
  const { compareSymbol, setCompareSymbol } = useChartStore();
  const [ticker, setTicker] = useState(compareSymbol || 'AMD');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompareSymbol(ticker.toUpperCase());
    onClose();
    toast.success(`Overlay comparison ticker set to ${ticker.toUpperCase()}`);
  };

  const handleRemove = () => {
    setCompareSymbol(null);
    onClose();
    toast.success('Removed overlay comparison ticker');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compare Stock Symbol Overlay">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Comparison Symbol Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="e.g. AMD, TSLA, AAPL"
          required
        />

        <div className="flex items-center justify-between pt-2">
          {compareSymbol ? (
            <Button type="button" variant="danger" size="sm" onClick={handleRemove}>
              Remove Overlay
            </Button>
          ) : <div />}

          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Apply Overlay
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
