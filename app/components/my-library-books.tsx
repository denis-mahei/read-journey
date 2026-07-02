import React from 'react';
import StatusFilter, {
  BookStatus,
} from '@/app/components/status-filter';
import MyLibraryBookList from '@/app/components/my-library-book-list';

interface MyLibraryBooksProps {
  status?: BookStatus;
}

const MyLibraryBooks = ({ status }: MyLibraryBooksProps) => {
  return (
    <div className="flex flex-1 flex-col p-5 md:p-8 lg:p-5 bg-secondary-bg rounded-4xl">
      <div className="flex justify-between">
        <h3 className="font-bold text-[20px]">My library</h3>
        <StatusFilter />
      </div>
      <div className="flex flex-1 w-full">
        <MyLibraryBookList status={status} />
      </div>
    </div>
  );
};

export default MyLibraryBooks;
