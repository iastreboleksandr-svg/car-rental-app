'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function PublicRoute({ children, redirectTo = '/search' }: PublicRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const blocked = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true' || isAuthenticated;

  useEffect(() => {
    if (blocked) {
      router.replace(redirectTo);
    }
  }, [blocked, redirectTo, router]);

  if (blocked) return null;

  return <>{children}</>;
}
