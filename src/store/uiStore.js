import { create } from 'zustand';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../theme';

const useUIStore = create((set, get) => ({
  // Theme
  themeMode: Appearance.getColorScheme() || 'light',
  theme: Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme,

  setThemeMode: (mode) => {
    const theme = mode === 'dark' ? darkTheme : lightTheme;
    set({ themeMode: mode, theme });
  },

  toggleTheme: () => {
    const next = get().themeMode === 'dark' ? 'light' : 'dark';
    const theme = next === 'dark' ? darkTheme : lightTheme;
    set({ themeMode: next, theme });
  },

  // Toast
  toast: null, // { message, type: 'success'|'error'|'info'|'warning', id }
  showToast: (message, type = 'info', duration = 3000) => {
    const id = Date.now().toString();
    set({ toast: { message, type, id } });
    setTimeout(() => {
      const current = get().toast;
      if (current?.id === id) {
        set({ toast: null });
      }
    }, duration);
  },
  hideToast: () => set({ toast: null }),

  // Global loading
  isGlobalLoading: false,
  setGlobalLoading: (val) => set({ isGlobalLoading: val }),
}));

export default useUIStore;
