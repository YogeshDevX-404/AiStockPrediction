import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Checkbox } from '@/components/inputs/Checkbox';
import { Select } from '@/components/inputs/Select';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { User as UserIcon, Sliders } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { currency, soundEnabled, emailAlerts, pushNotifications, updateSettings } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold font-display text-white">Account & System Settings</h1>
        <p className="text-xs text-muted-foreground">Manage profile preferences, security settings, and notifications.</p>
      </div>

      <GlassCard className="space-y-6">
        <div className="flex items-center space-x-3 text-primary border-b border-white/10 pb-3">
          <UserIcon className="w-5 h-5" />
          <h2 className="text-base font-bold text-white">Profile Information</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue={user?.fullName} />
          <Input label="Email Address" defaultValue={user?.email} disabled />
        </div>
      </GlassCard>

      <GlassCard className="space-y-6">
        <div className="flex items-center space-x-3 text-secondary border-b border-white/10 pb-3">
          <Sliders className="w-5 h-5" />
          <h2 className="text-base font-bold text-white">Trading & Platform Preferences</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Base Currency"
            value={currency}
            onChange={(e) => updateSettings({ currency: e.target.value })}
            options={[
              { value: 'USD', label: 'USD ($)' },
              { value: 'EUR', label: 'EUR (€)' },
              { value: 'GBP', label: 'GBP (£)' },
              { value: 'INR', label: 'INR (₹)' },
            ]}
          />
        </div>

        <div className="space-y-3 pt-2">
          <Checkbox
            label="Enable sound notifications for price alerts"
            checked={soundEnabled}
            onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
          />
          <Checkbox
            label="Receive daily AI market digest via Email"
            checked={emailAlerts}
            onChange={(e) => updateSettings({ emailAlerts: e.target.checked })}
          />
          <Checkbox
            label="Enable browser push notifications"
            checked={pushNotifications}
            onChange={(e) => updateSettings({ pushNotifications: e.target.checked })}
          />
        </div>
      </GlassCard>

      <div className="flex justify-end space-x-3">
        <Button variant="primary" size="md">Save Preferences</Button>
      </div>
    </div>
  );
};
