import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  updateUser: (userPartial: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 'usr_demo_123',
        fullName: 'Alex Mercer',
        username: 'alexmercer',
        email: 'alex.investor@tradegenius.ai',
        phone: '+1 555 019 2834',
        country: 'United States',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'PREMIUM',
        status: 'ACTIVE',
        isVerified: true,
        googleId: null,
        provider: 'EMAIL',
        createdAt: new Date().toISOString(),
      },
      token: 'mock_jwt_access_token_tradegenius_ai',
      isAuthenticated: true,
      isLoading: false,

      login: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
        }
        set({ user, token, isAuthenticated: true, isLoading: false });
      },

      updateUser: (userPartial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userPartial } : null,
        })),

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'tradegenius-auth',
    }
  )
);
