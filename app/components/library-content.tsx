'use client';

import React, { useEffect, useState } from 'react';
import Dashboard from '@/app/ui/dashboard';
import AddBookForm from '@/app/components/add-book-form';
import Wrapper from '@/app/ui/wrapper';
import RecommendedShortList from '@/app/ui/recommended-short-list';
import MyLibraryBooks from '@/app/components/my-library-books';
import { BookStatus } from '@/app/components/status-filter';
import { toast } from 'sonner';
import {
  addBook,
  getOwnLibrary,
  removeUsersBook,
} from '@/services/client-api';
import { IBook } from '@/types/definitions';
import BookModal from '@/app/components/book-modal';
import { useRouter } from 'next/navigation';
import BlockQuote from '@/app/ui/block-quote';

interface LibraryContentProps {
  status?: BookStatus;
}

export interface FormInput {
  title: string;
  author: string;
  pages: number;
}

const LibraryContent = ({ status }: LibraryContentProps) => {
  const router = useRouter();
  const [books, setBooks] = useState<IBook[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(
    null,
  );

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getOwnLibrary(status);
        setBooks(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBooks();
  }, [status]);

  const handleDelete = async (id: string) => {
    setBooks((prev) => prev.filter((book) => book._id !== id));
    await removeUsersBook(id);
    toast.success('Book deleted successfully');
  };

  const handleAdd = async (formInputs: FormInput) => {
    const { title, author, pages } = formInputs;
    const normalizedTitle = title.trim();
    const normalizedAuthor = author.trim();

    const newBook = await addBook({
      title: normalizedTitle,
      author: normalizedAuthor,
      totalPages: Number(pages),
    });
    setBooks((prev) => [...prev, newBook]);
    setIsSuccess(true);
  };

  const handleSelectBook = (id: string) => {
    const selected = books.find((book) => book._id === id);
    if (selected) {
      setSelectedBook(selected);
    }
  };

  return (
    <>
      <Dashboard>
        <AddBookForm
          isSuccess={isSuccess}
          onSuccess={setIsSuccess}
          onAdd={handleAdd}
        />
        <Wrapper className="md:w-1/2 lg:w-full">
          <p className="font-bold mb-3.5">Recommended books</p>
          <RecommendedShortList />
        </Wrapper>
      </Dashboard>
      <MyLibraryBooks
        books={books}
        handleDelete={handleDelete}
        onSelectBook={handleSelectBook}
      />
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onAction={() => router.push(`/reading/${selectedBook._id}`)}
        />
      )}
    </>
  );
};

export default LibraryContent;
