import api, { setAuthHeader, removeAuthHeader } from './api';

const authService = {
  register: async (data) => {
    const res = await api.post('/auth/register', data);
    return res.data; // { user, token }
  },

  login: async (data) => {
    const res = await api.post('/auth/login', data);
    return res.data;
  },

  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data.user;
  },

  setAuthHeader,
  removeAuthHeader,
};

export default authService;
