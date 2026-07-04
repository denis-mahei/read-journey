import React from 'react';
import { BookStatus } from '@/app/components/status-filter';
import LibraryContent from '@/app/components/library-content';

interface PageProps {
  searchParams: Promise<{ status: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { status } = await searchParams;
  return <LibraryContent status={status as BookStatus} />;
};

export default Page;
