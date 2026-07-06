import React from 'react';

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <div className="px-5 py-10 md:p-8 lg:p-5 bg-secondary-bg rounded-4xl">
      {children}
    </div>
  );
};

export default MainWrapper;
