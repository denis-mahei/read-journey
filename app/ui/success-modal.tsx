import React from 'react';
import Image from 'next/image';

import ModalWrapper from '@/app/ui/modal-wrapper';

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal = ({ onClose }: SuccessModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/images/like-mobile.png"
          alt="Success Modal"
          width={68}
          height={70}
        />
        <h2>Good job</h2>
        <p className="text-center">
          Your book is now in the library! The joy knows no bounds and
          now you can start your training
        </p>
      </div>
    </ModalWrapper>
  );
};

export default SuccessModal;
