import React from 'react';
import clsx from 'clsx';

interface MainWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const MainWrapper = ({ children, className }: MainWrapperProps) => {
  return (
    <div
      className={clsx(
        'px-5 py-10 md:px-10 bg-secondary-bg rounded-4xl min-h-117.5',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MainWrapper;
