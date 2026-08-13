import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/constants';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
};

export const GuestRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <Outlet />;
};
