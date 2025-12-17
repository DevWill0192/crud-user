const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export const userService = {
  getAll: async (): Promise<User[]> => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  getById: async (id: number): Promise<User> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
  },

  create: async (user: Omit<User, 'id'>): Promise<User> => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return res.json();
  },

  update: async (id: number, user: Partial<User>): Promise<User> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  },
};

