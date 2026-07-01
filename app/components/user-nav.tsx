'use client';
import React, { useState } from 'react';
import Icon from '@/app/components/icon';
import MobileMenu from '@/app/components/mobile-menu';
import NavLink from '@/app/components/nav-link';
import UserBar from '@/app/components/user-bar';

interface UserNavProps {}

const UserNav = ({}: UserNavProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <div className="flex items-center gap-3 md:hidden">
        <UserBar />
        <button
          className="h-7"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Icon
            name="burger"
            width={28}
            height={28}
            viewBox="0 0 28 28"
          />
        </button>
      </div>

      {isMobileMenuOpen && <MobileMenu onClose={closeMenu} />}

      <div className="hidden md:flex items-center gap-8">
        <NavLink />
      </div>
    </>
  );
};

export default UserNav;
