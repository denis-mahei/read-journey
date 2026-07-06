'use client';

import React from 'react';
import { useAuthStore } from '@/store/auth-store';

interface UserBarProps {}

const UserBar = ({}: UserBarProps) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;
  return (
    <div className="flex items-center gap-2">
      <div
        className="bg-input-bg rounded-full border p-2 h-8.75 w-8.75
    flex justify-center items-center border-light-gr md:p-5.5"
      >
        <p className="font-bold">{user?.name?.[0]}</p>
      </div>
      <p className="hidden lg:block font-bold">{user.name}</p>
    </div>
  );
};

export default UserBar;
