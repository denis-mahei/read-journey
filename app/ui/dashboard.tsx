import React from 'react';

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <div className="p-5 md:p-8 lg:p-5 bg-secondary-bg rounded-4xl flex flex-col md:flex-row md:gap-5 lg:flex-col">
      {children}
    </div>
  );
};

export default Dashboard;
