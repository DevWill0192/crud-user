import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const UserList = lazy(() => import('../pages/users/UserList'));
const UserCreate = lazy(() => import('../pages/users/UserCreate'));
const UserEdit = lazy(() => import('../pages/users/UserEdit'));
const UserDetail = lazy(() => import('../pages/users/UserDetail'));

function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>}>
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyWrapper><UserList /></LazyWrapper>,
  },
  {
    path: '/users',
    element: <LazyWrapper><UserList /></LazyWrapper>,
  },
  {
    path: '/users/create',
    element: <LazyWrapper><UserCreate /></LazyWrapper>,
  },
  {
    path: '/users/:id',
    element: <LazyWrapper><UserDetail /></LazyWrapper>,
  },
  {
    path: '/users/:id/edit',
    element: <LazyWrapper><UserEdit /></LazyWrapper>,
  },
]);
