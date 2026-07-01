'use client';

import React, { useEffect, useState } from 'react';
import { IBook } from '@/types/definitions';
import { getRecommendedBooks } from '@/services/client-api';
import BookList from '@/app/components/book-list';
import LinkToHome from '@/app/ui/link-to-home';

const RecommendedShortList = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendedBooks({
          page: 1,
          perPage: 3,
        });
        setBooks(data.results);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div>
      <BookList recommend={books} variant="compact" />
      <LinkToHome label={'Home'} href={'/recommended'} />
    </div>
  );
};

export default RecommendedShortList;
