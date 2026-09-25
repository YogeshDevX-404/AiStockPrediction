import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { AuthService } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/constants';

export const OAuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  // Ref to prevent double execution in React strict mode
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (hasAttempted.current) return;
    hasAttempted.current = true;

    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      toast.error(`Authentication error: ${error.replace(/_/g, ' ')}`);
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    if (!code) {
      toast.error('No authorization code found');
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    const exchangeCode = async () => {
      try {
        const response: any = await AuthService.exchangeGoogleCode(code);
        if (response && response.success && response.data) {
          const { user, accessToken } = response.data;
          login(user, accessToken);
          toast.success(`Welcome back, ${user.fullName || 'Trader'}!`);
          navigate(ROUTES.DASHBOARD, { replace: true });
        } else {
          toast.error(response?.message || 'Failed to authenticate');
          navigate(ROUTES.LOGIN, { replace: true });
        }
      } catch (err: any) {
        console.error('OAuth exchange error:', err);
        toast.error(err?.response?.data?.message || err?.message || 'Authentication error');
        navigate(ROUTES.LOGIN, { replace: true });
      }
    };

    exchangeCode();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">Authenticating...</p>
      </div>
    </div>
  );
};
