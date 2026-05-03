import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import authService from '../services/auth.service';

const AUTH_TOKEN_KEY = 'namastey_token';
const AUTH_USER_KEY = 'namastey_user';

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,

  // Initialize — restore session from SecureStore
  initialize: async () => {
    set({ isLoading: true });
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      const userRaw = await SecureStore.getItemAsync(AUTH_USER_KEY);

      if (token && userRaw) {
        const user = JSON.parse(userRaw);
        authService.setAuthHeader(token);
        set({ user, token, isAuthenticated: true });
      }
    } catch (_) {
      // Silent — treat as unauthenticated
    } finally {
      set({ isLoading: false, isInitialized: true });
    }
  },

  // Register
  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await authService.register(data);
      await get()._persistSession(user, token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed.';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Login
  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await authService.login(data);
      await get()._persistSession(user, token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed.';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Logout
  logout: async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTH_USER_KEY);
    authService.removeAuthHeader();
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  // Update user in store (after profile update)
  updateUser: (updatedUser) => {
    SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  clearError: () => set({ error: null }),

  // Private: persist session
  _persistSession: async (user, token) => {
    authService.setAuthHeader(token);
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(user));
  },
}));

export default useAuthStore;
