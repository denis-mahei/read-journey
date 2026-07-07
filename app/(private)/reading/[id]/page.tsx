import React from 'react';
import ReadingContent from '@/app/components/reading-content';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'My Reading',
  description: 'Page for tracking your read progress',
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <ReadingContent id={id} />;
};

export default Page;
