import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserResponse } from '@/services/auth.service';
import { clearQueryCache } from '@/lib/queryClient';

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  _hydrated: boolean;
  setAuth: (user: UserResponse, token: string, refreshToken: string) => void;
  setTokens: (token: string, refreshToken: string) => void;
  updateUser: (patch: Partial<UserResponse>) => void;
  logout: () => void;
}

const cookieStorage = {
  getItem(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  },
  setItem(name: string, value: string): void {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
  },
  removeItem(name: string): void {
    document.cookie = `${name}=; path=/; max-age=0`;
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      _hydrated: false,
      setAuth: (user, token, refreshToken) =>
        set({ user, token, refreshToken, isAuthenticated: true }),
      setTokens: (token, refreshToken) => set({ token, refreshToken }),
      updateUser: (patch) =>
        set((state) => ({ user: state.user ? { ...state.user, ...patch } : state.user })),
      logout: () => {
        clearQueryCache();
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => cookieStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state._hydrated = true;
      },
    },
  ),
);
