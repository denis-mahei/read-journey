import React from 'react';
import ReadingContent from '@/app/components/reading-content';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <ReadingContent id={id} />;
};

export default Page;
