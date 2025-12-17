import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import styles from './users.module.css';
import { UserCard } from '../../components/UserCard';



export default function UserList() {
  const { users, loading, error, deleteUser, clearError } = useUsers();

  const handleDelete = useCallback((id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      deleteUser(id);
    }
  }, [deleteUser]);

  if (loading) {
    return (
      <div className={styles.container} role="status" aria-live="polite">
        <div className={styles.loadingState}>
          <div className={styles.spinner} aria-hidden="true" />
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container} role="alert">
        <div className={styles.errorState}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={clearError} className={styles.btnPrimary}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Usuarios</h1>
          <Link to="/users/create" className={styles.btnPrimary} aria-label="Crear nuevo usuario">
            + Crear Usuario
          </Link>
        </div>
        <div className={styles.emptyState} role="status">
          <p>No hay usuarios registrados</p>
          <Link to="/users/create" className={styles.btnPrimary}>
            Crear el primer usuario
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Usuarios</h1>
        <Link to="/users/create" className={styles.btnPrimary} aria-label="Crear nuevo usuario">
          + Crear Usuario
        </Link>
      </div>
      <ul className={styles.userList} role="list" aria-label="Lista de usuarios">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleDelete} />
        ))}
      </ul>
    </main>
  );
}
