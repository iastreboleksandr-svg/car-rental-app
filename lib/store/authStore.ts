import { create } from "zustand";
import { persist } from "zustand/middleware";
import User from "@/lib/types/user";
import { mockUsers } from "@/lib/mocks/users";

type AuthStore = {
  user: User | null;
  users: User[];
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      users: mockUsers,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      register: (user) =>
        set((state) => ({
          users: [...state.users, user],
          user,
        })),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    { name: "auth" },
  ),
);