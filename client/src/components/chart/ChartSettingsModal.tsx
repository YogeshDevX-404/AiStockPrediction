import React from 'react';
import { Modal } from '../modals/Modal';
import { Checkbox } from '../inputs/Checkbox';
import { useChartStore } from '@/store/useChartStore';

export interface ChartSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChartSettingsModal: React.FC<ChartSettingsModalProps> = ({ isOpen, onClose }) => {
  const { gridLines, crosshair, priceLabels, timeLabels, autoScale, updateSettings } = useChartStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chart Display Settings">
      <div className="space-y-4 text-xs">
        <Checkbox
          label="Show Grid Lines"
          checked={gridLines}
          onChange={(e) => updateSettings({ gridLines: e.target.checked })}
        />
        <Checkbox
          label="Show Crosshair Pointer"
          checked={crosshair}
          onChange={(e) => updateSettings({ crosshair: e.target.checked })}
        />
        <Checkbox
          label="Show Price Axis Labels"
          checked={priceLabels}
          onChange={(e) => updateSettings({ priceLabels: e.target.checked })}
        />
        <Checkbox
          label="Show Time Axis Labels"
          checked={timeLabels}
          onChange={(e) => updateSettings({ timeLabels: e.target.checked })}
        />
        <Checkbox
          label="Autoscale Price Axis"
          checked={autoScale}
          onChange={(e) => updateSettings({ autoScale: e.target.checked })}
        />
      </div>
    </Modal>
  );
};
