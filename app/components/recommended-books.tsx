'use client';

import React, { useEffect, useState } from 'react';
import {
  addBookFromRecommended,
  getOwnLibrary,
  getRecommendedBooks,
} from '@/services/client-api';
import MainWrapper from '@/app/ui/main-wrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import BookList from '@/app/components/book-list';
import { IBook } from '@/types/definitions';
import useResponsivePerPage from '@/hooks/use-responsive-per-page';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import clsx from 'clsx';
import BookModal from '@/app/components/book-modal';
import { toast } from 'sonner';

interface RecommendedBooksProps {
  page: number;
}

const RecommendedBooks = ({ page }: RecommendedBooksProps) => {
  const perPage = useResponsivePerPage();
  const router = useRouter();
  const [recommend, setRecommend] = useState<IBook[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(
    null,
  );

  const searchParams = useSearchParams();
  const title = searchParams.get('title') ?? '';
  const author = searchParams.get('author') ?? '';

  useEffect(() => {
    if (perPage === null) return;

    const fetchRecommendedBooks = async () => {
      try {
        const data = await getRecommendedBooks({
          page,
          perPage,
          title,
          author,
        });
        setRecommend(data.results);
        setTotalPages(data.totalPages);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRecommendedBooks();
  }, [page, perPage, title, author]);
  const goToPage = (newPage: number) => {
    router.push(
      `/recommended?page=${newPage}&title=${title}&author=${author}`,
    );
  };

  const handleAddBook = async (id: string) => {
    const ownLibrary = await getOwnLibrary();
    const isDuplicate = ownLibrary.some(
      (item) => item.title === selectedBook?.title,
    );
    if (isDuplicate) {
      toast.error('This book already exists');
    } else {
      await addBookFromRecommended(id);
      toast.success('Book was added successfully.');
    }
    setSelectedBook(null);
  };

  return (
    <MainWrapper>
      <div className="flex justify-between md:justify-end lg:justify-between mb-5.5 w-full">
        <h1 className="text-xl font-bold md:hidden lg:text-[28px] lg:block">
          Recommended
        </h1>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            className={clsx(
              'p-2 rounded-full border border-light-gr lg:text-[20px]',
              page <= 1 && 'text-light-gr',
            )}
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
            className={clsx(
              'p-2 rounded-full border border-light-gr lg:text-[20px]',
              page === totalPages && 'text-light-gr',
            )}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>

      <BookList
        recommend={recommend}
        onSelectBook={setSelectedBook}
      />
      {selectedBook && (
        <BookModal
          onAction={handleAddBook}
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </MainWrapper>
  );
};

export default RecommendedBooks;
