import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="rounded-4xl bg-primary px-7 py-3 text-secondary-bg font-bold text-md min-w-32.75">
      {children}
    </button>
  );
};

export default Button;
