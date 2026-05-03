import React, { useState } from 'react';
import {
  View, TextInput, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';

/**
 * Input — with label, error state, icon support, password toggle
 */
const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  leftIcon,
  errorMessage,
  helperText,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  onBlur,
  onFocus,
  style,
  inputStyle,
  maxLength,
}) => {
  const { theme } = useTheme();
  const { colors, borderRadius, spacing } = theme;
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const borderColor = errorMessage
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.inputBorder;

  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: errorMessage ? colors.error : colors.textSecondary,
              fontSize: 13,
              fontWeight: '500',
              marginBottom: 6,
              letterSpacing: 0.3,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.inputBackground,
            borderColor,
            borderRadius: borderRadius.lg,
            paddingHorizontal: spacing[4],
            minHeight: multiline ? 100 : 52,
          },
          isFocused && {
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 3,
          },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIconWrapper}>{leftIcon}</View>
        )}
        <TextInput
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              fontSize: 16,
              flex: 1,
              textAlignVertical: multiline ? 'top' : 'center',
              paddingVertical: multiline ? spacing[3] : 0,
            },
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          editable={editable}
          maxLength={maxLength}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword((p) => !p)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={18}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? (
        <Text style={[styles.helper, { color: colors.error }]}>
          {errorMessage}
        </Text>
      ) : helperText ? (
        <Text style={[styles.helper, { color: colors.textTertiary }]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  leftIconWrapper: { marginRight: 10 },
  input: { flex: 1 },
  helper: { marginTop: 4, fontSize: 12 },
});

export default Input;
