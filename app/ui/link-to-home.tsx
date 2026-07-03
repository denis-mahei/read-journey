import React from 'react';
import Icon from '@/app/ui/icon';
import Link from 'next/link';

interface LinkToHomeProps {
  label: string;
  href?: string;
}

const LinkToHome = ({
  label,
  href = '/library',
}: LinkToHomeProps) => {
  return (
    <Link
      href={href}
      className="flex w-full justify-between items-center mt-2.5"
    >
      <p className="underline text-sm text-gray-text">{label}</p>
      <Icon
        name="r-arrow"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      />
    </Link>
  );
};

export default LinkToHome;
