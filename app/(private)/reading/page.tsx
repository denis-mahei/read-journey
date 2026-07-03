'use client';
import React from 'react';
import { useAuthStore } from '@/store/auth-store';

interface PageProps {}

const Page = ({}: PageProps) => {
  const user = useAuthStore((state) => state.user);

  return <div>Reading</div>;
};

export default Page;
