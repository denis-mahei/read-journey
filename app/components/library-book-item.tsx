'use client';

import React from 'react';
import Image from 'next/image';
import { BookItem } from '@/types/definitions';
import Icon from '@/app/ui/icon';

interface LibraryBookItemProps {
  book: BookItem;
  onDelete?: (id: string) => void;
  selectedBook?: (id: string) => void;
}

const LibraryBookItem = ({
  book,
  onDelete,
  selectedBook,
}: LibraryBookItemProps) => {
  return (
    <li className="flex flex-col w-34.25 h-full">
      <Image
        src={
          book.imageUrl
            ? book.imageUrl
            : '/images/placeholder-mobile.png'
        }
        alt={book.title}
        width={137}
        height={208}
        className="md:hidden rounded-lg mb-2 object-cover h-52"
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
        className="hidden md:block rounded-lg mb-2 object-cover h-52"
        onClick={() => selectedBook?.(book._id)}
      />
      <div className="flex items-center gap-3.5">
        <div>
          <h3 className="text-sm font-bold line-clamp-1">
            {book.title}
          </h3>
          <p className="text-[10px] text-gray-text">{book.author}</p>
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
