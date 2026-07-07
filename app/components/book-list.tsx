import React from 'react';
import { IBook } from '@/types/definitions';
import Book from '@/app/components/book';

interface BookListProps {
  recommend: IBook[];
  onSelectBook?: (book: IBook) => void;
  variant?: 'default' | 'compact';
}

const size = {
  compact: 'grid grid-cols-3 gap-5',
  default:
    'grid grid-cols-[repeat(auto-fill,minmax(137px,1fr))] gap-5 w-full',
};

const BookList = ({
  recommend,
  variant = 'default',
  onSelectBook,
}: BookListProps) => {
  return (
    <ul className={size[variant]}>
      {recommend.map((book) => (
        <Book
          key={book._id}
          book={book}
          onSelectBook={onSelectBook}
          variant={variant}
        />
      ))}
    </ul>
  );
};

export default BookList;
