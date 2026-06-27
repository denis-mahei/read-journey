'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useAuthHydration } from '@/hooks/use-auth-hydration';
import { useAuthStore } from '@/store/auth-store';

interface GuestRouteGuardProps {
  children: React.ReactNode;
}

const GuestRouteGuard = ({ children }: GuestRouteGuardProps) => {
  const router = useRouter();
  const isHydrated = useAuthHydration();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!isHydrated) return;

    if (token) {
      router.replace(ROUTES.recommended);
    }
  }, [isHydrated, token, router]);

  if (!isHydrated || token) {
    return null;
  }

  return <>{children}</>;
};

export default GuestRouteGuard;
