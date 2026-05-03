import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useTheme from '../../hooks/useTheme';

/**
 * Button — variants: primary (gradient), secondary (outline), ghost, danger
 */
const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  fullWidth = true,
}) => {
  const { theme } = useTheme();
  const { colors, borderRadius, spacing } = theme;

  const isDisabled = disabled || loading;

  const sizeStyles = {
    sm: { height: 40, paddingHorizontal: spacing[4], borderRadius: borderRadius.md },
    md: { height: 52, paddingHorizontal: spacing[6], borderRadius: borderRadius.lg },
    lg: { height: 60, paddingHorizontal: spacing[8], borderRadius: borderRadius.xl },
  };

  const textSizes = {
    sm: 13,
    md: 16,
    lg: 18,
  };

  const renderContent = () => (
    <View style={styles.contentRow}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#fff' : colors.primary}
        />
      ) : (
        <>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              {
                fontSize: textSizes[size],
                color:
                  variant === 'primary'
                    ? '#fff'
                    : variant === 'danger'
                    ? colors.error
                    : colors.primary,
                fontWeight: '600',
                letterSpacing: 0.3,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </>
      )}
    </View>
  );

  const baseStyle = [
    sizeStyles[size],
    { width: fullWidth ? '100%' : 'auto' },
    isDisabled && { opacity: 0.55 },
    style,
  ];

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={baseStyle}
      >
        <LinearGradient
          colors={isDisabled ? ['#ccc', '#bbb'] : colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, { borderRadius: sizeStyles[size].borderRadius }]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyles = {
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    danger: {
      backgroundColor: colors.errorBg,
      borderWidth: 1.5,
      borderColor: colors.error,
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        baseStyle,
        variantStyles[variant] || variantStyles.secondary,
        styles.centered,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
  text: { textAlign: 'center' },
  centered: { alignItems: 'center', justifyContent: 'center' },
});

export default Button;
