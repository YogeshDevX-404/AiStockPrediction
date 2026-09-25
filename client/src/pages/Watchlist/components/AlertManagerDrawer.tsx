import React, { useState } from 'react';
import { Modal } from '@/components/modals/Modal';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Select } from '@/components/inputs/Select';
import { useAlertStore } from '@/store/useAlertStore';
import { Badge } from '@/components/ui/Badge';
import { Bell, Trash2, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export interface AlertManagerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSymbol?: string;
}

export const AlertManagerDrawer: React.FC<AlertManagerDrawerProps> = ({
  isOpen,
  onClose,
  defaultSymbol = 'NVDA',
}) => {
  const { alerts, alertHistory, addAlert, deleteAlert } = useAlertStore();

  const [symbol, setSymbol] = useState(defaultSymbol);
  const [condition, setCondition] = useState('PRICE_ABOVE');
  const [targetValue, setTargetValue] = useState('140.00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAlert({
      symbol: symbol.toUpperCase(),
      condition,
      targetValue: parseFloat(targetValue) || 100,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Smart Price & Technical Alert Manager">
      <div className="space-y-6">
        {/* Create Alert Form */}
        <form onSubmit={handleSubmit} className="space-y-3 p-4 rounded-2xl glass-panel border border-border/50">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Set New Alert Trigger</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <Input
              label="Symbol Ticker"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              required
            />
            <Select
              label="Trigger Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              options={[
                { value: 'PRICE_ABOVE', label: 'Price Above ($)' },
                { value: 'PRICE_BELOW', label: 'Price Below ($)' },
                { value: 'RSI_ABOVE', label: 'RSI Above (> 70)' },
                { value: 'RSI_BELOW', label: 'RSI Below (< 30)' },
                { value: 'MACD_CROSS', label: 'MACD Bullish Cross' },
                { value: 'VOLUME_SPIKE', label: 'Volume Spike (> 2x Avg)' },
              ]}
            />
            <Input
              label="Target Level"
              type="number"
              step="0.01"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button type="submit" variant="primary" size="sm">
              Set Trigger Alert
            </Button>
          </div>
        </form>

        {/* Active Alerts List */}
        <div className="space-y-2 text-xs">
          <h3 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Active Monitored Triggers ({alerts.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {alerts.map((al) => (
              <div key={al.id} className="p-2.5 rounded-xl bg-foreground/5 border border-border/40 flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground font-mono">{al.symbol}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{al.condition.replace('_', ' ')}: {al.targetValue}</span>
                </div>
                <button onClick={() => deleteAlert(al.id)} className="p-1 text-muted-foreground hover:text-red-600 dark:text-red-400 cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Trigger Log */}
        <div className="space-y-2 text-xs">
          <h3 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Recent Trigger Log</h3>
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {alertHistory.map((ah) => (
              <div key={ah.id} className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between">
                <div>
                  <span className="font-bold text-purple-300 font-mono mr-2">{ah.symbol}</span>
                  <span className="text-muted-foreground text-[11px]">{ah.message}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">{ah.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
