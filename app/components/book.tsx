import React from 'react';
import { IBook } from '@/types/definitions';
import Image from 'next/image';

interface BookProps {
  book: IBook;
  onSelectBook?: (book: IBook) => void;
  variant?: 'default' | 'compact';
}

const sizeStyles = {
  default: {
    wrapper: 'w-34.25',
    image: 'h-52',
    imgWidth: 137,
    imgHeight: 208,
    title: 'text-sm',
    author: 'text-[10px]',
  },
  compact: {
    wrapper: 'w-[71px]',
    image: 'h-[107px]',
    imgWidth: 71,
    imgHeight: 107,
    title: 'text-xs',
    author: 'text-[9px]',
  },
};

const Book = ({
  book,
  onSelectBook,
  variant = 'default',
}: BookProps) => {
  const { title, author, imageUrl } = book;
  const styles = sizeStyles[variant];
  return (
    <li className={`flex flex-col shrink ${styles.wrapper}`}>
      <Image
        onClick={() => onSelectBook?.(book)}
        src={imageUrl}
        alt={title}
        width={styles.imgWidth}
        height={styles.imgHeight}
        className={`rounded-lg mb-2 object-cover ${styles.image}`}
      />
      <h3 className="text-sm font-bold mb-0.5 line-clamp-1">
        {title}
      </h3>
      <p className="text-gray-text text-[10px]">{author}</p>
    </li>
  );
};

export default Book;
