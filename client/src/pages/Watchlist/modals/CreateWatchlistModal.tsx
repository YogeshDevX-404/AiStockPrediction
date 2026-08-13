import React, { useState } from 'react';
import { Modal } from '@/components/modals/Modal';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { useWatchlistStore } from '@/store/useWatchlistStore';
import { toast } from 'react-hot-toast';

export interface CreateWatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWatchlistModal: React.FC<CreateWatchlistModalProps> = ({ isOpen, onClose }) => {
  const { createWatchlist } = useWatchlistStore();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      await createWatchlist(name.trim());
      setIsLoading(false);
      setName('');
      onClose();
      toast.success(`Created watchlist "${name}"!`);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Custom Smart Watchlist">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Watchlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Dividend Winners, AI Quantum, Penny Momentum"
          required
          autoFocus
        />

        <div className="flex items-center justify-end space-x-3 pt-2">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
            Create Watchlist
          </Button>
        </div>
      </form>
    </Modal>
  );
};
