import React from 'react';
import Logo from '@/app/components/logo';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <div className="bg-secondary-bg rounded-4xl lg:min-h-184 lg:w-1/2 md:w-full md:min-h-full px-5 pt-5 pb-10 md:px-16 md:py-10 lg:py-10">
      <Logo />
      <h1 className="text-3xl font-bold max-w-73.75 md:max-w-111 md:text-6xl mb-5 md:mb-10">
        Expand your mind, reading{' '}
        <span className="text-span">a book</span>
      </h1>
      {children}
    </div>
  );
};

export default AuthWrapper;
