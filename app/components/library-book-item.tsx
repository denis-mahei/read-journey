'use client';

import React from 'react';
import Image from 'next/image';
import { BookItem } from '@/types/definitions';
import Icon from '@/app/ui/icon';

interface LibraryBookItemProps {
  book: BookItem;
  onDelete?: (id: string) => void;
  selectedBook?: (id: string) => void;
  variant?: 'library' | 'reading';
}

const styles = {
  library: {
    sizeWrapper: 'w-34.25',
    imgWidth: 137,
    imgHeight: 208,
    img: 'h-52',
    title: 'text-sm text-left line-clamp-1',
    author: 'text-[10px] text-left',
  },
  reading: {
    sizeWrapper: 'w-full items-center',
    imgWidth: 224,
    imgHeight: 340,
    img: 'h-85 mb-6',
    title: 'text-center text-[20px]',
    author: 'text-center text-sm',
  },
};

const LibraryBookItem = ({
  book,
  onDelete,
  selectedBook,
  variant = 'library',
}: LibraryBookItemProps) => {
  const customStyle = styles[variant];
  return (
    <li className={`flex flex-col h-full ${customStyle.sizeWrapper}`}>
      <Image
        src={
          book.imageUrl
            ? book.imageUrl
            : '/images/placeholder-mobile.png'
        }
        alt={book.title}
        width={customStyle.imgWidth}
        height={customStyle.imgHeight}
        className={`md:hidden rounded-lg mb-2 object-cover ${customStyle.img}`}
        onClick={() => selectedBook?.(book._id)}
      />
      <Image
        src={
          book.imageUrl
            ? book.imageUrl
            : '/images/placeholder-mobile.png'
        }
        alt={book.title}
        width={224}
        height={340}
        className={`hidden md:block rounded-lg mb-2 object-cover ${customStyle.img}`}
        onClick={() => selectedBook?.(book._id)}
      />
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-bold ${customStyle.title}`}>
            {book.title}
          </h3>
          <p className={`text-gray-text ${customStyle.author}`}>
            {book.author}
          </p>
        </div>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete?.(book._id)}
            className="ring ring-[#e8505020] bg-[#e8505010] rounded-full p-2"
          >
            <Icon
              name="trash"
              width={14}
              height={14}
              viewBox="0 0 14 14"
            />
          </button>
        )}
      </div>
    </li>
  );
};

export default LibraryBookItem;
