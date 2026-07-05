import React from 'react';
import Wrapper from '@/app/ui/wrapper';
import { Progress } from '@/types/definitions';
import DiaryItem from '@/app/components/diary-item';

interface DiaryProps {
  progress: Progress[];
  totalPages: number;
}

const Diary = ({ onDelete, progress, totalPages }: DiaryProps) => {
  const filteredProgress = progress.filter(
    (p) => p.status === 'inactive',
  );
  return (
    <Wrapper>
      <ul>
        {filteredProgress.map((item) => (
          <DiaryItem
            onDelete={onDelete}
            key={item._id}
            readingId={item._id}
            details={item}
            totalPages={totalPages}
          />
        ))}
      </ul>
    </Wrapper>
  );
};

export default Diary;
