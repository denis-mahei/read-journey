import React from 'react';
import RecommendedBooks from '@/app/components/recommended-books';
import Dashboard from '@/app/ui/dashboard';
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
      <RecommendedBooks page={Number(page)} />
    </>
  );
};

export default RecommendedPage;
