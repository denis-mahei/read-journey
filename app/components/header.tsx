import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const Header = () => {
  return (
    <header className="flex gap-3.5">
      <Link href={ROUTES.signUp}>Register</Link>
      <Link href={ROUTES.signIn}>login</Link>
    </header>
  );
};

export default Header;
