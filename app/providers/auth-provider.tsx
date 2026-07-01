'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { current } from '@/services/client-api';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = useAuthStore((state) => state.token);
  const authenticate = useAuthStore((state) => state.authenticate);
  const logOut = useAuthStore((state) => state.logout);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) return;
        const user = await current();
        authenticate(user);
      } catch (e) {
        logOut();
      }
    };
    fetchUser();
  }, [token, authenticate, logOut]);
  return <>{children}</>;
};

export default AuthProvider;
