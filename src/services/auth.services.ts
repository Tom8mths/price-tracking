import { api } from './api';

export const AuthService = {
  login: async (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },

  register: async (data: { username: string, email: string; password: string }) => {
    return api.post('/auth/register', data);
  },
};
