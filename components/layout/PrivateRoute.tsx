'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const allowed = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true' || isAuthenticated;

  useEffect(() => {
    if (!allowed) {
      router.replace('/login');
    }
  }, [allowed, router]);

  if (!allowed) return null;

  return <>{children}</>;
}
