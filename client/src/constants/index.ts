export const APP_NAME = 'TradeGenius AI';
export const APP_TAGLINE = 'Enterprise Stock Intelligence Powered by AI';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  PORTFOLIO: '/portfolio',
  WATCHLIST: '/watchlist',
  STOCK_DETAILS: '/stock/:symbol',
  PREDICTION: '/prediction',
  ANALYSIS: '/analysis',
  NEWS: '/news',
  ALERTS: '/alerts',
  NOTIFICATIONS: '/notifications',
  CHAT: '/chat',
  SETTINGS: '/settings',
  ADMIN: '/admin',
} as const;

export interface NavItem {
  label: string;
  href: string;
  iconName: string;
  badge?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, iconName: 'LayoutDashboard' },
  { label: 'Portfolio', href: ROUTES.PORTFOLIO, iconName: 'PieChart' },
  { label: 'Watchlist', href: ROUTES.WATCHLIST, iconName: 'Star' },
  { label: 'AI Signals', href: ROUTES.PREDICTION, iconName: 'Sparkles', badge: 'AI' },
  { label: 'Market News', href: ROUTES.NEWS, iconName: 'Newspaper' },
  { label: 'AI Assistant', href: ROUTES.CHAT, iconName: 'Bot' },
  { label: 'Settings', href: ROUTES.SETTINGS, iconName: 'Settings' },
];
