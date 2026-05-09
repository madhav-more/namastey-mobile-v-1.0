import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * SplashScreen — shown during auth initialization
 */
const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8FAFC']}
      style={styles.container}
    >
      <Image 
        source={require('../../../assets/images/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Namastey</Text>
      <Text style={styles.tagline}>Welcome like never before</Text>
      <ActivityIndicator
        size="small"
        color="#FF6B35"
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
    fontWeight: '400',
    letterSpacing: 1,
  },
  loader: { marginTop: 48 },
});

export default SplashScreen;
