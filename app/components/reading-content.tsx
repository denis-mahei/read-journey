'use client';
import React, { useEffect, useState } from 'react';
import {
  deleteFromReading,
  finishReading,
  getBookById,
  startReading,
} from '@/services/client-api';
import LibraryBookItem from '@/app/components/library-book-item';
import Dashboard from '@/app/ui/dashboard';
import AddReading, {
  AddReadingInput,
} from '@/app/components/add-reading';
import { BookDetails, Progress } from '@/types/definitions';
import Icon from '@/app/ui/icon';
import ProgressStaticText from '@/app/ui/progress-static-text';
import Diary from '@/app/components/diary';
import Statistics from '@/app/components/statistics';
import clsx from 'clsx';
import { toast } from 'sonner';
import IsReadModal from '@/app/ui/is-read-modal';
import axios from 'axios';
import MainWrapper from '@/app/ui/main-wrapper';

interface ReadingContentProps {
  id: string;
}

const ReadingContent = ({ id }: ReadingContentProps) => {
  const [book, setBook] = useState<BookDetails | null>(null);
  const [activeView, setActiveView] = useState<
    'diary' | 'statistics'
  >('diary');
  const [isRead, setIsRead] = useState(false);

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
  const handleFinishReading = async (formInput: AddReadingInput) => {
    const { page } = formInput;
    const finishPage = await finishReading({ id, page });
    setBook(finishPage);
    if (finishPage.status === 'done') setIsRead(true);
  };

  const handleDelete = async (readingId: string) => {
    try {
      const data = await deleteFromReading({ bookId: id, readingId });
      setBook(data);
      toast.success('Reading deleted successfully.');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error);
      } else {
        toast.error('Error deleting reading');
      }
    }
  };

  const isReading =
    book !== null && book.progress.at(-1)?.status === 'active';

  const filteredProgress = book?.progress
    ? book.progress.filter((p) => p.status === 'inactive')
    : [];

  return (
    <>
      <Dashboard>
        <div>
          <AddReading
            onStartReading={handleStartReading}
            onFinishReading={handleFinishReading}
            isReading={isReading}
          />
          {book !== null && filteredProgress.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-md">
                  {activeView === 'statistics'
                    ? 'Statistics'
                    : 'Diary'}
                </h3>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setActiveView('diary')}
                    className={clsx(
                      'text-gray-text',
                      activeView === 'diary'
                        ? 'text-primary'
                        : 'text-gray-text',
                    )}
                  >
                    <Icon
                      name="sand-clock"
                      width={20}
                      height={20}
                      viewBox={'0 0 20 20'}
                    />
                  </button>
                  <button
                    onClick={() => setActiveView('statistics')}
                    className={clsx(
                      'text-gray-text',
                      activeView === 'statistics'
                        ? 'text-primary'
                        : 'text-gray-text',
                    )}
                  >
                    <Icon
                      name="chart"
                      width={20}
                      height={20}
                      viewBox={'0 0 20 20'}
                    />
                  </button>
                </div>
              </div>
              {activeView === 'statistics' ? (
                <Statistics
                  totalPages={book.totalPages}
                  progress={filteredProgress}
                />
              ) : (
                <Diary
                  status={book.status}
                  progress={filteredProgress as Progress[]}
                  totalPages={book.totalPages}
                  onDelete={handleDelete}
                />
              )}
            </div>
          ) : (
            <ProgressStaticText />
          )}
        </div>
      </Dashboard>
      {book && (
        <MainWrapper>
          <h2 className="text-xl font-bold mb-10">My reading</h2>
          <div className="flex flex-col items-center gap-5">
            <LibraryBookItem book={book} variant={'center'} />
            {!isReading ? (
              <Icon
                name="rec"
                viewBox="0 0 50 50"
                width={50}
                height={50}
                className="size-7 md:size-12"
              />
            ) : (
              <Icon
                name="stop-rec"
                viewBox="0 0 50 50"
                width={50}
                height={50}
                className="size-7 md:size-12"
              />
            )}
          </div>
        </MainWrapper>
      )}
      {isRead && <IsReadModal onClose={() => setIsRead(false)} />}
    </>
  );
};

export default ReadingContent;
