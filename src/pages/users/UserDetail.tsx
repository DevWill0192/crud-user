import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import styles from './users.module.css';

export default function UserDetail() {
  const { id } = useParams();
  const { currentUser, fetchUser, loading } = useUsers();

  useEffect(() => {
    if (id) fetchUser(Number(id));
  }, [id]);

  if (loading || !currentUser) return <p className={styles.loading}>Cargando...</p>;

  return (
    <div className={styles.container}>
      <Link to="/users" className={styles.backLink}>← Volver a usuarios</Link>
      <div className={styles.detailCard}>
        <h1>{currentUser?.name}</h1>
        <p><strong>Username:</strong> {currentUser?.username}</p>
        <p><strong>Email:</strong> {currentUser?.email}</p>
        <p><strong>Phone:</strong> {currentUser?.phone}</p>
        <p><strong>Website:</strong> {currentUser?.website}</p>
        <h3>Dirección</h3>
        <p>{currentUser?.address?.street}, {currentUser?.address?.suite}</p>
        <p>{currentUser?.address?.city} - {currentUser?.address?.zipcode}</p>
        <h3>Compañía</h3>
        <p>{currentUser?.company?.name}</p>
        <p>{currentUser?.company?.catchPhrase}</p>
        <div className={styles.detailActions}>
          <Link to={`/users/${currentUser?.id}/edit`} className={styles.btnPrimary}>Editar</Link>
        </div>
      </div>
    </div>
  );
}
