import React from 'react';
import clsx from 'clsx';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={clsx(
        'rounded-xl bg-input-bg p-5 lg:w-full',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
