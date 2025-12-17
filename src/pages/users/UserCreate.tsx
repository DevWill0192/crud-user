import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import styles from './users.module.css';
import Input from '../../components/Input';
import { useForm } from '../../hooks/useForm';
import Modal from '../../components/Modal/Modal';


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


export default function UserCreate() {
  const navigate = useNavigate();
  const { createUser } = useUsers();
  const [isOpen, setIsOpen] = useState(false);

  const validateUserForm = (values: UserFormValues) => {
    const errors: Partial<UserFormValues> = {};
  
    if (!values.name) errors.name = 'Nombre requerido';
    if (!values.username) errors.username = 'Username requerido';
  
    if (!values.email) {
      errors.email = 'Email requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email inválido';
    }
  
    if (!values.city) errors.city = 'Ciudad requerida';
  
    return errors;
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    reset,
  } = useForm<UserFormValues>({
    initialValues: initialUserForm,
    validate: validateUserForm,
    onSubmit: async (data) => {
      await createUser({
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
      setIsOpen(true);
    },
  });
  
  return (
    <>
    <Modal isOpen={isOpen} onClose={() => {setIsOpen(false); navigate('/users')}} onCloseAdd={()=> setIsOpen(false)} />
    <div className={styles.container}>
      <Link to="/users" className={styles.backLink}>← Volver a usuarios</Link>
      <h1 className={styles.title}>Crear Usuario</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
          <Input errors={errors} type="text" label="Nombre" name="name" value={values.name} onChange={handleChange} />
          <Input errors={errors} type="text" label="Username" name="username" value={values.username} onChange={handleChange} />
          <Input errors={errors} type="email" label="Email" name="email" value={values.email} onChange={handleChange} />
          <Input errors={errors} type="tel" label="Teléfono" name="phone" value={values.phone} onChange={handleChange} />
          <Input errors={errors} type="text" label="Website" name="website" value={values.website} onChange={handleChange} />
          <Input errors={errors}    type="text" label="Dirección" name="street" value={values.street} onChange={handleChange} />
          <Input errors={errors} type="text" label="Suite" name="suite" value={values.suite} onChange={handleChange} />
          <Input errors={errors} type="text" label="Ciudad" name="city" value={values.city} onChange={handleChange} />
          <Input errors={errors} type="text" label="Código postal" name="zipcode" value={values.zipcode} onChange={handleChange} />
          <Input errors={errors} type="text" label="Latitud" name="lat" value={values.lat} onChange={handleChange} />
          <Input errors={errors} type="text" label="Longitud" name="lng" value={values.lng} onChange={handleChange} />
        <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>{isSubmitting ? 'Creando...' : 'Crear Usuario'}</button>
        <button type="button" onClick={reset}>
        Reset
      </button>
      </form>
    </div>
    </>
  );
}
