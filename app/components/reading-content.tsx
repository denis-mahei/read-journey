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
import SvgIcon from '@/app/ui/svg-icon';
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
  const times = book !== null && book.timeLeftToRead;

  return (
    <>
      <Dashboard className="lg:w-88.25 lg:gap-10">
        <AddReading
          onStartReading={handleStartReading}
          onFinishReading={handleFinishReading}
          isReading={isReading}
        />
        {book !== null && filteredProgress.length > 0 ? (
          <div className="md:w-1/2 lg:w-full">
            <div className="flex justify-between items-center mb-5 md:mb-4">
              <h3 className="font-bold text-md">
                {activeView === 'statistics' ? 'Statistics' : 'Diary'}
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
                  <SvgIcon
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
                  <SvgIcon
                    name="chart"
                    width={20}
                    height={20}
                    viewBox={'0 0 20 20'}
                  />
                </button>
              </div>
            </div>
            {activeView === 'statistics' && (
              <p className="hidden lg:inline-block lg:text-sm text-gray-text lg:mb-5">
                Each page, each chapter is a new round of knowledge, a
                new step towards understanding. By rewriting
                statistics, we create our own reading history.
              </p>
            )}
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
      </Dashboard>
      {book && (
        <MainWrapper className="flex-1">
          <div className="flex justify-between items-center mb-10 md:mb-8 lg:mb-11">
            <h2 className="text-xl font-bold md:text-[28px]">
              My reading
            </h2>
            {times && (
              <p className="text-xs md:text-sm text-gray-text">
                {times.hours} hours and {times.minutes} minutes left
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-5">
            <LibraryBookItem book={book} variant={'reading'} />
            {!isReading ? (
              <SvgIcon
                name="rec"
                viewBox="0 0 50 50"
                width={50}
                height={50}
                className="size-7 md:size-12"
              />
            ) : (
              <SvgIcon
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
