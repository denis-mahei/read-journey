import React from 'react';

interface FilterProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  errors?: React.ReactNode;
}

const Field = ({ label, children, htmlFor, errors }: FilterProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-x-2 bg-input-bg rounded-xl p-3.5 ring-1 ring-transparent lg:hover:ring-light-gr focus-within:ring-gray-border">
        <label htmlFor={htmlFor} className="text-xs text-gray-text">
          {label}
        </label>
        {children}
      </div>
      {errors}
    </div>
  );
};

export default Field;
