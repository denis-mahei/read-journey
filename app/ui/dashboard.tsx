import React from 'react';
import clsx from 'clsx';

interface DashboardProps {
  children: React.ReactNode;
  className?: string;
}

const Dashboard = ({ children, className }: DashboardProps) => {
  return (
    <div
      className={clsx(
        'p-5 md:p-8 lg:p-5 bg-secondary-bg rounded-4xl flex' +
          ' flex-col md:flex-row md:gap-5 lg:flex-col',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Dashboard;
