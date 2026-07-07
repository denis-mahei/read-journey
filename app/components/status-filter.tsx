'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SvgIcon from '@/app/ui/svg-icon';
import clsx from 'clsx';

const STATUS_OPTIONS = [
  { value: '', label: 'All books' },
  { value: 'unread', label: 'Unread' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
] as const;

export type BookStatus = (typeof STATUS_OPTIONS)[number]['value'];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') ?? '';

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set('status', value);
    else params.delete('status');
    router.push(`/library?${params.toString()}`);
    setIsOpen(false);
  };

  const selected = STATUS_OPTIONS.find(
    (o) => o.value === currentStatus,
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-7 border border-dropdown-b px-3.5 py-3 min-w-30 rounded-xl text-primary"
      >
        {selected?.label ?? 'Filter by status'}
        {isOpen ? (
          <SvgIcon
            name="chevron-up"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            className="text-primary size-4"
          />
        ) : (
          <SvgIcon
            name="chevron-down"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            className="text-primary size-4"
          />
        )}
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 mt-2 p-3.5 bg-input-bg w-full rounded-xl overflow-hidden z-10">
          {STATUS_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className={clsx(
                  'text-gray-text text-xs w-full text-left rounded-lg p-1.5' +
                    ' md:p-2' +
                    ' lg:hover:bg-white/10',
                  option === selected && 'text-primary',
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusFilter;
