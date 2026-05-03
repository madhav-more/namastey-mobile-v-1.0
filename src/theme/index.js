import { lightColors, darkColors } from './colors';
import { fontSizes, fontWeights, lineHeights, letterSpacings, textStyles } from './typography';
import spacing, { borderRadius, shadows } from './spacing';

export const createTheme = (isDark) => ({
  dark: isDark,
  colors: isDark ? darkColors : lightColors,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  textStyles,
  spacing,
  borderRadius,
  shadows,
});

export const lightTheme = createTheme(false);
export const darkTheme = createTheme(true);
