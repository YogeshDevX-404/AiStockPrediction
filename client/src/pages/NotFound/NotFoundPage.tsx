import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { AlertCircle, Home } from 'lucide-react';
import { ROUTES } from '@/constants';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#060913] flex items-center justify-center p-6 text-center">
      <GlassCard className="max-w-md w-full p-8 space-y-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black font-display text-white">404</h1>
          <h2 className="text-lg font-bold text-foreground">Page Not Found</h2>
          <p className="text-xs text-muted-foreground">
            The market route you requested does not exist or has been relocated.
          </p>
        </div>

        <Link to={ROUTES.DASHBOARD}>
          <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </GlassCard>
    </div>
  );
};
