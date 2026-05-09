import axios from 'axios';
import Constants from 'expo-constants';
// live url- https://namastey-backend-v-1-0.vercel.app/
// const BASE_URL ="http://10.60.61.48:5001/api/v1"

const BASE_URL ="https://namastey-backend-v-1-0.vercel.app/"


  // Constants.expoConfig?.extra?.apiUrl || 'http://172.27.151.48:5001/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — could add request logging here
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error status
      return Promise.reject(error);
    } else if (error.request) {
      // No response received
      return Promise.reject({
        response: {
          data: { message: 'Unable to reach server. Check your connection.' },
        },
      });
    }
    return Promise.reject(error);
  }
);

export const setAuthHeader = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthHeader = () => {
  delete api.defaults.headers.common['Authorization'];
};

export default api;
