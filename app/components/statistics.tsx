import React from 'react';
import Wrapper from '@/app/ui/wrapper';
import { Progress } from '@/types/definitions';

interface StatisticsProps {
  totalPages: number;
  progress: Progress[];
}

const Statistics = ({ totalPages, progress }: StatisticsProps) => {
  const mapped = progress.map((item) => item.finishPage);
  const finish = Math.max(...mapped);
  const percentage = (finish / totalPages) * 100;
  const progressBar = (283 * percentage) / 100;
  return (
    <Wrapper>
      <div>
        <svg width="116" height="116" viewBox="0 0 116 116">
          <circle
            cx="58"
            cy="58"
            r="45"
            fill="none"
            stroke="#1f1f1f"
            strokeWidth="8"
          />

          <circle
            cx="58"
            cy="58"
            r="45"
            fill="none"
            strokeLinecap="round"
            stroke="#30B94D"
            strokeWidth="8"
            strokeDasharray={`${progressBar} 283`}
            transform="rotate(-90 58 58)"
          />
        </svg>
        <p>{percentage.toFixed(2)}%</p>
        <p>{finish} pages read</p>
      </div>
    </Wrapper>
  );
};

export default Statistics;
