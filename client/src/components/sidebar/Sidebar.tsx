import React from 'react';
import { NavLink } from 'react-router-dom';
import { MAIN_NAV_ITEMS } from '@/constants';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  PieChart,
  Star,
  Sparkles,
  Newspaper,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  PieChart: <PieChart className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Newspaper: <Newspaper className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse, className }) => {
  return (
    <aside
      className={cn(
        'relative h-[calc(100vh-4rem)] glass-panel border-r border-border/40 flex flex-col justify-between transition-all duration-300 z-30 select-none',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full glass-panel border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer shadow-md z-40"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Main Navigation List */}
      <div className="p-3 space-y-1.5 overflow-y-auto">
        {MAIN_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group relative',
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-md font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className={cn('transition-colors', isActive ? 'text-primary' : 'group-hover:text-foreground')}>
                  {iconMap[item.iconName]}
                </span>

                {!collapsed && (
                  <span className="flex-1 truncate tracking-tight">{item.label}</span>
                )}

                {!collapsed && item.badge && (
                  <Badge variant="emerald" className="text-[9px] px-1.5 py-0">
                    {item.badge}
                  </Badge>
                )}

                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Card - AI Pro Status */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-emerald-100 via-white to-white dark:from-emerald-950/40 dark:via-purple-950/20 dark:to-card border border-emerald-500/20 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Market Intelligence Active</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Data-driven technical indicators & portfolio analytics active.
          </p>
        </div>
      )}
    </aside>
  );
};
