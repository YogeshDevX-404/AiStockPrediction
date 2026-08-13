import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Layout, ArrowLeft, MessageSquare, BarChart2, Eye, Briefcase, Newspaper, Sparkles, StickyNote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CopilotWorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const { activeTab, pinnedNotes, setActiveTab } = useWorkspaceStore();

  const tabs: { key: any; label: string; icon: any }[] = [
    { key: 'CHAT', label: 'Multi-Agent Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'CHART', label: 'Chart Analytics', icon: <BarChart2 className="w-4 h-4" /> },
    { key: 'WATCHLIST', label: 'Smart Watchlist', icon: <Eye className="w-4 h-4" /> },
    { key: 'PORTFOLIO', label: 'Portfolio Health', icon: <Briefcase className="w-4 h-4" /> },
    { key: 'NEWS', label: 'News Intelligence', icon: <Newspaper className="w-4 h-4" /> },
    { key: 'PREDICTION', label: 'ML Predictions', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'NOTES', label: 'Pinned Notes', icon: <StickyNote className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Layout className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Multi-Tab AI Trading Workspace</h1>
          </div>
          <p className="text-xs text-slate-400">Unified workspace integrating multi-agent conversations, real-time charts, watchlists, and research notes.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/copilot')}>
          Copilot Hub
        </Button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-display cursor-pointer transition-all ${
              activeTab === t.key ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Workspace Panel */}
      <GlassCard className="p-6">
        {activeTab === 'NOTES' ? (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white font-display border-b border-white/10 pb-2">Pinned Research Notes</h3>
            {pinnedNotes.map((note, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 font-mono">
                📌 {note}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-2">
            <span className="text-sm font-bold text-purple-300 font-display">Active Workspace View: {activeTab}</span>
            <p className="text-xs text-slate-400">Integrated workspace context synchronized across all 15 specialized AI agents.</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
