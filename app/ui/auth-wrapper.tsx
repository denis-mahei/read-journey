import React from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return <div className="bg-secondary-bg">{children}</div>;
};

export default AuthWrapper;
