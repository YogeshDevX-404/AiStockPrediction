import { apiClient } from '@/api';

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

export const AdminApi = {
  getUsers: async (): Promise<AdminUserItem[]> => {
    const response: any = await apiClient.get('/admin/users');
    return response.data;
  },

  updateUserStatus: async (id: string, status: string): Promise<boolean> => {
    const response: any = await apiClient.put(`/admin/users/${id}`, { status });
    return response.data.updated;
  },

  deleteUser: async (id: string): Promise<boolean> => {
    const response: any = await apiClient.delete(`/admin/users/${id}`);
    return response.data.deleted;
  },

  getSystemHealth: async (): Promise<SystemHealthMetrics> => {
    const response: any = await apiClient.get('/admin/system-health');
    return response.data;
  },

  getProviders: async (): Promise<ProviderItem[]> => {
    const response: any = await apiClient.get('/admin/providers');
    return response.data;
  },

  toggleProvider: async (id: string, isEnabled: boolean): Promise<boolean> => {
    const response: any = await apiClient.put(`/admin/providers/${id}`, { isEnabled });
    return response.data.updated;
  },

  getAuditLogs: async (): Promise<AuditLogItem[]> => {
    const response: any = await apiClient.get('/admin/logs');
    return response.data;
  },

  getFeatureFlags: async (): Promise<FeatureFlagItem[]> => {
    const response: any = await apiClient.get('/admin/flags');
    return response.data;
  },
};
