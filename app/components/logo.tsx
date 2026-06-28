import React from 'react';
import Icon from '@/app/components/icon';

const Logo = () => {
  return (
    <div className="flex items-center gap-1 mb-10 md:mb-39.25">
      <Icon name="logo" width={42} height={17} viewBox="0 0 42 17" />
      <span className="hidden md:flex md:text-[18px] uppercase font-bold leading-none translate-y-px">
        read journey
      </span>
    </div>
  );
};

export default Logo;
