import React from 'react';
import { APP_NAME } from '@/constants';
import { Shield, Lock, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full glass-panel border-t border-border/50 px-6 py-4 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span>© {new Date().getFullYear()} {APP_NAME} Architecture Inc. All rights reserved.</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1.5 hover:text-foreground cursor-pointer transition-colors">
            <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-1.5 hover:text-foreground cursor-pointer transition-colors">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
