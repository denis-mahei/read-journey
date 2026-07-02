import React from 'react';
import Dashboard from '@/app/components/dashboard';
import AddBookForm from '@/app/components/add-book-form';
import RecommendedShortList from '@/app/ui/recommended-short-list';
import Wrapper from '@/app/ui/wrapper';
import MyLibraryBooks from '@/app/components/my-library-books';
import { BookStatus } from '@/app/components/status-filter';

interface PageProps {
  searchParams: Promise<{ status: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { status } = await searchParams;
  return (
    <>
      <div className="lg:shrink-0">
        <Dashboard>
          <AddBookForm />
          <Wrapper>
            <p className="font-bold mb-3.5">Recommended books</p>
            <RecommendedShortList />
          </Wrapper>
        </Dashboard>
      </div>
      <MyLibraryBooks status={status as BookStatus | undefined} />
    </>
  );
};

export default Page;
