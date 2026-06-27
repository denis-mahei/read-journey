'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/auth-store';

const RecommendedPage = () => {
  const router = useRouter();
  const logOut = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logOut();
    router.push(ROUTES.signIn);
  };

  return (
    <div>
      Recommended Page <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default RecommendedPage;
