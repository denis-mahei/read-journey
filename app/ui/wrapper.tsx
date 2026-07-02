import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="rounded-xl bg-input-bg p-5 lg:w-full">
      {children}
    </div>
  );
};

export default Wrapper;
