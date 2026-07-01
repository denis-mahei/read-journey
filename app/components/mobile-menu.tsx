'use client';

import React from 'react';
import NavLink from '@/app/components/nav-link';
import Icon from '@/app/components/icon';
import Logout from '@/app/(auth)/logout/logout';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-backdrop">
      <div className="flex-1" onClick={onClose} />

      <aside className="w-1/2 h-full bg-secondary-bg flex flex-col px-6 py-4">
        <button className="self-end mb-8" onClick={onClose}>
          <Icon
            name="close"
            width={28}
            height={28}
            viewBox="0 0 28 28"
          />
        </button>

        <nav className="flex flex-col justify-center items-center gap-5 flex-1">
          <NavLink onNavigate={onClose} />
        </nav>

        <footer className="mx-auto">
          <Logout />
        </footer>
      </aside>
    </div>
  );
};

export default MobileMenu;
