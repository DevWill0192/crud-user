import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import { userService } from '../../services/userService';
import { useForm } from '../../hooks/useForm';
import styles from './users.module.css';
import Input from '../../components/Input';

type UserFormValues = {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
};

const initialUserForm: UserFormValues = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  street: '',
  suite: '',
  city: '',
  zipcode: '',
  lat: '',
  lng: '',
};

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useUsers();


  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setValues,
    reset,
  } = useForm<UserFormValues>({
    initialValues: initialUserForm,
    onSubmit: async (data) => {
      if (!id) return;

      await updateUser(Number(id), {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        website: data.website,
        address: {
          street: data.street,
          suite: data.suite,
          city: data.city,
          zipcode: data.zipcode,
          geo: {
            lat: data.lat,
            lng: data.lng,
          },
        },
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      });

      navigate('/users');
    },
  });

  useEffect(() => {
    if (!id) return;

    userService.getById(Number(id)).then((user) => {
      setValues({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
      });
    });
  }, [id, setValues]);
  useEffect(() => {
    if (!id) return;
  
    userService.getById(Number(id)).then((user) => {
      setValues({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
      });
    });
  }, [id, setValues]);
  

  return (
    <div className={styles.container}>
      <Link to="/users" className={styles.backLink}>
        ← Volver a usuarios
      </Link>

      <h1 className={styles.title}>Editar Usuario</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input type='text' label="Nombre" name="name" value={values.name} onChange={handleChange} errors={errors} />
        <Input type='text' label="Username" name="username" value={values.username} onChange={handleChange} errors={errors} />
        <Input type='email' label="Email" name="email" value={values.email} onChange={handleChange} errors={errors} />
        <Input type='text' label="Teléfono" name="phone" value={values.phone} onChange={handleChange} errors={errors} />
        <Input type='text' label="Website" name="website" value={values.website} onChange={handleChange} errors={errors} />

        <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
        </button>

        <button type="button" onClick={reset}>
          Reset
        </button>
      </form>
    </div>
  );
}
