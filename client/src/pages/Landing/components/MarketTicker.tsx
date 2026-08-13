import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const initialTickers: TickerItem[] = [
  { symbol: 'AAPL', price: '$224.50', change: '+1.84%', isPositive: true },
  { symbol: 'TSLA', price: '$248.60', change: '+4.25%', isPositive: true },
  { symbol: 'GOOGL', price: '$172.80', change: '-0.45%', isPositive: false },
  { symbol: 'MSFT', price: '$448.90', change: '+1.12%', isPositive: true },
  { symbol: 'NVDA', price: '$132.40', change: '+3.45%', isPositive: true },
  { symbol: 'META', price: '$512.30', change: '+2.10%', isPositive: true },
  { symbol: 'BTC/USD', price: '$67,450.00', change: '+3.80%', isPositive: true },
  { symbol: 'ETH/USD', price: '$3,480.20', change: '+2.65%', isPositive: true },
  { symbol: 'RELIANCE', price: '₹3,020.50', change: '+0.95%', isPositive: true },
  { symbol: 'TCS', price: '₹4,250.00', change: '-0.30%', isPositive: false },
  { symbol: 'INFY', price: '₹1,840.10', change: '+1.40%', isPositive: true },
  { symbol: 'HDFC', price: '₹1,680.00', change: '+0.75%', isPositive: true },
];

export const MarketTicker: React.FC = () => {
  const [tickers, setTickers] = useState<TickerItem[]>(initialTickers);

  // Micro-animation simulating real-time tick updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          if (Math.random() > 0.6) {
            const currentVal = parseFloat(t.price.replace(/[^0-9.]/g, ''));
            const delta = (Math.random() * 0.8 - 0.35) * (currentVal * 0.005);
            const newVal = Math.max(1, currentVal + delta);
            const isPos = delta >= 0;
            const prefix = t.price.startsWith('₹') ? '₹' : '$';
            const changeVal = ((delta / currentVal) * 100).toFixed(2);
            return {
              ...t,
              price: `${prefix}${newVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              change: `${isPos ? '+' : ''}${changeVal}%`,
              isPositive: isPos,
            };
          }
          return t;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#050816]/90 border-y border-white/10 py-3 overflow-hidden select-none backdrop-blur-md z-20">
      <div className="flex w-max animate-marquee space-x-8 hover:[animation-play-state:paused]">
        {[...tickers, ...tickers].map((ticker, idx) => (
          <div
            key={`${ticker.symbol}-${idx}`}
            className="flex items-center space-x-2.5 px-4 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-white/[0.08]"
          >
            <span className="font-mono font-extrabold text-xs text-white tracking-wider">
              {ticker.symbol}
            </span>
            <span className="font-mono text-xs text-slate-300">{ticker.price}</span>
            <span
              className={`flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                ticker.isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {ticker.isPositive ? (
                <TrendingUp className="w-3 h-3 mr-0.5" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-0.5" />
              )}
              {ticker.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
