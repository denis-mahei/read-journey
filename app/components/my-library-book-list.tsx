'use client';
import React, { useEffect, useState } from 'react';
import { getOwnLibrary } from '@/services/client-api';
import { IBook } from '@/types/definitions';
import EmptyLib from '@/app/ui/empty-lib';
import { BookStatus } from '@/app/components/status-filter';

interface MyLibraryBookListProps {
  status?: BookStatus;
}

const MyLibraryBookList = ({ status }: MyLibraryBookListProps) => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getOwnLibrary(status);
        setBooks(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBooks();
  }, [status]);
  return (
    <div className="flex flex-1 w-full">
      {books.length > 0 ? (
        <ul>...</ul>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <EmptyLib />
        </div>
      )}
    </div>
  );
};

export default MyLibraryBookList;
