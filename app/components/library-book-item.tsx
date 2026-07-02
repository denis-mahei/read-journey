'use client';

import React from 'react';
import Image from 'next/image';

import { IBook } from '@/types/definitions';
import Icon from '@/app/components/icon';

interface LibraryBookItemProps {
  book: IBook;
  onDelete: (id: string) => void;
}

const LibraryBookItem = ({
  book,
  onDelete,
}: LibraryBookItemProps) => {
  return (
    <li>
      <Image
        src={
          book.imageUrl
            ? book.imageUrl
            : '/images/placeholder-mobile.png'
        }
        alt={book.title}
        width={137}
        height={208}
        className="md:hidden rounded-lg"
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
        className="hidden md:block rounded-lg"
      />
      <h3 className="line-clamp-1">{book.title}</h3>
      <p>{book.author}</p>
      <button type="button" onClick={() => onDelete(book._id)}>
        <Icon
          name="trash"
          width={14}
          height={14}
          viewBox="0 0 14 14"
        />
      </button>
    </li>
  );
};

export default LibraryBookItem;
