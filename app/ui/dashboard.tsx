import React from 'react';
import MainWrapper from '@/app/ui/main-wrapper';
import BlockQuote from '@/app/ui/block-quote';

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <MainWrapper>
      <div className="flex flex-col md:flex-row md:gap-5 lg:flex-col">
        {children}
        <BlockQuote />
      </div>
    </MainWrapper>
  );
};

export default Dashboard;
