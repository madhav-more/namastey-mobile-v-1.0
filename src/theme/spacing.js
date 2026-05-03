/**
 * Namastey Spacing System — 4px base grid
 */

const BASE = 4;

const spacing = {
  0: 0,
  0.5: BASE * 0.5,  // 2
  1: BASE * 1,      // 4
  1.5: BASE * 1.5,  // 6
  2: BASE * 2,      // 8
  2.5: BASE * 2.5,  // 10
  3: BASE * 3,      // 12
  4: BASE * 4,      // 16
  5: BASE * 5,      // 20
  6: BASE * 6,      // 24
  7: BASE * 7,      // 28
  8: BASE * 8,      // 32
  10: BASE * 10,    // 40
  12: BASE * 12,    // 48
  14: BASE * 14,    // 56
  16: BASE * 16,    // 64
  20: BASE * 20,    // 80
  24: BASE * 24,    // 96
};

export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const shadows = {
  none: {},
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 12,
  },
  colored: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  }),
};

export default spacing;
