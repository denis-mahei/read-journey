'use client';
import { useEffect, useState } from 'react';

const getPerPageByWidth = (width: number): number => {
  if (width >= 1024) return 10;
  if (width >= 768) return 8;
  return 2;
};

const UseResponsivePerPage = () => {
  const [perPage, setPerPage] = useState<number | null>(null);

  useEffect(() => {
    const update = () =>
      setPerPage(getPerPageByWidth(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return perPage;
};

export default UseResponsivePerPage;
