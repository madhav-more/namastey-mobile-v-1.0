import * as SecureStore from 'expo-secure-store';

export const storage = {
  get: async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  set: async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (_) {}
  },
  delete: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (_) {}
  },
};

export default storage;
