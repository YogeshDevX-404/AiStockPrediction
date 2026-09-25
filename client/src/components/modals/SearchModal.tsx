import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/utils/cn';
import { apiClient } from '@/api';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res: any = await apiClient.get(`/market/search?query=${encodeURIComponent(query.trim())}`);
        if (res && res.success && Array.isArray(res.data)) {
          setSearchResults(res.data);
        }
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const defaultTrending = [
    { symbol: 'NVDA', name: 'NVIDIA Corp' },
    { symbol: 'AAPL', name: 'Apple Inc' },
    { symbol: 'TSLA', name: 'Tesla Inc' },
    { symbol: 'MSFT', name: 'Microsoft Corp' },
  ];

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
            <div className="relative flex items-center border-b border-border/50 pb-3">
              <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ticker symbol (e.g. NVDA, AAPL, TSLA)..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-sans focus:outline-none"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-xs text-muted-foreground hover:text-foreground mr-2">
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results or Quick Links */}
            {query.trim() ? (
              <div className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {isSearching ? 'Searching market...' : `Results for "${query}"`}
                </div>
                {searchResults.length > 0 ? (
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {searchResults.map((item: any) => (
                      <div
                        key={item.symbol}
                        onClick={() => handleSelect(item.symbol)}
                        className="p-3 rounded-xl glass-panel flex items-center justify-between hover:bg-foreground/10 transition-colors cursor-pointer border border-border/40"
                      >
                        <div>
                          <div className="font-extrabold text-xs text-foreground font-mono">{item.symbol}</div>
                          <div className="text-[10px] text-muted-foreground">{item.description || item.displaySymbol}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    ))}
                  </div>
                ) : !isSearching ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    No ticker symbols found matching "{query}". Try pressing Enter to view ticker <button onClick={() => handleSelect(query.toUpperCase())} className="text-emerald-600 dark:text-emerald-400 underline">{query.toUpperCase()}</button>.
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Popular Tickers</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {defaultTrending.map((item) => (
                    <div
                      key={item.symbol}
                      onClick={() => handleSelect(item.symbol)}
                      className="p-3 rounded-xl glass-panel text-center hover:bg-foreground/10 transition-colors cursor-pointer border border-border/40 space-y-1"
                    >
                      <div className="font-extrabold text-xs text-foreground font-mono">{item.symbol}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
