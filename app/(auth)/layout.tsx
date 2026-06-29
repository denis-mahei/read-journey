import React from 'react';
import GuestRouteGuard from '@/app/components/guest-route-guard';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <GuestRouteGuard>{children}</GuestRouteGuard>;
};

export default AuthLayout;
