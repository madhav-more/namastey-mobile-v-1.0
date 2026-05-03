import React, { useEffect, useRef } from 'react';
import {
  View, Text, Animated, StyleSheet, Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import useUIStore from '../../store/uiStore';
import useTheme from '../../hooks/useTheme';

const { width } = Dimensions.get('window');

const TOAST_CONFIG = {
  success: { icon: 'check-circle', gradient: ['#22C55E', '#16A34A'] },
  error: { icon: 'x-circle', gradient: ['#EF4444', '#DC2626'] },
  warning: { icon: 'alert-triangle', gradient: ['#F59E0B', '#D97706'] },
  info: { icon: 'info', gradient: ['#3B82F6', '#2563EB'] },
};

/**
 * Global Toast — render once at App root level
 */
const Toast = () => {
  const toast = useUIStore((s) => s.toast);
  const hideToast = useUIStore((s) => s.hideToast);
  const { theme } = useTheme();
  const { spacing, borderRadius, shadows } = theme;

  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 80,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [toast]);

  if (!toast) return null;

  const config = TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          marginHorizontal: spacing[4],
          borderRadius: borderRadius.xl,
          ...shadows.lg,
        },
      ]}
    >
      <View style={[styles.content, { backgroundColor: '#1C1917', padding: spacing[4] }]}>
        <View style={styles.iconWrapper}>
          <Feather name={config.icon} size={20} color={
            toast.type === 'success' ? '#22C55E' :
            toast.type === 'error' ? '#EF4444' :
            toast.type === 'warning' ? '#F59E0B' : '#3B82F6'
          } />
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {toast.message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignSelf: 'center',
    width: width - 32,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconWrapper: { marginRight: 12 },
  message: {
    flex: 1,
    color: '#F5F4F2',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});

export default Toast;
