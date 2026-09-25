import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Select } from '@/components/inputs/Select';
import { Button } from '@/components/buttons/Button';
import { useAlertStore } from '@/store/useAlertStore';
import { Bell, ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AlertBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { createRule } = useAlertStore();

  const [symbol, setSymbol] = useState('NVDA');
  const [alertType, setAlertType] = useState('PRICE_ABOVE');
  const [targetValue, setTargetValue] = useState('145.00');
  const [priority, setPriority] = useState('HIGH');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRule({
      symbol: symbol.toUpperCase(),
      alertType,
      targetValue: parseFloat(targetValue) || 100,
      triggerCondition: `${alertType} ${targetValue}`,
      priority,
      isEnabled: true,
    });
    navigate('/alerts');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Visual Alert Builder Workspace</h1>
          </div>
          <p className="text-xs text-muted-foreground">Configure trigger parameters for Price Thresholds, RSI technicals, AI Predictions, and Breaking News.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/alerts')}>
          Back to Alerts
        </Button>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-muted-foreground font-bold">Target Stock Symbol</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="Symbol (e.g. NVDA)"
              className="w-full glass-panel border border-border/50 rounded-xl px-3 py-2 text-foreground font-mono placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          <Select
            label="Alert Trigger Category"
            value={alertType}
            onChange={(e) => setAlertType(e.target.value)}
            options={[
              { value: 'PRICE_ABOVE', label: 'Price Above Threshold ($)' },
              { value: 'PRICE_BELOW', label: 'Price Below Threshold ($)' },
              { value: 'RSI_OVERSOLD', label: 'RSI Technical Oversold (< 30)' },
              { value: 'GOLDEN_CROSS', label: 'Golden Cross (EMA 50 > EMA 200)' },
              { value: 'PREDICTION_SHIFT', label: 'AI Prediction Shift (> 90% Conviction)' },
              { value: 'BREAKING_NEWS', label: 'High-Impact Breaking News' },
            ]}
          />

          <div className="space-y-1">
            <label className="text-muted-foreground font-bold">Target Threshold Value</label>
            <input
              type="text"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder="Target Value (e.g. 145.00)"
              className="w-full glass-panel border border-border/50 rounded-xl px-3 py-2 text-foreground font-mono focus:outline-none"
            />
          </div>

          <Select
            label="Alert Priority Level"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={[
              { value: 'LOW', label: 'Low Priority' },
              { value: 'MEDIUM', label: 'Medium Priority' },
              { value: 'HIGH', label: 'High Priority' },
              { value: 'URGENT', label: 'Urgent Priority' },
            ]}
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full" leftIcon={<Plus className="w-4 h-4" />}>
              Create Smart Alert Rule
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
