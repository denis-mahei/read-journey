'use client';

import React from 'react';
import StatusFilter from '@/app/components/status-filter';
import { IBook } from '@/types/definitions';
import EmptyLib from '@/app/ui/empty-lib';
import LibraryBookItem from '@/app/components/library-book-item';
import MainWrapper from '@/app/ui/main-wrapper';

interface MyLibraryBooksProps {
  books: IBook[];
  handleDelete: (id: string) => void;
  onSelectBook: (id: string) => void;
}

const MyLibraryBooks = ({
  books,
  handleDelete,
  onSelectBook,
}: MyLibraryBooksProps) => {
  return (
    <MainWrapper className="lg:flex-1 flex flex-col relative">
      <div className="flex justify-between mb-3.5">
        <h3 className="font-bold text-[20px] md:text-[28px]">
          My library
        </h3>
        <StatusFilter />
      </div>
      <div className="flex-1">
        {books.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
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
          <div className="absolute inset-0 flex justify-center items-center">
            <EmptyLib />
          </div>
        )}
      </div>
    </MainWrapper>
  );
};

export default MyLibraryBooks;
