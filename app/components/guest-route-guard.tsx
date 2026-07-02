'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useAuthHydration } from '@/hooks/use-auth-hydration';
import { useAuthStore } from '@/store/auth-store';
import ImageBlock from '@/app/ui/image-block';

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

  return (
    <div className="min-h-screen flex flex-col md:justify-center items-center">
      <div className="flex flex-col gap-y-2.5 p-5 lg:flex-row lg:gap-4 lg:w-10/12 md:p-8 lg:p-2">
        {children}
        <ImageBlock />
      </div>
    </div>
  );
};

export default GuestRouteGuard;
