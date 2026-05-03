import api from './api';

const dataService = {
  getCities: async () => {
    const res = await api.get('/data/cities');
    return res.data.cities;
  },

  getPackages: async () => {
    const res = await api.get('/data/packages');
    return res.data.packages;
  },

  getThemes: async () => {
    const res = await api.get('/data/themes');
    return res.data.themes;
  },

  getAddons: async () => {
    const res = await api.get('/data/addons');
    return res.data.addons;
  },
};

export default dataService;
