import React from 'react';
import Logo from '@/app/ui/logo';
import Heading from '@/app/components/heading';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <div className="bg-secondary-bg rounded-4xl lg:min-h-184 lg:w-1/2 md:w-full md:min-h-full px-5 pt-5 pb-10 md:px-16 md:py-10 lg:py-10">
      <Logo />
      <Heading title="Expand your mind, reading" subtitle="a book" />
      {children}
    </div>
  );
};

export default AuthWrapper;
