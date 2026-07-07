import React from 'react';
import SvgIcon from '@/app/ui/svg-icon';

type LogoProps = {
  className?: string;
  title?: string;
};

const Logo = ({
  className = 'flex items-center gap-1 mb-10 md:mb-39.25',
  title = 'read journey',
}: LogoProps) => {
  return (
    <div className={className}>
      <SvgIcon
        name="logo"
        width={42}
        height={17}
        viewBox="0 0 42 17"
      />
      <span className="hidden md:flex md:text-md uppercase font-bold leading-none translate-y-px">
        {title}
      </span>
    </div>
  );
};

export default Logo;
