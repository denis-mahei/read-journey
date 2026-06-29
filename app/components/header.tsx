import React from 'react';
import Logo from '@/app/components/logo';
import Icon from '@/app/components/icon';
import MainWrapper from '@/app/ui/main-wrapper';

const Header = () => {
  return (
    <MainWrapper>
      <header className="flex justify-between items-center">
        <Logo className="flex gap-1 mb-0" />
        <button className="h-7">
          <Icon
            name="burger"
            width={28}
            height={28}
            viewBox="0 0 28 28"
          />
        </button>
      </header>
    </MainWrapper>
  );
};

export default Header;
