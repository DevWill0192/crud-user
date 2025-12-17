import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../context/UserProvider';
import UserList from '../pages/users/UserList';
import { userService } from '../services/userService';

vi.mock('../services/userService', () => ({
  userService: {
    getAll: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockUsers = [
  { id: 1, name: 'John Doe', username: 'johnd', email: 'john@example.com', phone: '123', website: 'john.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
  { id: 2, name: 'Jane Smith', username: 'janes', email: 'jane@example.com', phone: '456', website: 'jane.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
];

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <UserProvider>{ui}</UserProvider>
    </MemoryRouter>
  );
}

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra estado de carga inicialmente', () => {
    vi.mocked(userService.getAll).mockImplementation(() => new Promise(() => {}));
    renderWithProviders(<UserList />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it('muestra lista de usuarios cuando carga exitosamente', async () => {
    vi.mocked(userService.getAll).mockResolvedValue(mockUsers);
    renderWithProviders(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('muestra estado vacío cuando no hay usuarios', async () => {
    vi.mocked(userService.getAll).mockResolvedValue([]);
    renderWithProviders(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/no hay usuarios/i)).toBeInTheDocument();
    });
  });

  it('muestra error cuando falla la API', async () => {
    vi.mocked(userService.getAll).mockRejectedValue(new Error('Network error'));
    renderWithProviders(<UserList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('tiene roles ARIA correctos para accesibilidad', async () => {
    vi.mocked(userService.getAll).mockResolvedValue(mockUsers);
    renderWithProviders(<UserList />);

    await waitFor(() => {
      expect(screen.getByRole('list', { name: /lista de usuarios/i })).toBeInTheDocument();
      expect(screen.getAllByRole('article')).toHaveLength(2);
    });
  });
});

