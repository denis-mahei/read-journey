import React from 'react';
import RecommendedBooks from '@/app/components/recommended-books';
import Dashboard from '@/app/ui/dashboard';
import FilterForm from '@/app/components/filter-form';
import TextContent from '@/app/ui/text-content';
import BlockQuote from '@/app/ui/block-quote';
import { Metadata } from 'next';

interface RecommendedPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: 'Recommended Books',
  description: 'Recommended Books from Read Journey',
};

const RecommendedPage = async ({
  searchParams,
}: RecommendedPageProps) => {
  const { page = '1' } = await searchParams;
  return (
    <>
      <Dashboard className="lg:w-100">
        <FilterForm />
        <TextContent />
        <BlockQuote />
      </Dashboard>
      <RecommendedBooks page={Number(page)} />
    </>
  );
};

export default RecommendedPage;
