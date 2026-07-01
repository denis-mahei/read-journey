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
      <div className="h-2.5" />
      <main className="lg:flex lg:gap-2">{children}</main>
    </PrivateRouteGuard>
  );
};

export default PrivateLayout;
