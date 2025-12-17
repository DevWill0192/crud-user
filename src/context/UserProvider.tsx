import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { userService } from '../services/userService';
import type { User } from '../services/userService';
import { UserContext } from './UserContext';

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUser = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getById(id);
      setCurrentUser(data);
    } catch (err) {
      setError('Error al cargar usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (user: Omit<User, 'id'>) => {
    try {
      setError(null);
      const newUser = await userService.create(user);
      setUsers((prev) => [...prev, newUser]);
    } catch (err) {
      setError('Error al crear usuario');
      throw err;
    }
  }, []);

  const updateUser = useCallback(async (id: number, data: Partial<User>) => {
    try {
      setError(null);
      const updated = await userService.update(id, data);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    } catch (err) {
      setError('Error al actualizar usuario');
      throw err;
    }
  }, []);

  const deleteUser = useCallback(async (id: number) => {
    try {
      setError(null);
      await userService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError('Error al eliminar usuario');
      throw err;
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    userService.getAll()
      .then((data) => {
        if (!ignore) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError('Error al cargar usuarios');
          setLoading(false);
          console.error(err);
        }
      });
    return () => { ignore = true; };
  }, []);

  return (
    <UserContext.Provider
      value={{ users, loading, error, currentUser, fetchUsers, fetchUser, createUser, updateUser, deleteUser, clearError }}
    >
      {children}
    </UserContext.Provider>
  );
}
