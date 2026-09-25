import React from 'react';
import { PermissionMatrixTable } from './components/PermissionMatrixTable';
import { Button } from '@/components/buttons/Button';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminRolesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Role-Based Access Control (RBAC)</h1>
          </div>
          <p className="text-xs text-muted-foreground">Configure permission capability matrices across Super Admin, Admin, Moderator, Support, and Viewer tiers.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin')}>
          Console Dashboard
        </Button>
      </div>

      <PermissionMatrixTable />
    </div>
  );
};
