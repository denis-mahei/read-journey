import React from 'react';
import Icon from '@/app/ui/icon';

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
      <Icon name="logo" width={42} height={17} viewBox="0 0 42 17" />
      <span className="hidden md:flex md:text-[18px] uppercase font-bold leading-none translate-y-px">
        {title}
      </span>
    </div>
  );
};

export default Logo;
