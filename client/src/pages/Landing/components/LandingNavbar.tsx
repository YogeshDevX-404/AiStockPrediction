import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/buttons/Button';
import { TrendingUp, Menu, X, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants';

export const LandingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Markets', href: '#markets' },
    { label: 'AI Prediction', href: '#prediction' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-border/50 px-4 sm:px-6 lg:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to={ROUTES.HOME} className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-6 h-6 text-foreground" />
          </div>
          <span className="text-xl font-black font-display tracking-tight text-foreground">
            Trade<span className="emerald-gradient-text">Genius</span>
            <span className="ml-1 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              AI
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-emerald-600 dark:text-emerald-400 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/10 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 glass-card border border-border/50 rounded-2xl space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-muted-foreground hover:text-emerald-600 dark:text-emerald-400 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-border/50 flex flex-col gap-2">
            <Link to={ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full">
                Login
              </Button>
            </Link>
            <Link to={ROUTES.REGISTER} onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
