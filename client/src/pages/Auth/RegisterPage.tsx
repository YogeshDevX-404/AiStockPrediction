import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Checkbox } from '@/components/inputs/Checkbox';
import { TrendingUp, Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!acceptTerms) {
      toast.error('You must accept the Terms of Service');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(
        {
          id: `usr_${Date.now()}`,
          fullName: fullName || 'New Trader',
          username: username || 'trader',
          email,
          phone,
          country: 'United States',
          role: 'USER',
          status: 'UNVERIFIED',
          isVerified: false,
          googleId: null,
          provider: 'EMAIL',
          createdAt: new Date().toISOString(),
        },
        'token_new_user_reg'
      );
      toast.success('Registration successful! Please check your email to verify your account.');
      setIsLoading(false);
      navigate(ROUTES.DASHBOARD);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-emerald-500/30">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-emerald-600/20 to-blue-600/20 blur-[150px] pointer-events-none rounded-full animate-pulse" />

      <GlassCard className="w-full max-w-xl p-8 space-y-6 relative z-10 border border-white/15 rounded-[32px] bg-[#070c1d]/90 shadow-2xl backdrop-blur-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-purple-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black font-display text-white">Create Pro Account</h1>
          <p className="text-xs text-slate-400">Join over 50,000 quantitative traders leveraging autonomous AI signals.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="Alex Mercer"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />
            <Input
              label="Username"
              placeholder="alexmercer"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="alex@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              helperText="Min 8 chars (1 upper, 1 lower, 1 number, 1 symbol)"
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />
          </div>

          <div className="pt-2">
            <Checkbox
              label="I accept the TradeGenius AI Terms of Service and Privacy Policy"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full shadow-xl shadow-emerald-950/50"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Free Account
          </Button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-emerald-400 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};
