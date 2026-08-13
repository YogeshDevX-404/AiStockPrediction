import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Star, Sparkles, Bot, User } from 'lucide-react';
import { ROUTES } from '@/constants';
import { cn } from '@/utils/cn';

export const MobileBottomNav: React.FC = () => {
  const items = [
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Watchlist', href: ROUTES.WATCHLIST, icon: <Star className="w-5 h-5" /> },
    { label: 'AI Signals', href: ROUTES.PREDICTION, icon: <Sparkles className="w-5 h-5" /> },
    { label: 'AI Chat', href: ROUTES.CHAT, icon: <Bot className="w-5 h-5" /> },
    { label: 'Profile', href: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#050816]/95 border-t border-white/10 backdrop-blur-lg px-2 py-2 lg:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center space-y-1 px-3 py-1 rounded-xl text-[10px] font-bold transition-all',
                isActive ? 'text-primary' : 'text-slate-400 hover:text-white'
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
