import React from 'react';
import StatusFilter, {
  BookStatus,
} from '@/app/components/status-filter';
import MyLibraryBookList from '@/app/components/my-library-book-list';
import { IBook } from '@/types/definitions';

interface MyLibraryBooksProps {
  books: IBook[];
  handleDelete: (id: string) => void;
}

const MyLibraryBooks = ({
  books,
  handleDelete,
}: MyLibraryBooksProps) => {
  return (
    <div className="flex flex-1 flex-col p-5 md:p-8 lg:p-5 bg-secondary-bg rounded-4xl">
      <div className="flex justify-between mb-3.5">
        <h3 className="font-bold text-[20px]">My library</h3>
        <StatusFilter />
      </div>
      <div className="flex flex-1 w-full">
        <MyLibraryBookList
          books={books}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default MyLibraryBooks;
