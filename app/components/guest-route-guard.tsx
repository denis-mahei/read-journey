'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useAuthHydration } from '@/hooks/use-auth-hydration';
import { useAuthStore } from '@/store/auth-store';
import Image from 'next/image';

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
    <div className="min-h-screen flex flex-col md:justify-center">
      <div className="flex flex-col gap-y-2.5 p-5 lg:flex-row lg:gap-4 lg:w-full md:p-8 lg:p-8 lg:min-h-184">
        {children}
        <div className="min-h-83.75 flex md:hidden lg:flex  items-center justify-center w-full lg:w-1/2 bg-secondary-bg rounded-4xl relative overflow-hidden">
          <Image
            className="hidden lg:flex lg:absolute lg:-bottom-45 left-1/2 -translate-x-1/2"
            src="/images/iphone-desktop.png"
            alt="iphone-picture"
            width={405}
            height={834}
          />
          <Image
            className="flex md:hidden absolute -bottom-50 left-1/2 -translate-x-1/2"
            src="/images/iphone-mobile.png"
            alt="iphone-picture"
            width={255}
            height={518}
          />
        </div>
      </div>
    </div>
  );
};

export default GuestRouteGuard;
