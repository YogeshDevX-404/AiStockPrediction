import React, { useState } from 'react';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { HoldingItem } from '@/services/api/portfolioApi';
import { toast } from 'react-hot-toast';

export interface ConfirmDeleteHoldingModalProps {
  isOpen: boolean;
  onClose: () => void;
  holding: HoldingItem | null;
}

export const ConfirmDeleteHoldingModal: React.FC<ConfirmDeleteHoldingModalProps> = ({
  isOpen,
  onClose,
  holding,
}) => {
  const { deleteHolding } = usePortfolioStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!holding) return;
    setIsLoading(true);
    try {
      await deleteHolding(holding.id);
      setIsLoading(false);
      onClose();
      toast.success(`Removed position ${holding.symbol} from portfolio.`);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={`Delete Position: ${holding?.symbol || ''}`}
      message={`Are you sure you want to delete your ${holding?.quantity || 0} shares position of ${
        holding?.name || holding?.symbol
      }? This action will update your total portfolio valuation.`}
      confirmText="Yes, Delete Position"
      cancelText="Cancel"
      isLoading={isLoading}
    />
  );
};
