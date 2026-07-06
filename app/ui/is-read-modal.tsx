import React from 'react';
import ModalWrapper from '@/app/ui/modal-wrapper';

interface IsReadModalProps {
  onClose: () => void;
}

const IsReadModal = ({ onClose }: IsReadModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div>Done</div>
    </ModalWrapper>
  );
};

export default IsReadModal;
