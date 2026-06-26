import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex gap-3.5">
      <Link href="/signup">Register</Link>
      <Link href="/signin">login</Link>
    </header>
  );
};

export default Header;
