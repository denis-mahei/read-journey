import React from 'react';
import RecommendedBooks from '@/app/components/recommended-books';
import Dashboard from '@/app/components/dashboard';
import FilterForm from '@/app/components/filter-form';
import TextContent from '@/app/ui/text-content';

interface RecommendedPageProps {
  searchParams: Promise<{ page?: string }>;
}

const RecommendedPage = async ({
  searchParams,
}: RecommendedPageProps) => {
  const { page = '1' } = await searchParams;
  return (
    <>
      <Dashboard>
        <FilterForm />
        <TextContent />
      </Dashboard>
      <div className="h-2.5 lg:h-0" />
      <RecommendedBooks page={Number(page)} />
    </>
  );
};

export default RecommendedPage;
