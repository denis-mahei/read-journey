import React from 'react';
import Dashboard from '@/app/components/dashboard';
import AddBookForm from '@/app/components/add-book-form';
import RecommendedShortList from '@/app/ui/recommended-short-list';
import Wrapper from '@/app/ui/wrapper';
import MyLibraryBooks from '@/app/components/my-library-books';

const Page = async () => {
  return (
    <div className="flex flex-col gap-2.5 md:gap-4 lg:flex-row">
      <Dashboard>
        <AddBookForm />
        <Wrapper>
          <p className="font-bold mb-3.5">Recommended books</p>
          <RecommendedShortList />
        </Wrapper>
      </Dashboard>
      <MyLibraryBooks />
    </div>
  );
};

export default Page;
