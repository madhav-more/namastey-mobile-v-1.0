import React from 'react';
import { View, StyleSheet } from 'react-native';
import useTheme from '../../hooks/useTheme';

/**
 * Card — elevated surface container with optional padding
 */
const Card = ({ children, style, padding, noPadding = false }) => {
  const { theme } = useTheme();
  const { colors, borderRadius, shadows, spacing } = theme;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderRadius: borderRadius.xl,
          borderWidth: 1,
          borderColor: colors.border,
          padding: noPadding ? 0 : (padding ?? spacing[4]),
          ...shadows.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
});

export default Card;
