'use client';

import React from 'react';
import Image from 'next/image';
import { BookDetails } from '@/types/definitions';
import Icon from '@/app/ui/icon';

interface LibraryBookItemProps {
  book: BookDetails;
  onDelete?: (id: string) => void;
  selectedBook?: (book: BookDetails) => void;
}

const LibraryBookItem = ({
  book,
  onDelete,
  selectedBook,
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
        onClick={() => selectedBook?.(book)}
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
        onClick={() => selectedBook?.(book)}
      />
      <h3 className="line-clamp-1">{book.title}</h3>
      <p>{book.author}</p>
      {onDelete && (
        <button type="button" onClick={() => onDelete?.(book._id)}>
          <Icon
            name="trash"
            width={14}
            height={14}
            viewBox="0 0 14 14"
          />
        </button>
      )}
    </li>
  );
};

export default LibraryBookItem;
