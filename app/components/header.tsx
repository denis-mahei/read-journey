import React from 'react';
import Logo from '@/app/ui/logo';
import UserNav from '@/app/components/user-nav';
import Logout from '@/app/(auth)/logout/logout';
import UserBar from '@/app/ui/user-bar';

const Header = () => {
  return (
    <header className="p-5 bg-secondary-bg rounded-2xl">
      <div className="flex justify-between items-center">
        <Logo className="flex gap-1 mb-0 lg:hidden" title="" />
        <Logo
          className="hidden gap-1 mb-0 lg:flex"
          title="read journey"
        />
        <UserNav />
        <div className="hidden md:flex items-center gap-4">
          <UserBar />
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
