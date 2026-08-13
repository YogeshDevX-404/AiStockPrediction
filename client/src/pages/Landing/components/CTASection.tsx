import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/buttons/Button';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative glass-card p-10 sm:p-16 rounded-[40px] border border-emerald-500/40 bg-gradient-to-r from-emerald-950/50 via-[#0a142c] to-purple-950/40 text-center space-y-8 overflow-hidden shadow-2xl"
      >
        {/* Glow Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/20 via-blue-500/20 to-purple-500/20 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-pill border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>JOIN THE FUTURE OF QUANTITATIVE TRADING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Ready to <span className="emerald-gradient-text">Trade Smarter?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Start using autonomous AI market signals today. Create your free account in under 60 seconds.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link to={ROUTES.REGISTER}>
            <Button variant="primary" size="lg" className="px-10 py-4 text-base shadow-xl shadow-emerald-950/60" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Start Free
            </Button>
          </Link>
          <Link to={ROUTES.LOGIN}>
            <Button variant="glass" size="lg" className="px-10 py-4 text-base">
              Sign In to Portal
            </Button>
          </Link>
        </div>

        <div className="relative z-10 flex items-center justify-center space-x-6 text-xs text-slate-400 pt-4">
          <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5" /> No Credit Card Required</span>
          <span>•</span>
          <span>Instant Setup</span>
          <span>•</span>
          <span>Cancel Anytime</span>
        </div>
      </motion.div>
    </section>
  );
};
