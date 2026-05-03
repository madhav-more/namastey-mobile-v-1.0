import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useTheme from '../../hooks/useTheme';
import { getInitials } from '../../utils/formatters';

/**
 * Avatar — shows profile photo or gradient initials fallback
 */
const Avatar = ({ uri, name, size = 48, style }) => {
  const { theme } = useTheme();
  const { colors, borderRadius } = theme;

  const initials = getInitials(name);
  const radius = size / 2;

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: radius },
          style,
        ]}
      />
    );
  }

  return (
    <LinearGradient
      colors={colors.gradientPrimary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.fallback,
        { width: size, height: size, borderRadius: radius },
        style,
      ]}
    >
      <Text
        style={[
          styles.initials,
          { fontSize: size * 0.35, color: '#fff' },
        ]}
      >
        {initials}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  image: { resizeMode: 'cover' },
  fallback: { alignItems: 'center', justifyContent: 'center' },
  initials: { fontWeight: '700' },
});

export default Avatar;
