import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { usePreferenceStore } from '@/store/usePreferenceStore';
import { Settings, Mail, Bell, Smartphone, Webhook, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { useNavigate } from 'react-router-dom';

export const NotificationSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { preferences, fetchPreferences, updatePreferences } = usePreferenceStore();

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Delivery Channel Preferences</h1>
          </div>
          <p className="text-xs text-slate-400">Manage dispatch channels for real-time alert triggers and AI notification digests.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/notifications')}>
          Back to Center
        </Button>
      </div>

      <GlassCard className="space-y-4 p-6 text-xs">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-purple-400" />
            <div>
              <h2 className="text-sm font-bold text-white">In-App Notification Stream</h2>
              <p className="text-slate-400 text-[11px]">Display active popups and badges inside TradeGenius dashboard workspace.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={preferences.inAppEnabled}
            onChange={(e) => updatePreferences({ inAppEnabled: e.target.checked })}
            className="w-5 h-5 accent-purple-600 cursor-pointer"
          />
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-sm font-bold text-white">Email Digest & Instant Alerts</h2>
              <p className="text-slate-400 text-[11px]">Receive high-priority price trigger emails to your registered address.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={preferences.emailEnabled}
            onChange={(e) => updatePreferences({ emailEnabled: e.target.checked })}
            className="w-5 h-5 accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-white">Browser Push Notifications</h2>
              <p className="text-slate-400 text-[11px]">Receive instant desktop OS notifications even when the tab is backgrounded.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={preferences.pushEnabled}
            onChange={(e) => updatePreferences({ pushEnabled: e.target.checked })}
            className="w-5 h-5 accent-emerald-600 cursor-pointer"
          />
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Webhook className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold text-white">Custom Webhook Integration</h2>
              <p className="text-slate-400 text-[11px]">Dispatch JSON payloads to external Webhook or Discord/Telegram bots.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={preferences.webhookEnabled}
            onChange={(e) => updatePreferences({ webhookEnabled: e.target.checked })}
            className="w-5 h-5 accent-amber-600 cursor-pointer"
          />
        </div>
      </GlassCard>
    </div>
  );
};
