import React from 'react';
import { getBookById } from '@/services/client-api';
import ReadingContent from '@/app/components/reading-content';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <ReadingContent id={id} />;
};

export default Page;
