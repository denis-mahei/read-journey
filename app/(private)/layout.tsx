import React from 'react';
import PrivateRouteGuard from '@/app/components/private-route-guard';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return <PrivateRouteGuard>{children}</PrivateRouteGuard>;
};

export default PrivateLayout;
