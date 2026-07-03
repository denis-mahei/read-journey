'use client';
import React, { useEffect, useState } from 'react';
import { getBookById } from '@/services/client-api';
import LibraryBookItem from '@/app/components/library-book-item';

interface ReadingContentProps {
  id: string;
}

const ReadingContent = ({ id }: ReadingContentProps) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    fetchBook();
  }, []);
  console.log(book);

  return (
    <div>
      <LibraryBookItem book={book} />
    </div>
  );
};

export default ReadingContent;
