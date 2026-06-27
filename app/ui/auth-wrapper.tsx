import React from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <div className="bg-secondary-bg rounded-4xl lg:min-h-184 lg:w-1/2 md:w-full md:min-h-full">
      {children}
    </div>
  );
};

export default AuthWrapper;
