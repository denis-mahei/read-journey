import React from 'react';
import Wrapper from '@/app/ui/wrapper';
import { Progress } from '@/types/definitions';
import DiaryItem from '@/app/components/diary-item';

interface DiaryProps {
  progress: Progress[];
  totalPages: number;
  onDelete: (readingId: string) => Promise<void>;
  status: string;
}

const Diary = ({
  status,
  onDelete,
  totalPages,
  progress,
}: DiaryProps) => {
  return (
    <Wrapper>
      <ul>
        {progress.map((item) => (
          <DiaryItem
            onDelete={onDelete}
            status={status}
            key={item._id}
            details={item}
            totalPages={totalPages}
          />
        ))}
      </ul>
    </Wrapper>
  );
};

export default Diary;
