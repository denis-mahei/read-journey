import React from 'react';
import PrivateRouteGuard from '@/app/components/private-route-guard';
import Header from '@/app/components/header';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <PrivateRouteGuard>
      <Header />
      {children}
    </PrivateRouteGuard>
  );
};

export default PrivateLayout;
