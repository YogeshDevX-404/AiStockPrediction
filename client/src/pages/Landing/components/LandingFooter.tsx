import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Terminal, Shield, Lock, Twitter, Github, Linkedin, Disc as Discord } from 'lucide-react';
import { ROUTES } from '@/constants';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#030611] border-t border-border/50 pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-muted-foreground text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-border/50">
        {/* Brand Summary */}
        <div className="md:col-span-2 space-y-4">
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 via-blue-500 to-purple-600 flex items-center justify-center text-foreground shadow-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xl font-black font-display text-foreground">
              Trade<span className="emerald-gradient-text">Genius</span> AI
            </span>
          </Link>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Enterprise-grade stock intelligence platform combining sub-millisecond market depth with autonomous neural models for alpha generation.
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <a href="#" className="p-2 rounded-xl glass-pill hover:text-foreground transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-xl glass-pill hover:text-foreground transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-xl glass-pill hover:text-foreground transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-xl glass-pill hover:text-foreground transition-colors"><Discord className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Product Navigation */}
        <div className="space-y-3">
          <div className="font-bold text-foreground uppercase tracking-wider text-[11px] font-display">Navigation</div>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-foreground transition-colors">Home</a></li>
            <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
            <li><a href="#markets" className="hover:text-foreground transition-colors">Live Markets</a></li>
            <li><a href="#prediction" className="hover:text-foreground transition-colors">AI Signals</a></li>
            <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing Plans</a></li>
          </ul>
        </div>

        {/* Company & Resources */}
        <div className="space-y-3">
          <div className="font-bold text-foreground uppercase tracking-wider text-[11px] font-display">Resources</div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-foreground transition-colors">Quant Research Docs</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">API Documentation</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Model Benchmark Report</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">System Status</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Security Audit</a></li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div className="space-y-3">
          <div className="font-bold text-foreground uppercase tracking-wider text-[11px] font-display">Legal & Security</div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Risk Disclosure Statement</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Regulatory Compliance</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Cookie Preferences</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>© {new Date().getFullYear()} TradeGenius AI Inc. Built for institutional intelligence.</span>
        </div>

        <div className="flex items-center space-x-6 text-[11px]">
          <span className="flex items-center"><Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-1" /> 256-Bit SSL Encrypted</span>
          <span className="flex items-center"><Lock className="w-3.5 h-3.5 text-blue-400 mr-1" /> FINRA / SEC Compliant Infrastructure</span>
        </div>
      </div>
    </footer>
  );
};
