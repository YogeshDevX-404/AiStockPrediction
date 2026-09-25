import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Lock, Check, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { ROUTES } from '@/constants';
import { toast } from 'react-hot-toast';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Live password policy checks
  const checks = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const score = Object.values(checks).filter(Boolean).length;
  const strengthLabels = ['Empty', 'Weak', 'Fair', 'Strong', 'Excellent'];
  const strengthColors = ['bg-slate-700', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (score < 4) {
      toast.error('Please choose a stronger password matching the security policy.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password updated successfully! Please log in.');
      navigate(ROUTES.LOGIN);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-foreground flex items-center justify-center p-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-emerald-500/30">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-600/20 via-purple-600/20 to-blue-600/20 blur-[150px] pointer-events-none rounded-full" />

      <GlassCard className="w-full max-w-md p-8 space-y-6 relative z-10 border border-white/15 rounded-[32px] bg-[#070c1d]/90 shadow-2xl backdrop-blur-2xl">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-purple-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <ShieldCheck className="w-6 h-6 text-foreground" />
          </div>
          <h1 className="text-2xl font-black font-display text-foreground">Create New Password</h1>
          <p className="text-xs text-muted-foreground">Choose a new secure password for your TradeGenius AI account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          {/* Password Strength Meter */}
          {newPassword && (
            <div className="space-y-2 p-3 rounded-xl bg-foreground/5 border border-border/50 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span className="text-muted-foreground">Password Strength:</span>
                <span className={score >= 4 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'}>
                  {strengthLabels[score > 4 ? 4 : score]}
                </span>
              </div>
              <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden flex space-x-1">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-full flex-1 transition-all duration-300 ${
                      idx < score ? strengthColors[score] : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1 text-muted-foreground">
                <span className={`flex items-center ${checks.length ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                  {checks.length ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1 text-slate-600" />} Min 8 characters
                </span>
                <span className={`flex items-center ${checks.uppercase ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                  {checks.uppercase ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1 text-slate-600" />} 1 Uppercase
                </span>
                <span className={`flex items-center ${checks.lowercase ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                  {checks.lowercase ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1 text-slate-600" />} 1 Lowercase
                </span>
                <span className={`flex items-center ${checks.number ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                  {checks.number ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1 text-slate-600" />} 1 Number
                </span>
                <span className={`flex items-center ${checks.special ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                  {checks.special ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1 text-slate-600" />} 1 Symbol
                </span>
              </div>
            </div>
          )}

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full shadow-xl shadow-emerald-950/50"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Update Password
          </Button>
        </form>
      </GlassCard>
    </div>
  );
};
