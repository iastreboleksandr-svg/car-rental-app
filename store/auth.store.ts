
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: 'renter' | 'owner';
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}

export const useAuthStore = (): AuthStore => ({
  user: {
    id: '1',
    firstName: 'Олег',
    lastName: 'Васильев',
    email: 'oleg@example.com',
    phone: '+380991234567',
    role: 'owner',
  },
  isAuthenticated: true,
  logout: () => {},
});

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatarUrl?: string;
//   role: 'renter' | 'owner';
// }

// export interface AuthStore {
//   user: User | null;
//   isAuthenticated: boolean;
//   logout: () => void;
// }

// export const useAuthStore = (): AuthStore => ({
//   user: {
//     id: '1',
//     name: 'Олег В.',
//     email: 'oleg@example.com',
//     role: 'owner',  
//   },
//   isAuthenticated: true,
//   logout: () => {},
// });