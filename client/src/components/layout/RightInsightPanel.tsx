import React, { useState } from 'react';
import { GlassCard } from '../cards/GlassCard';
import { Button } from '../buttons/Button';
import { Badge } from '../ui/Badge';
import { Bot, Bell, Star, FileText, Send, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { formatCurrency } from '@/utils/cn';

export const RightInsightPanel: React.FC = () => {
  const [note, setNote] = useState('NVDA resistance breakout target: $155.00');

  return (
    <aside className="w-80 h-full flex flex-col space-y-4 select-none shrink-0">
      {/* 1. AI Co-Pilot Widget Card */}
      <GlassCard glow className="p-4 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-card to-[#070b1a] space-y-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Bot className="w-5 h-5" />
          <h3 className="text-sm font-extrabold text-white font-display">AI Co-Pilot Assistant</h3>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Ask any market question or get instant fundamental breakdown.
        </p>
        <Link to={ROUTES.CHAT}>
          <Button variant="accent" size="sm" className="w-full text-xs" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
            Open AI Assistant
          </Button>
        </Link>
      </GlassCard>

      {/* 2. Market Summary Card */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Market Overview</h3>
          <Badge variant="emerald" className="text-[9px]">LIVE</Badge>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
            <span className="font-bold text-white">S&P 500</span>
            <span className="font-semibold text-emerald-400">+0.77%</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
            <span className="font-bold text-white">NASDAQ</span>
            <span className="font-semibold text-emerald-400">+1.05%</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
            <span className="font-bold text-white">CBOE VIX</span>
            <span className="font-semibold text-red-400">-4.25%</span>
          </div>
        </div>
      </GlassCard>

      {/* 3. Upcoming Alerts & Notifications */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Triggered Alerts</h3>
          </div>
          <Badge variant="outline" className="text-[9px]">2 NEW</Badge>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">NVDA Target Hit</span>
              <span className="text-[10px] text-slate-400">10m ago</span>
            </div>
            <p className="text-[11px] text-slate-300">Target price $132.40 reached with strong volume.</p>
          </div>
        </div>
      </GlassCard>

      {/* 4. Quick Trader Notes */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center space-x-2 text-slate-400">
          <FileText className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider">Quick Scratch Notes</h3>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jot down quick trade ideas or levels..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary resize-none h-20"
        />
      </GlassCard>

      {/* 5. Favorite Stocks */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Favorites</h3>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { sym: 'NVDA', price: '$132.40', chg: '+3.45%' },
            { sym: 'TSLA', price: '$248.60', chg: '+4.25%' },
          ].map((f) => (
            <div key={f.sym} className="flex items-center justify-between p-2 rounded-xl bg-white/5">
              <span className="font-bold text-white font-mono">{f.sym}</span>
              <span className="text-slate-300">{f.price}</span>
              <span className="font-bold text-emerald-400">{f.chg}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </aside>
  );
};
