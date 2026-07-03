'use client';
import React from 'react';
import { IBook } from '@/types/definitions';
import EmptyLib from '@/app/ui/empty-lib';
import LibraryBookItem from '@/app/components/library-book-item';

interface MyLibraryBookListProps {
  books: IBook[];
  handleDelete: (id: string) => void;
}

const MyLibraryBookList = ({
  books,
  handleDelete,
}: MyLibraryBookListProps) => {
  console.log(books);
  return (
    <div className="flex flex-1 w-full">
      {books ? (
        <ul className="flex flex-wrap">
          {books.length > 0 &&
            books.map((book) => (
              <LibraryBookItem
                key={book._id}
                book={book}
                onDelete={handleDelete}
              />
            ))}
        </ul>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <EmptyLib />
        </div>
      )}
    </div>
  );
};

export default MyLibraryBookList;
