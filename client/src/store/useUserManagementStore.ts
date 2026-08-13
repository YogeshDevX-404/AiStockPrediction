import { create } from 'zustand';
import { AdminUserItem, AdminApi } from '@/services/api/adminApi';
import { toast } from 'react-hot-toast';

interface UserManagementState {
  users: AdminUserItem[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
  updateUserStatus: (id: string, status: 'ACTIVE' | 'SUSPENDED') => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserManagementStore = create<UserManagementState>((set) => ({
  users: [
    { id: 'usr-1', fullName: 'Alex Rivera', email: 'alex@tradegenius.ai', role: 'SUPER_ADMIN', status: 'ACTIVE', subscriptionPlan: 'ENTERPRISE', lastLogin: '2026-03-25T14:30:00Z', country: 'United States', createdAt: '2025-01-10' },
    { id: 'usr-2', fullName: 'Sarah Chen', email: 'sarah.chen@quantfund.io', role: 'ADMIN', status: 'ACTIVE', subscriptionPlan: 'PRO', lastLogin: '2026-03-25T11:15:00Z', country: 'Singapore', createdAt: '2025-03-22' },
    { id: 'usr-3', fullName: 'Michael Scott', email: 'mscott@dundermifflin.com', role: 'USER', status: 'SUSPENDED', subscriptionPlan: 'FREE', lastLogin: '2026-03-10T09:00:00Z', country: 'United States', createdAt: '2025-06-15' },
  ],
  isLoading: false,

  fetchUsers: async () => {
    try {
      set({ isLoading: true });
      const users = await AdminApi.getUsers();
      set({ users, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  updateUserStatus: async (id, status) => {
    try {
      await AdminApi.updateUserStatus(id, status);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, status } : u)),
      }));
      toast.success(`User status updated to ${status}.`);
    } catch {
      toast.error('Failed to update user status.');
    }
  },

  deleteUser: async (id) => {
    try {
      await AdminApi.deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
      toast.success('User account deleted.');
    } catch {
      toast.error('Failed to delete user.');
    }
  },
}));
