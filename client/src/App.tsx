import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from '@/routes/AppRouter';
import { useThemeStore } from '@/store/useThemeStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on mount
    setTheme(theme);
  }, [setTheme, theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
    </QueryClientProvider>
  );
};
