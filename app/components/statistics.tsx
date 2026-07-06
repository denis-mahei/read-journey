import React from 'react';
import Wrapper from '@/app/ui/wrapper';
import { Progress } from '@/types/definitions';

interface StatisticsProps {
  totalPages: number;
  progress: Progress[];
}

const Statistics = ({ totalPages, progress }: StatisticsProps) => {
  const mapped = progress.map((item) => item.finishPage);
  const finish = mapped.length > 0 ? Math.max(...mapped) : 0;
  const percentage = (finish / totalPages) * 100;
  const progressBar = (283 * percentage) / 100;
  return (
    <Wrapper>
      <div className="flex gap-5 flex-col items-center justify-center">
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
          <text
            x="60"
            y="64"
            textAnchor="middle"
            fill="currentColor"
            className="font-bold text-md"
          >
            {percentage.toFixed(2)}%
          </text>
        </svg>
        <div className="flex gap-2">
          <div className="rounded-sm w-3.5 h-3.5 bg-[#30b94d]" />
          <p className="text-sm font-bold -translate-y-px">
            {finish} pages read
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Statistics;
