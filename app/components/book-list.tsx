import React from 'react';
import { IBook } from '@/types/definitions';
import Book from '@/app/components/book';

interface BookListProps {
  recommend: IBook[];
  onSelectBook?: (book: IBook) => void;
  variant?: 'default' | 'compact';
}

const BookList = ({
  recommend,
  variant = 'default',
  onSelectBook,
}: BookListProps) => {
  return (
    <ul className="flex gap-5 md:flex-wrap">
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
