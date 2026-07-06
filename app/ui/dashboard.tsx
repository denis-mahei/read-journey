import React from 'react';
import MainWrapper from '@/app/ui/main-wrapper';

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <MainWrapper>
      <div className="flex flex-col md:flex-row md:gap-5 lg:flex-col">
        {children}
      </div>
    </MainWrapper>
  );
};

export default Dashboard;
