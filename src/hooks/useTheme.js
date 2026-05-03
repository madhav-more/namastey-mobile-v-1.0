import useUIStore from '../store/uiStore';

const useTheme = () => {
  const theme = useUIStore((s) => s.theme);
  const themeMode = useUIStore((s) => s.themeMode);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const setThemeMode = useUIStore((s) => s.setThemeMode);

  return { theme, themeMode, isDark: themeMode === 'dark', toggleTheme, setThemeMode };
};

export default useTheme;
