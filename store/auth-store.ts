import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { AuthState, IAuthStore } from '@/types/types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
};

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      logout: () => {
        set(initialState);
      },
      authenticate: (authData) => {
        set({
          user: {
            name: authData.name,
            email: authData.email,
          },
          token: authData.token,
          refreshToken: authData.refreshToken,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
