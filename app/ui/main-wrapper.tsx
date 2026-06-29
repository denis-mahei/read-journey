import React from 'react';

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <div className="p-5 bg-secondary-bg rounded-2xl">{children}</div>
  );
};

export default MainWrapper;
