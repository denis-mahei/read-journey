import React from 'react';
import Image from 'next/image';

import ModalWrapper from '@/app/ui/modal-wrapper';

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal = ({ onClose }: SuccessModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="flex flex-col justify-center items-center w-xs">
        <Image
          src="/images/like-mobile.png"
          alt="Success Modal"
          width={68}
          height={70}
          className="mb-8"
        />
        <h2 className="font-bold text-[20px] mb-3.5">Good job</h2>
        <p className="text-center text-sm text-gray-text">
          Your book is now in{' '}
          <span className="text-primary">the library!</span> The joy
          knows no bounds and now you can start your training
        </p>
      </div>
    </ModalWrapper>
  );
};

export default SuccessModal;
