import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { ROUTES } from '@/constants/routes';

const Logout = () => {
  const router = useRouter();
  const logOut = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logOut();
    router.push(ROUTES.signIn);
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
