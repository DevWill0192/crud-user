import { createContext } from 'react';
import type { User } from '../services/userService';

export type UserContextType = {
  users: User[];
  loading: boolean;
  error: string | null;
  currentUser: User | null;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: number) => Promise<void>;
  createUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: number, data: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  clearError: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);
