import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Checkbox } from '@/components/inputs/Checkbox';
import { TrendingUp, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('alex.investor@tradegenius.ai');
  const [password, setPassword] = useState('Password123!');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(
        {
          id: 'usr_demo_123',
          fullName: 'Alex Mercer',
          username: 'alexmercer',
          email,
          phone: '+1 555 019 2834',
          country: 'United States',
          profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          role: 'PREMIUM',
          status: 'ACTIVE',
          isVerified: true,
          googleId: null,
          provider: 'EMAIL',
          createdAt: new Date().toISOString(),
        },
        'token_jwt_demo_access_tradegenius'
      );
      toast.success('Welcome back, Alex!');
      setIsLoading(false);
      navigate(ROUTES.DASHBOARD);
    }, 800);
  };

  const handleGoogleLogin = () => {
    toast.loading('Redirecting to Google OAuth...');
    setTimeout(() => {
      toast.dismiss();
      login(
        {
          id: 'usr_google_123',
          fullName: 'Google Trader',
          username: 'googletrader',
          email: 'google.trader@tradegenius.ai',
          profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          role: 'USER',
          status: 'ACTIVE',
          isVerified: true,
          googleId: 'google_id_123',
          provider: 'GOOGLE',
          createdAt: new Date().toISOString(),
        },
        'token_google_oauth_tradegenius'
      );
      navigate(ROUTES.DASHBOARD);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-emerald-500/30">
      {/* Animated Aurora Background Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-600/20 via-blue-600/20 to-purple-600/20 blur-[150px] pointer-events-none rounded-full animate-pulse" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side: Animated Illustration & Value Proposition */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block lg:col-span-6 space-y-6 text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-3xl font-black font-display tracking-tight text-white leading-tight">
            Autonomous AI Market <br />
            <span className="emerald-gradient-text">Intelligence Portal</span>
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Access sub-millisecond stock predictions, level-2 order depth metrics, and real-time sentiment alerts engineered for quantitative traders.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span>94.8% Model Signal Target Accuracy</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <div className="p-1 rounded-full bg-purple-500/20 text-purple-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span>ChatGPT-5 Powered Financial Co-Pilot</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Modern Glassmorphism Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6"
        >
          <GlassCard className="p-8 space-y-6 border border-white/15 rounded-[32px] bg-[#070c1d]/90 shadow-2xl backdrop-blur-2xl">
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl font-black font-display text-white">Sign In</h1>
              <p className="text-xs text-slate-400">Enter your credentials to access your TradeGenius AI account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />

              <div className="flex items-center justify-between text-xs pt-1">
                <Checkbox
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Link to="/auth/forgot-password" className="text-emerald-400 hover:underline font-bold">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-xl shadow-emerald-950/50"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to Account
              </Button>
            </form>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#070c1d] px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
                Or Continue With
              </span>
            </div>

            <Button
              type="button"
              variant="glass"
              size="lg"
              className="w-full text-xs font-bold space-x-2"
              onClick={handleGoogleLogin}
            >
              <svg className="w-4 h-4 mr-2 inline" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.30 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>Sign In with Google</span>
            </Button>

            <div className="text-center text-xs text-slate-400 pt-2">
              Don't have an account yet?{' '}
              <Link to={ROUTES.REGISTER} className="text-emerald-400 font-bold hover:underline">
                Create Free Account
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};
