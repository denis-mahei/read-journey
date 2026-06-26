import { createStore } from 'zustand/vanilla';
import { CurrentResponse } from '@/types/types';

export const useAuthStore = createStore((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: CurrentResponse) => {
    set(() => ({ isAuthenticated: true, user }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
