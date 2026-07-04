import React from 'react';
import { IBook } from '@/types/definitions';
import Image from 'next/image';
import Button from '@/app/ui/button';
import ModalWrapper from '@/app/ui/modal-wrapper';

interface BookModalProps {
  book: IBook;
  onClose: () => void;
  onAction?: (id: string) => void;
  buttonTitle?: string;
}

const BookModal = ({
  book,
  onClose,
  onAction,
  buttonTitle = 'Add to library',
}: BookModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="flex flex-col justify-center items-center">
        <Image
          src={
            book.imageUrl
              ? book.imageUrl
              : '/images/placeholder-desktop.png'
          }
          alt={book.title}
          width={140}
          height={213}
          className="object-cover rounded-lg mb-4"
        />
        <h3 className=" text-center text-[18px] font-bold mb-0.5">
          {book.title}
        </h3>
        <p className="mb-1 text-xs text-gray-text">{book.author}</p>
        <p className="mb-5">{book.totalPages} pages</p>
        <Button
          variant="secondary"
          type="button"
          onClick={() => onAction?.(book._id)}
        >
          {buttonTitle}
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default BookModal;
