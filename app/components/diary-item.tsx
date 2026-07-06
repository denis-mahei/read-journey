'use client';

import React from 'react';
import { Progress } from '@/types/definitions';
import { format } from 'date-fns';
import Icon from '@/app/ui/icon';

interface DiaryItemProps {
  details: Progress;
  totalPages: number;
  onDelete: (id: string) => void;
  status: string;
}

const DiaryItem = ({
  details,
  totalPages,
  onDelete,
  status,
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
    <li className="flex gap-2 first:text-primary text-gray-text">
      <div className="flex flex-col items-center">
        <Icon
          name="date"
          width={16}
          height={16}
          viewBox={'0 0 16 16'}
        />
        <div className="w-0.5 bg-secondary-bg flex-1" />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center gap-2 mb-4">
          <h4 className="text-xs translate-y-px font-bold">
            {formatedDate}
          </h4>
          <p className="text-xs text-gray-text">{pagesRead} pages</p>
        </div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-primary">{percentage}%</p>
          <Icon
            name="diagram"
            width={44}
            height={18}
            viewBox={'0 0 44 18'}
          />
        </div>
        <div className="flex justify-between">
          <p className="text-gray-text text-[10px]">
            {during} minutes
          </p>
          <p className="text-gray-text text-[10px] w-11 text-center mb-4">
            {details.speed} pages per hour
          </p>
        </div>
      </div>
      {status === 'in-progress' && (
        <button onClick={handleDelete}>
          <Icon
            name="delete"
            viewBox="0 0 14 14"
            width={14}
            height={14}
          />
        </button>
      )}
    </li>
  );
};

export default DiaryItem;
