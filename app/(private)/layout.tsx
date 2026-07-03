import React from 'react';
import PrivateRouteGuard from '@/app/components/private-route-guard';
import Header from '@/app/components/header';
import { Toaster } from 'sonner';
import Icon from '@/app/ui/icon';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <PrivateRouteGuard>
      <Header />
      <main className="flex flex-col gap-2.5 md:gap-4 lg:flex-row">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            className:
              '!bg-secondary-bg !text-primary !rounded-2xl' +
              ' !border-dropdown-b',
          }}
          icons={{
            success: (
              <Icon
                name="success"
                width={18}
                height={18}
                viewBox="0 0 18 18"
              />
            ),
            error: (
              <Icon
                name="warn"
                width={18}
                height={18}
                viewBox="0 0 18 18"
              />
            ),
          }}
        />
      </main>
    </PrivateRouteGuard>
  );
};

export default PrivateLayout;
