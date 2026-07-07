'use client';

import React, { useEffect } from 'react';
import SvgIcon from '@/app/ui/svg-icon';

interface ModalWrapperProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper = ({ onClose, children }: ModalWrapperProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () =>
      document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return (
    <div
      className="fixed flex items-center inset-0 z-50 justify-center bg-backdrop px-5"
      onClick={onClose}
    >
      <div
        className=" w-full max-w-sm border  border-[#68686820] bg-secondary-bg p-10 rounded-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-5 right-5" onClick={onClose}>
          <SvgIcon
            name="close"
            width={22}
            height={22}
            viewBox="0 0 22 22"
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
