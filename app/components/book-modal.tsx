import React from 'react';
import { IBook } from '@/types/definitions';
import Image from 'next/image';
import Icon from '@/app/components/icon';
import Button from '@/app/ui/button';

interface BookModalProps {
  book: IBook;
  onClose: () => void;
}

const BookModal = ({ book, onClose }: BookModalProps) => {
  return (
    <div className="fixed flex items-center inset-0 z-50 justify-center bg-backdrop px-5">
      <div className=" w-full max-w-sm border  border-[#68686820] bg-secondary-bg p-10 rounded-xl relative">
        <button className="absolute top-5 right-5" onClick={onClose}>
          <Icon
            name="close"
            width={22}
            height={22}
            viewBox="0 0 22 22"
          />
        </button>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={book.imageUrl}
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
          <Button variant="secondary" type="button">
            Add to library
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
