import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '@/utils/cn';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockTrending = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 132.40, change: '+3.45%', isPos: true },
  { symbol: 'AAPL', name: 'Apple Inc', price: 224.50, change: '+1.84%', isPos: true },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 248.60, change: '+4.25%', isPos: true },
  { symbol: 'BTC/USD', name: 'Bitcoin Spot', price: 67450.00, change: '+3.82%', isPos: true },
];

const mockRecent = ['NIFTY 50', 'RELIANCE', 'MICROSOFT', 'AMD', 'ETH/USD'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent state
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (symbol: string) => {
    onClose();
    navigate(`/stock/${symbol}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl glass-card p-4 border border-white/15 rounded-[24px] bg-[#070c1e]/95 shadow-2xl space-y-4 overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center border-b border-white/10 pb-3">
              <Search className="w-5 h-5 text-emerald-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stocks, indices, crypto, or AI signals... (e.g. NVDA)"
                className="w-full bg-transparent text-white placeholder:text-slate-400 text-sm font-sans focus:outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trending Stocks */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Trending Tickers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mockTrending.map((item) => (
                  <div
                    key={item.symbol}
                    onClick={() => handleSelect(item.symbol)}
                    className="p-3 rounded-xl glass-panel flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                  >
                    <div>
                      <div className="font-extrabold text-xs text-white font-mono">{item.symbol}</div>
                      <div className="text-[10px] text-slate-400">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-white">
                        {typeof item.price === 'number' ? formatCurrency(item.price) : item.price}
                      </div>
                      <div className="text-[10px] font-bold text-emerald-400">{item.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Recent Searches</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {mockRecent.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSelect(tag)}
                    className="px-3 py-1 rounded-full glass-pill text-xs text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{tag}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
