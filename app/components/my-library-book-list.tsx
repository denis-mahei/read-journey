'use client';
import React, { useEffect, useState } from 'react';
import {
  getOwnLibrary,
  removeUsersBook,
} from '@/services/client-api';
import { IBook } from '@/types/definitions';
import EmptyLib from '@/app/ui/empty-lib';
import { BookStatus } from '@/app/components/status-filter';
import LibraryBookItem from '@/app/components/library-book-item';
import { toast } from 'sonner';
import book from '@/app/components/book';

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

  const handleDelete = async (id: string) => {
    setBooks((prev) => prev.filter((i) => i._id !== id));
    await removeUsersBook(id);
  };
  return (
    <div className="flex flex-1 w-full">
      {books.length > 0 ? (
        <ul className="flex flex-wrap">
          {books.map((book) => (
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
