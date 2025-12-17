import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const UserCard = memo(function UserCard({ 
    user, 
    onDelete 
  }: { 
    user: { id: number; name: string; email: string }; 
    onDelete: (id: number) => void;
  }) {
    return (
      <li className={styles.userCard} role="article" aria-labelledby={`user-${user.id}`}>
        <div className={styles.userInfo}>
          <h3 id={`user-${user.id}`}>{user.name}</h3>
          <p>{user.email}</p>
        </div>
        <div className={styles.actions} role="group" aria-label="Acciones de usuario">
          <Link to={`/users/${user.id}`} className={styles.btnSecondary} aria-label={`Ver detalles de ${user.name}`}>
            Ver
          </Link>
          <Link to={`/users/${user.id}/edit`} className={styles.btnWarning} aria-label={`Editar ${user.name}`}>
            Editar
          </Link>
          <button 
            onClick={() => onDelete(user.id)} 
            className={styles.btnDanger}
            aria-label={`Eliminar ${user.name}`}
          >
            Eliminar
          </button>
        </div>
      </li>
    );
  });