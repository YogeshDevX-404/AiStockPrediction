export interface AdminUserItem {
  id: string;
  fullName: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'SUPPORT' | 'VIEWER' | 'USER' | 'PREMIUM';
  status: 'ACTIVE' | 'SUSPENDED' | 'UNVERIFIED';
  subscriptionPlan: 'FREE' | 'PRO' | 'ENTERPRISE';
  lastLogin: string;
  country: string;
  createdAt: string;
}

export interface SystemHealthMetrics {
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  dbStatus: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  redisStatus: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  apiStatus: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  uptimeSeconds: number;
  activeWebsockets: number;
}

export interface ProviderItem {
  id: string;
  name: string;
  providerType: 'MARKET' | 'NEWS' | 'AI' | 'VISION';
  isEnabled: boolean;
  priority: number;
  status: 'HEALTHY' | 'DEGRADED' | 'FAILING';
}

export interface AuditLogItem {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'SUCCESS' | 'DENIED' | 'FAILED';
  timestamp: string;
}

export interface FeatureFlagItem {
  id: string;
  key: string;
  name: string;
  description: string;
  isEnabled: boolean;
}

export class AdminService {
  public static async getUsers(): Promise<AdminUserItem[]> {
    return [
      { id: 'usr-1', fullName: 'Alex Rivera', email: 'alex@tradegenius.ai', role: 'SUPER_ADMIN', status: 'ACTIVE', subscriptionPlan: 'ENTERPRISE', lastLogin: '2026-03-25T14:30:00Z', country: 'United States', createdAt: '2025-01-10' },
      { id: 'usr-2', fullName: 'Sarah Chen', email: 'sarah.chen@quantfund.io', role: 'ADMIN', status: 'ACTIVE', subscriptionPlan: 'PRO', lastLogin: '2026-03-25T11:15:00Z', country: 'Singapore', createdAt: '2025-03-22' },
      { id: 'usr-3', fullName: 'Michael Scott', email: 'mscott@dundermifflin.com', role: 'USER', status: 'SUSPENDED', subscriptionPlan: 'FREE', lastLogin: '2026-03-10T09:00:00Z', country: 'United States', createdAt: '2025-06-15' },
    ];
  }

  public static async updateUserStatus(userId: string, status: string): Promise<boolean> {
    return true;
  }

  public static async deleteUser(userId: string): Promise<boolean> {
    return true;
  }

  public static async getSystemHealth(): Promise<SystemHealthMetrics> {
    return {
      cpuUsagePercent: 24.5,
      memoryUsagePercent: 42.8,
      dbStatus: 'HEALTHY',
      redisStatus: 'HEALTHY',
      apiStatus: 'ONLINE',
      uptimeSeconds: 1452800,
      activeWebsockets: 1420,
    };
  }

  public static async getProviders(): Promise<ProviderItem[]> {
    return [
      { id: 'pvd-1', name: 'Alpha Vantage Realtime API', providerType: 'MARKET', isEnabled: true, priority: 1, status: 'HEALTHY' },
      { id: 'pvd-2', name: 'Yahoo Finance Service Engine', providerType: 'MARKET', isEnabled: true, priority: 2, status: 'HEALTHY' },
      { id: 'pvd-3', name: 'FinBERT NLP Sentiment Provider', providerType: 'NEWS', isEnabled: true, priority: 1, status: 'HEALTHY' },
      { id: 'pvd-4', name: 'OpenAI GPT-4o Vision Adapter', providerType: 'VISION', isEnabled: true, priority: 1, status: 'HEALTHY' },
    ];
  }

  public static async toggleProvider(providerId: string, isEnabled: boolean): Promise<boolean> {
    return true;
  }

  public static async getAuditLogs(): Promise<AuditLogItem[]> {
    return [
      { id: 'log-1', userId: 'usr-1', userEmail: 'alex@tradegenius.ai', action: 'UPDATE_PROVIDER_STATUS', resource: 'Alpha Vantage API', ipAddress: '192.168.1.1', status: 'SUCCESS', timestamp: '2026-03-25T14:32:00Z' },
      { id: 'log-2', userId: 'usr-2', userEmail: 'sarah.chen@quantfund.io', action: 'SUSPEND_USER', resource: 'usr-3', ipAddress: '10.0.0.45', status: 'SUCCESS', timestamp: '2026-03-24T18:00:00Z' },
    ];
  }

  public static async getFeatureFlags(): Promise<FeatureFlagItem[]> {
    return [
      { id: 'ff-1', key: 'ENABLE_VISION_AI', name: 'AI Vision Screenshot Analysis', description: 'Enable TradingView screenshot OCR & pattern detection engine.', isEnabled: true },
      { id: 'ff-2', key: 'ENABLE_CANDLESTICK_INTEL', name: 'Candlestick Pattern Intelligence', description: 'Enable multi-candle pattern confidence scoring.', isEnabled: true },
      { id: 'ff-3', key: 'ENABLE_BETA_QUANT_MODELS', name: 'Experimental Monte Carlo Engine', description: 'Enable 10K Monte Carlo simulation stress testing.', isEnabled: false },
    ];
  }
}
