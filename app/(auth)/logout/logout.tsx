'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { ROUTES } from '@/constants/routes';
import Button from '@/app/ui/button';

const Logout = () => {
  const router = useRouter();
  const logOut = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logOut();
    router.push(ROUTES.signIn);
  };
  return (
    <Button variant={'secondary'} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
