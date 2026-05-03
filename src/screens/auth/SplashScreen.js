import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * SplashScreen — shown during auth initialization
 */
const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#FF6B35', '#E05520', '#8B1A00']}
      style={styles.container}
    >
      <Text style={styles.brand}>🙏</Text>
      <Text style={styles.title}>Namastey</Text>
      <Text style={styles.tagline}>Welcome like never before</Text>
      <ActivityIndicator
        size="small"
        color="rgba(255,255,255,0.7)"
        style={styles.loader}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: { fontSize: 64, marginBottom: 12 },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    fontWeight: '400',
    letterSpacing: 1,
  },
  loader: { marginTop: 48 },
});

export default SplashScreen;
