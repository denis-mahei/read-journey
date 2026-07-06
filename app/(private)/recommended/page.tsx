import React from 'react';
import RecommendedBooks from '@/app/components/recommended-books';
import Dashboard from '@/app/ui/dashboard';
import FilterForm from '@/app/components/filter-form';
import TextContent from '@/app/ui/text-content';
import BlockQuote from '@/app/ui/block-quote';

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
        <BlockQuote />
      </Dashboard>
      <RecommendedBooks page={Number(page)} />
    </>
  );
};

export default RecommendedPage;
