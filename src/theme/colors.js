/**
 * Namastey Color System
 * Premium saffron & gold (light) + deep navy & charcoal (dark)
 */

const palette = {
  // Brand
  saffron: '#FF6B35',
  saffronLight: '#FF8C5A',
  saffronDark: '#E05520',
  gold: '#F4A223',
  goldLight: '#F7C05A',
  goldDark: '#D4881A',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  cream: '#FFF8F0',
  warmGray50: '#FAFAF9',
  warmGray100: '#F5F4F2',
  warmGray200: '#E8E6E1',
  warmGray300: '#D4D0CA',
  warmGray400: '#A8A29E',
  warmGray500: '#78716C',
  warmGray600: '#57534E',
  warmGray700: '#44403C',
  warmGray800: '#292524',
  warmGray900: '#1C1917',

  // Semantic
  success: '#22C55E',
  successLight: '#DCFCE7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
};

export const lightColors = {
  // Backgrounds
  background: palette.cream,
  surface: palette.white,
  surfaceElevated: palette.warmGray50,
  card: palette.white,
  overlay: 'rgba(0,0,0,0.5)',

  // Brand
  primary: palette.saffron,
  primaryLight: palette.saffronLight,
  primaryDark: palette.saffronDark,
  secondary: palette.gold,
  secondaryLight: palette.goldLight,
  accent: '#8B5CF6',

  // Text
  textPrimary: palette.warmGray900,
  textSecondary: palette.warmGray600,
  textTertiary: palette.warmGray400,
  textInverse: palette.white,
  textOnPrimary: palette.white,

  // Borders
  border: palette.warmGray200,
  borderLight: palette.warmGray100,
  divider: palette.warmGray100,

  // Status
  success: palette.success,
  successBg: palette.successLight,
  error: palette.error,
  errorBg: palette.errorLight,
  warning: palette.warning,
  warningBg: palette.warningLight,
  info: palette.info,
  infoBg: palette.infoLight,

  // Booking status
  statusPending: '#F59E0B',
  statusPendingBg: '#FEF3C7',
  statusConfirmed: '#22C55E',
  statusConfirmedBg: '#DCFCE7',
  statusCancelled: '#EF4444',
  statusCancelledBg: '#FEE2E2',
  statusCompleted: '#6366F1',
  statusCompletedBg: '#EEF2FF',
  statusInProgress: '#3B82F6',
  statusInProgressBg: '#DBEAFE',

  // Gradients (as arrays for LinearGradient)
  gradientPrimary: ['#FF6B35', '#F4A223'],
  gradientSurface: ['#FFFFFF', '#FFF8F0'],
  gradientCard: ['rgba(255,255,255,0.95)', 'rgba(255,248,240,0.90)'],
  gradientHero: ['#FF6B35', '#E05520', '#8B1A00'],

  // Tab bar
  tabActive: palette.saffron,
  tabInactive: palette.warmGray400,
  tabBackground: palette.white,

  // Input
  inputBackground: palette.warmGray50,
  inputBorder: palette.warmGray200,
  inputFocusBorder: palette.saffron,
  placeholder: palette.warmGray400,
};

export const darkColors = {
  // Backgrounds
  background: '#0F0E0D',
  surface: '#1C1917',
  surfaceElevated: '#292524',
  card: '#1C1917',
  overlay: 'rgba(0,0,0,0.7)',

  // Brand
  primary: palette.saffron,
  primaryLight: palette.saffronLight,
  primaryDark: palette.saffronDark,
  secondary: palette.gold,
  secondaryLight: palette.goldLight,
  accent: '#A78BFA',

  // Text
  textPrimary: '#F5F4F2',
  textSecondary: '#A8A29E',
  textTertiary: '#57534E',
  textInverse: palette.warmGray900,
  textOnPrimary: palette.white,

  // Borders
  border: '#3D3936',
  borderLight: '#292524',
  divider: '#292524',

  // Status
  success: palette.success,
  successBg: '#14532D',
  error: palette.error,
  errorBg: '#7F1D1D',
  warning: palette.warning,
  warningBg: '#78350F',
  info: palette.info,
  infoBg: '#1E3A5F',

  // Booking status
  statusPending: '#FBBF24',
  statusPendingBg: '#451A03',
  statusConfirmed: '#4ADE80',
  statusConfirmedBg: '#052E16',
  statusCancelled: '#F87171',
  statusCancelledBg: '#450A0A',
  statusCompleted: '#818CF8',
  statusCompletedBg: '#1E1B4B',
  statusInProgress: '#60A5FA',
  statusInProgressBg: '#0C1A2E',

  // Gradients
  gradientPrimary: ['#FF6B35', '#F4A223'],
  gradientSurface: ['#1C1917', '#0F0E0D'],
  gradientCard: ['rgba(28,25,23,0.98)', 'rgba(15,14,13,0.95)'],
  gradientHero: ['#FF6B35', '#E05520', '#8B1A00'],

  // Tab bar
  tabActive: palette.saffron,
  tabInactive: '#57534E',
  tabBackground: '#1C1917',

  // Input
  inputBackground: '#292524',
  inputBorder: '#3D3936',
  inputFocusBorder: palette.saffron,
  placeholder: '#78716C',
};
