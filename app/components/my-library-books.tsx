'use client';
import React from 'react';
import StatusFilter from '@/app/components/status-filter';
import { IBook } from '@/types/definitions';
import EmptyLib from '@/app/ui/empty-lib';
import LibraryBookItem from '@/app/components/library-book-item';

interface MyLibraryBooksProps {
  books: IBook[];
  handleDelete: (id: string) => void;
  onSelectBook: (book: IBook) => void;
}

const MyLibraryBooks = ({
  books,
  handleDelete,
  onSelectBook,
}: MyLibraryBooksProps) => {
  return (
    <div className="flex flex-1 flex-col p-5 md:p-8 lg:p-5 bg-secondary-bg rounded-4xl">
      <div className="flex justify-between mb-3.5">
        <h3 className="font-bold text-[20px]">My library</h3>
        <StatusFilter />
      </div>
      <div className="flex flex-1 w-full">
        {books.length > 0 ? (
          <ul className="flex flex-wrap">
            {books.length > 0 &&
              books.map((book) => (
                <LibraryBookItem
                  key={book._id}
                  book={book}
                  onDelete={handleDelete}
                  selectedBook={onSelectBook}
                />
              ))}
          </ul>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <EmptyLib />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibraryBooks;
