import React, { useState } from 'react';
import { Avatar } from '../ui/Avatar';
import { Dropdown } from '../ui/Dropdown';
import { Badge } from '../ui/Badge';
import { SearchModal } from '../modals/SearchModal';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import { Sun, Moon, Laptop, Bell, LogOut, User as UserIcon, Settings, Menu, TrendingUp, Search, Plus, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { theme, setTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const navigate = useNavigate();

  const themeIcons = {
    dark: <Moon className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    light: <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
    system: <Laptop className="w-4 h-4 text-blue-400" />,
  };

  const themeDropdownItems = [
    { label: 'Dark Mode', icon: <Moon className="w-4 h-4" />, onClick: () => setTheme('dark') },
    { label: 'Light Mode', icon: <Sun className="w-4 h-4" />, onClick: () => setTheme('light') },
    { label: 'System Mode', icon: <Laptop className="w-4 h-4" />, onClick: () => setTheme('system') },
  ];

  const profileDropdownItems = [
    { label: 'Account Profile', icon: <UserIcon className="w-4 h-4" />, onClick: () => navigate('/profile') },
    { label: 'Preferences', icon: <Settings className="w-4 h-4" />, onClick: () => navigate(ROUTES.SETTINGS) },
    { label: 'Sign Out', icon: <LogOut className="w-4 h-4" />, onClick: () => logout(), danger: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-border/40 px-4 md:px-6 py-3 transition-all duration-200">
        <div className="flex items-center justify-between gap-4">
          {/* Left Side: Brand Logo & Mobile Sidebar Trigger */}
          <div className="flex items-center space-x-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 lg:hidden cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <Link to={ROUTES.DASHBOARD} className="flex items-center space-x-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 text-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="text-base font-extrabold tracking-tight font-display text-foreground">
                  Trade<span className="emerald-gradient-text">Genius</span>
                </span>
                <span className="ml-1 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  AI
                </span>
              </div>
            </Link>

            {/* Market Status Badges */}
            <div className="hidden xl:flex items-center space-x-2 text-[11px] font-bold">
              <span className="flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-500 dark:bg-emerald-400 mr-1.5 animate-ping" />
                NYSE: OPEN
              </span>
              <span className="flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-500 dark:bg-emerald-400 mr-1.5 animate-ping" />
                NSE: OPEN
              </span>
            </div>
          </div>

          {/* Center: Search Trigger Input */}
          <div className="flex-1 max-w-md hidden sm:block">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="w-full glass-panel border border-border/50 rounded-full px-4 py-2 text-xs text-muted-foreground flex items-center justify-between hover:border-border transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400" />
                <span>Search stocks, crypto, AI signals...</span>
              </div>
              <kbd className="px-2 py-0.5 rounded-md bg-foreground/5 text-[10px] font-mono text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Side: Quick Actions & Profile */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Theme Switcher Dropdown */}
            <Dropdown
              trigger={
                <button className="p-2.5 rounded-xl glass-pill hover:bg-foreground/5 text-muted-foreground transition-colors cursor-pointer">
                  {themeIcons[theme]}
                </button>
              }
              items={themeDropdownItems}
            />

            {/* Notifications Button */}
            <button className="relative p-2.5 rounded-xl glass-pill hover:bg-foreground/5 text-muted-foreground transition-colors cursor-pointer">
              <Bell className="w-4 h-4 text-foreground/80" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-[10px] font-bold text-foreground rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <Dropdown
              trigger={
                <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-foreground/5 transition-colors">
                  <Avatar src={user?.profileImage} name={user?.fullName || 'User'} size="sm" />
                  <div className="hidden md:block text-left pr-1">
                    <div className="text-xs font-bold text-foreground leading-tight">{user?.fullName}</div>
                    <Badge variant="purple" className="text-[9px] px-1.5 py-0">{user?.role || 'PRO'}</Badge>
                  </div>
                </div>
              }
              items={profileDropdownItems}
            />
          </div>
        </div>
      </header>

      {/* Autocomplete Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
