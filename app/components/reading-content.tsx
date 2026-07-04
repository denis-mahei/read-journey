'use client';
import React, { useEffect, useState } from 'react';
import { getBookById, startReading } from '@/services/client-api';
import LibraryBookItem from '@/app/components/library-book-item';
import Dashboard from '@/app/ui/dashboard';
import AddReading, {
  AddReadingInput,
} from '@/app/components/add-reading';
import { toast } from 'sonner';
import { BookDetails } from '@/types/definitions';
import Icon from '@/app/ui/icon';

interface ReadingContentProps {
  id: string;
}

const ReadingContent = ({ id }: ReadingContentProps) => {
  const [book, setBook] = useState<BookDetails | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  const handleStartReading = async (formInput: AddReadingInput) => {
    const { page } = formInput;
    const startPage = await startReading({ id, page });
    setBook(startPage);
  };

  const isReading =
    book?.progress.length > 0 &&
    book?.progress[book?.progress.length - 1].status === 'active';

  return (
    <div>
      <Dashboard>
        <AddReading
          toReading={handleStartReading}
          id={id}
          isReading={isReading}
        />
      </Dashboard>
      {book && (
        <>
          <LibraryBookItem book={book} />
          {!isReading ? (
            <Icon
              name="rec"
              viewBox="0 0 50 50"
              width={50}
              height={50}
            />
          ) : (
            <Icon
              name="stop-rec"
              viewBox="0 0 50 50"
              width={50}
              height={50}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ReadingContent;
