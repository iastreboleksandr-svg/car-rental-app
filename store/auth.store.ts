export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}
export const useAuthStore = (): AuthStore => ({
  user: null,
  isAuthenticated: false,
  logout: () => {},
});
