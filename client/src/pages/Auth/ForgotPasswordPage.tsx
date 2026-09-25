import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/inputs/Input';
import { Mail, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/constants';
import { toast } from 'react-hot-toast';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success('Password reset link sent!');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-foreground flex items-center justify-center p-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-emerald-500/30">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-blue-600/20 to-emerald-600/20 blur-[150px] pointer-events-none rounded-full" />

      <GlassCard className="w-full max-w-md p-8 space-y-6 relative z-10 border border-white/15 rounded-[32px] bg-[#070c1d]/90 shadow-2xl backdrop-blur-2xl">
        {!isSubmitted ? (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-black font-display text-foreground">Reset Password</h1>
              <p className="text-xs text-muted-foreground">
                Enter your account email address and we'll send you a password reset link.
              </p>
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

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-xl shadow-emerald-950/50"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground font-display">Reset Link Sent!</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We sent a password reset link to <strong className="text-foreground">{email}</strong>. Please check your inbox.
            </p>
          </motion.div>
        )}

        <div className="text-center pt-2 border-t border-border/50">
          <Link to={ROUTES.LOGIN} className="text-xs font-bold text-muted-foreground hover:text-foreground inline-flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Sign In
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};
