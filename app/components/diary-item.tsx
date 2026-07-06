'use client';

import React from 'react';
import { Progress } from '@/types/definitions';
import { format } from 'date-fns';
import Icon from '@/app/ui/icon';

interface DiaryItemProps {
  details: Progress;
  totalPages: number;
  onDelete: (id: string) => void;
}

const DiaryItem = ({
  details,
  totalPages,
  onDelete,
}: DiaryItemProps) => {
  const formatedDate = format(
    new Date(details.startReading),
    'dd.MM.yyyy',
  );
  const finish = new Date(details.finishReading).getTime();
  const start = new Date(details.startReading).getTime();
  const during = Math.round((finish - start) / 60000);
  const pagesRead = details.finishPage - details.startPage + 1;
  const percentage = ((pagesRead / totalPages) * 100).toFixed(2);

  const handleDelete = () => {
    onDelete(details._id);
  };

  return (
    <li>
      <h4>{formatedDate}</h4>
      <p className="text-gray-text">{during} minutes</p>
      <p>{pagesRead}</p>
      <p>{percentage}%</p>
      <button onClick={handleDelete}>
        <Icon
          name="trash"
          viewBox="0 0 24 24"
          width={24}
          height={24}
        />
      </button>
    </li>
  );
};

export default DiaryItem;
