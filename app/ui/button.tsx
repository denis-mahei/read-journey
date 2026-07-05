import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = ({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'rounded-4xl px-7 py-3 font-bold text-sm min-w-32.75 transition';

  const variantClasses = {
    primary: 'bg-primary text-secondary-bg',
    secondary: 'bg-transparent border border-light-gr text-primary',
  };
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
