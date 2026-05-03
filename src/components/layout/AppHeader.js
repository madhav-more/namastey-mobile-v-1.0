import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '../../hooks/useTheme';

/**
 * AppHeader — premium header with back button, title, optional right action
 */
const AppHeader = ({
  title,
  onBack,
  rightAction,
  rightIcon,
  transparent = false,
  style,
}) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing[2],
          paddingHorizontal: spacing[4],
          paddingBottom: spacing[3],
          backgroundColor: transparent ? 'transparent' : colors.background,
          borderBottomWidth: transparent ? 0 : StyleSheet.hairlineWidth,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        {/* Left — Back button */}
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={[
              styles.backBtn,
              {
                backgroundColor: colors.surfaceElevated,
                borderRadius: 12,
              },
            ]}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="arrow-left" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}

        {/* Center — Title */}
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Right — Optional action */}
        {rightAction ? (
          <TouchableOpacity
            onPress={rightAction}
            style={[
              styles.backBtn,
              {
                backgroundColor: colors.surfaceElevated,
                borderRadius: 12,
              },
            ]}
            activeOpacity={0.7}
          >
            <Feather name={rightIcon || 'more-vertical'} size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: { width: 40, height: 40 },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginHorizontal: 8,
  },
});

export default AppHeader;
