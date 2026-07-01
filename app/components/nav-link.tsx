'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  onNavigate?: () => void;
}

const NavLink = ({ onNavigate }: NavLinkProps) => {
  const pathname = usePathname();

  const links = [
    { href: '/recommended', label: 'Home' },
    { href: '/library', label: 'My library' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-5 items-start md:gap-8">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={() => onNavigate?.()}
          className={`inline-block relative pb-1 transition-colors ${
            pathname === href
              ? 'text-primary after:absolute after:bottom-0 after:left-0' +
                ' after:w-full after:h-1 after:rounded-lg after:bg-pseudo-blue'
              : 'text-gray-text hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavLink;
