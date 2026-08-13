import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useNotificationStore } from '@/store/useNotificationStore';
import { Bell, Check, Trash2, Sparkles, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, fetchNotifications, markAllRead, deleteNotification } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">In-App Notification Center</h1>
            {unreadCount > 0 && <Badge variant="red">{unreadCount} UNREAD</Badge>}
          </div>
          <p className="text-xs text-slate-400">Real-time dispatches for price breakouts, AI predictions, and breaking news.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="accent" size="sm" leftIcon={<Check className="w-4 h-4" />} onClick={markAllRead}>
            Mark All Read
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<Settings className="w-4 h-4 text-slate-400" />} onClick={() => navigate('/notification-settings')}>
            Preferences
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <GlassCard className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">No notifications yet.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between ${
                n.isRead
                  ? 'bg-white/5 border-white/5 opacity-70'
                  : 'bg-purple-950/20 border-purple-500/30 text-white'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold font-display text-white">{n.title}</h3>
                    <Badge variant={n.priority === 'HIGH' ? 'purple' : 'emerald'}>{n.type}</Badge>
                    {n.symbol && (
                      <span
                        className="text-emerald-400 font-mono font-bold cursor-pointer hover:underline text-xs"
                        onClick={() => navigate(`/stocks/${n.symbol}`)}
                      >
                        ${n.symbol}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">{n.message}</p>
                  <span className="text-[10px] text-slate-500 font-mono block">{new Date(n.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => deleteNotification(n.id)}
                className="text-slate-400 hover:text-red-400 p-1 cursor-pointer"
                title="Delete Notification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </GlassCard>
    </div>
  );
};
