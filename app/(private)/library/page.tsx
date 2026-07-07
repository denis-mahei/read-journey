import React from 'react';
import { BookStatus } from '@/app/components/status-filter';
import LibraryContent from '@/app/components/library-content';
import { Metadata } from 'next';

interface PageProps {
  searchParams: Promise<{ status: string }>;
}

export const metadata: Metadata = {
  title: 'My Library',
  description: 'This is a library for your books',
};

const Page = async ({ searchParams }: PageProps) => {
  const { status } = await searchParams;
  return <LibraryContent status={status as BookStatus} />;
};

export default Page;
