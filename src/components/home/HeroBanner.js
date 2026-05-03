import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useTheme from '../../hooks/useTheme';

const { width } = Dimensions.get('window');

const HeroBanner = ({ userName }) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <LinearGradient
      colors={colors.gradientHero}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.banner, { borderRadius: borderRadius['2xl'], marginHorizontal: spacing[4] }]}
    >
      <View style={styles.content}>
        <Text style={styles.greeting}>{greeting()} 👋</Text>
        <Text style={styles.name}>{userName || 'Guest'}</Text>
        <Text style={styles.tagline}>
          Book a warm Indian welcome{'\n'}for your loved ones
        </Text>
      </View>
      <Text style={styles.emoji}>🙏</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 160,
  },
  content: { flex: 1 },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginTop: 2,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 10,
    lineHeight: 19,
  },
  emoji: {
    fontSize: 56,
    opacity: 0.3,
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default HeroBanner;
