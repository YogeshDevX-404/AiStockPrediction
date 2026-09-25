import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useLeaderboardStore } from '@/store/useLeaderboardStore';
import { Trophy, Award, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PaperLeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { leaderboard, achievements, fetchLeaderboardAndAchievements } = useLeaderboardStore();

  useEffect(() => {
    fetchLeaderboardAndAchievements();
  }, [fetchLeaderboardAndAchievements]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-amber-500 dark:text-amber-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Traders Leaderboard & Achievements Hub</h1>
          </div>
          <p className="text-xs text-muted-foreground">Benchmark your simulated returns and unlock paper trading achievements.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/paper-trading')}>
          Trading Hub
        </Button>
      </div>

      {/* Grid: Leaderboard Table & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <GlassCard className="p-5 space-y-4">
          <h2 className="text-base font-bold text-foreground font-display border-b border-border/50 pb-3">Top Paper Traders</h2>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div key={user.rank} className="p-3.5 rounded-2xl bg-foreground/5 border border-border/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 dark:text-amber-400 font-bold flex items-center justify-center font-mono">
                    #{user.rank}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{user.username}</h3>
                    <span className="text-[10px] text-muted-foreground font-mono">{user.totalTrades} Trades • Win Rate: {user.winRate}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">+{user.returnPercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Achievements */}
        <GlassCard className="p-5 space-y-4">
          <h2 className="text-base font-bold text-foreground font-display border-b border-border/50 pb-3">Unlocked Achievements</h2>
          <div className="space-y-3">
            {achievements.map((ach) => (
              <div key={ach.id} className="p-3.5 rounded-2xl bg-foreground/5 border border-border/50 flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${ach.isUnlocked ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/20 text-muted-foreground'}`}>
                    {ach.isUnlocked ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{ach.title}</h3>
                    <p className="text-[11px] text-muted-foreground">{ach.description}</p>
                  </div>
                </div>
                <Badge variant={ach.isUnlocked ? 'emerald' : 'purple'}>
                  {ach.isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                </Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
